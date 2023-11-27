<template>
  <div :class="{hideInternal: !showInternal}">
    <span>
      based entirely on <a href="https://archiveofourown.org/series/1960270">0pacifica's classpect meta</a> and <a href="https://classpectanon.tumblr.com">classpectanon</a>'s <a href="https://docs.google.com/spreadsheets/d/1e1JDiyE2tp-5mkA75x5UIexUpJru8d8b1hjeSG7gqSE/edit#gid=0">table</a>
    </span>
    <section>
      <h1>Questions</h1>
      <div class="quizContainer">
        <div v-for="(aspects, theme) in data.aspect_pairs" :key="theme">
          <AspectQuiz
            :enableMaster="enableMaster"
            :theme="theme"
            @changed="v => quiz_inputs[theme] = Object.freeze(v)"
          />
        </div>
      </div>

      <div class="quizContainer">
        <template v-for="tunemodels, tunekey in tuningopts">
          <div :key="model" v-for="model in tunemodels">
            <p>
              {{ $t(`tuningprompt_${model}`) }}
            </p>
            <div class="col">
              <label v-for="(v, choice) in {...data[model], skip: []}" :key="choice">
                <input type="radio"
                  :value="v"
                  v-model="tuning[model]"
                />
                <span v-text="$t(`tuningdesc_${choice}`)" />
              </label>
            </div>
            <div class="internal">
              + 1 {{ tuning[model] }}
            </div>
          </div>
        </template>
      </div>
    </section>

    <section>
      <h1>Results</h1>
      <ol>
        <li v-for="(res, i) in quiz_inputs_sorted" :key="res.theme" >
          {{ res.confidence }} points
          <ClasspectDisplay :class="res.class" :aspect="res.aspect" :big="false && i == 0 ? true : null" />
          <pre class="internal" v-text="res.log" />
        </li>
      </ol>
    </section>
    <section>
      <h1>How it Works</h1>
      <p>Each of the first six question boxes corresponds to an <b>aspect dichotomy</b>. Which aspect you get in the dichotomy corresponds to which side of the scale you put the rating.</p>
      <p>The following questions in the first six boxes pertain to your relationship with that aspect, and assign aspect-specific <b>classes</b> depending on your answer. So, ultimately, each of the first six boxes yields a <b>list of possible classpects</b>.</p>
      <p>Then each of those classpects are <b>ranked</b> depending on how well they apply. The score is based on your <b>confidence</b> in the dichotomy choice (how far to one side you ranked it) and your answers to the tuning questions, which each assign point bonuses to certain classes or aspects.</p>
    </section>
    <section>
      <h1>Settings</h1>
      <div class="col">
        <label>
          <input type="checkbox"
            v-model="enableMaster"
          />
          Enable master classes
        </label>
        <label>
          <input type="checkbox"
            v-model="showInternal"
          />
          Show internal data
        </label>
        <button @click="cleardata">Clear all selections</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.row {
  display: flex;
  align-items: baseline;
}
.col {
  display: flex;
  flex-direction: column;
}
.internal {
  border: 1px dotted grey;
}
.hideInternal .internal {
  display: none;
}
.quizContainer {
  display: flex;
  flex-wrap: wrap;
  > div {
    flex: 1 1 500px;
    border: 2px solid black;
    margin: 2px;
    padding: 0.5em;
    > *:first-child {
      margin-top: 0;
    }
  }
}
label {

  text-indent: -24px;
  margin-left: 24px;
  input[type="checkbox"] {
    width: 13px;
    margin: 3px 3px 3px 4px;
  }
}
</style>

<script>

import data from "./data.yaml";
import AspectQuiz from "@/components/AspectQuiz.vue"
import ClasspectDisplay from "@/components/ClasspectDisplay.vue"

export default {
  name: 'App',
  components: { AspectQuiz, ClasspectDisplay },
  data: function() {
    return {
      showInternal: false,
      enableMaster: false,
      data: data,
      quiz_inputs: {},
      tuning: {},
      tuningopts: {
        aspectpairs: ['abstractpairs_abstraction', 'aspectpairs_nature'],
        aspects: ['aspect_direction'],
        classes: [], // 'class_rel', 'class_nature'
        classrel: ['classrel_activity']
      }
    }
  },
  computed: {
    quiz_inputs_sorted() {
      return Object.freeze(Object.values(this.quiz_inputs))
        .flat()
        // .map(kv => ({theme: kv[0], ...kv[1]})) // shunt key into object
        .filter(i => i.valid)
        .map(i => {
          i.confidence = i.aspect_confidence || 0
          i.log = [`+${i.aspect_confidence} aspect confidence`]
          this.tuningopts.aspectpairs.forEach(key => {
            if (this.tuning[key]?.map(key => data.aspect_pairs[key]).flat().includes(i.aspect)) {
              i.confidence += 1
              i.log.push(`+1 ${key} (${this.tuning[key]})`)
            }
          })
          this.tuningopts.aspects.forEach(key => {
            if (this.tuning[key]?.includes(i.aspect)) {
              i.confidence += 1
              i.log.push(`+1 ${key} (${this.tuning[key]})`)
            }
          })
          this.tuningopts.classes.forEach(key => {
            if (this.tuning[key]?.includes(i.class)) {
              i.confidence += 1
              i.log.push(`+1 ${key} (${this.tuning[key]})`)
            }
          })
          this.tuningopts.classrel.forEach(key => {
            if (this.tuning[key]?.map(key => data.class_rel[key]).flat().includes(i.class)) {
              i.confidence += 1
              i.log.push(`+1 ${key} (${this.tuning[key]})`)
            }
          })
          return i
        })
        .toSorted((a, b) => (a.confidence || 0) - (b.confidence || 0))
        .toReversed()
    },
  },
  methods: {
    cleardata() {
      Object.keys(this.Store).forEach(k => this.Store[k] = undefined)
      location.reload()
    }
  },
  watch: {
    tuning: {
      handler(to) {
        this.Store['tuning'] = to
      },
      deep: true
    }
  },
  created() {
    this.tuning = this.Store['tuning'] || {}

    Object.keys(data.aspect_pairs).forEach(theme => {
      this.quiz_inputs[theme] = {}
    })
    window.vm = this
  }
}
</script>