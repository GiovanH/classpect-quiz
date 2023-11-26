<template>
  <h1>Questions</h1>
  <div class="quizContainer">
    <div>
      <p>
        Which aspect theme is more important?
      </p>
      <div class="col">
        <label v-for="(aspects, theme) in {...data.aspect_pairs, skip: []}" :key="theme">
          <input type="radio"
            :value="aspects"
            v-model="tuning.bonus_aspects_subject"
          />
          <span v-text="$t(`theme_${theme}`)" />
        </label>
      </div>
      <div class="internal">
        + 1 {{ tuning.bonus_aspects_subject }}
      </div>
    </div>
    <div>
      <p>
        Which aspect nature is more important to you?
      </p>
      <div class="col">
        <label v-for="(themes, nature) in {...data.aspect_nature, skip: []}" :key="nature">
          <input type="radio"
            :value="themes"
            v-model="tuning.bonus_themes_nature"
          />
          <span v-text="$t(`picker_${nature}`)" />
        </label>
      </div>
      <div class="internal">
        + 1 {{ tuning.bonus_themes_nature }}
      </div>
    </div>
    <div>
      <p>
        Which aspect kind is more important to you?
      </p>
      <div class="col">
        <label v-for="(aspects, kind) in {...data.abstract_bisect, '(skip)': []}" :key="kind">
          <input type="radio"
            :value="aspects"
            v-model="tuning.bonus_aspects_abstract"
          />
          <span v-text="kind" />
        </label>
      </div>
      <div class="internal">
        + 1 {{ tuning.bonus_aspects_abstract }}
      </div>
    </div>
    <div>
      <p>
        Which aspect kind is more important to you?
      </p>
      <div class="col">
        <label :key="direction" v-for="(aspects, direction) in {...data.aspect_direction, skip: []}">
          <input type="radio"
            :value="aspects"
            v-model="tuning.bonus_aspects_direction"
          />
          {{ $t(`desc_${direction}`) }}
        </label>
      </div>
      <div class="internal">
        + 1 {{ tuning.bonus_aspects_direction }}
      </div>
    </div>
    <div>
      <p>
        Which class role fits you best?
      </p>
      <div class="col">
        <label :key="nature" v-for="(classes, nature) in {...data.class_nature, skip: []}">
          <input type="radio"
            :value="classes"
            v-model="tuning.bonus_classes_nature"
          />
          {{ $t(`desc_${nature}`) }}
        </label>
      </div>
      <div class="internal">
        + 1 {{ tuning.bonus_classes_nature }}
      </div>
    </div>
  </div>

  <div class="quizContainer">
    <div v-for="(aspects, theme) in data.aspect_pairs" :key="theme">
      <AspectQuiz
        :theme="theme"
        @changed="v => quiz_inputs[theme] = v"
      />
    </div>
  </div>

  <h1>Results</h1>
  <h2>Main</h2>
  <ol>
    <li v-for="(res, i) in quiz_inputs_sorted" :key="res.theme" >
      {{ res.confidence }} points
      <ClasspectDisplay :class="res.class" :aspect="res.aspect" :big="i == 0 ? true : null" />
    </li>
  </ol>
  <pre v-text="quiz_inputs_sorted" />
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
.quizContainer {
  display: flex;
  flex-wrap: wrap;
  > div {
    flex: 1 1 500px;
    border: 2px solid black;
    margin: 2px;
    padding: 0.5em;
    h2 {
      margin-top: 0;
    }
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
      data: data,
      quiz_inputs: {},
      tuning: {}
    }
  },
  computed: {
    quiz_inputs_sorted() {
      return Object.entries(this.quiz_inputs)
        .map(kv => ({theme: kv[0], ...kv[1]})) // shunt key into object
        .filter(i => i.valid)
        .map(i => {
          if (this.tuning.bonus_aspects_subject?.includes(i.theme)) { i.confidence += 1 }
          if (this.tuning.bonus_aspects_abstract?.includes(i.aspect)) { i.confidence += 1 }
          if (this.tuning.bonus_aspects_direction?.includes(i.aspect)) { i.confidence += 1 }
          if (this.tuning.bonus_themes_nature?.includes(i.theme)) { i.confidence += 1 }
          if (this.tuning.bonus_classes_nature?.includes(i.class)) { i.confidence += 1 }
          return i
        })
        .toSorted((a, b) => (a.confidence || 0) - (b.confidence || 0))
        .toReversed()
    },
  },
  methods: {

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