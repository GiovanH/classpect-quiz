<template>
  <h2 v-text="$t(`theme_${theme}`)" />
  <div class="question">
    <p>
      Which of these two sides of <i>{{ theme }}</i> do they have the <b>strongest</b> connection to?
    </p>

    <div class="row">
      <i v-text="$t(`aspect_desc.${aspect_pair[0]}`)" />
      <input
        v-for="i in [0,1,2,3,4]" :key="i"
        type="radio" v-model="theme_rating" :value="i" />
      <i v-text="$t(`aspect_desc.${aspect_pair[1]}`)" />
    </div>
  </div>

  <div class="question">
    <p>
      What is their relationship with that theme?
    </p>
    <div class="col">
      <!-- <label :key="model" v-for="desc, model in Object.entries({
        'alterant': `They <b>change and cultivate</b> ${aspect_desc.toLowerCase()}`,
        'student': `They <b>are changed by</b> ${aspect_desc.toLowerCase()}`,
        'operant': `They <b>use and manifest</b> ${aspect_desc.toLowerCase()}`,
        'agent': `They <b>are used by</b> ${aspect_desc.toLowerCase()}`,
        'subsumer': `They <b>subsume</b> ${aspect_desc.toLowerCase()}`,
        'subsumee': `They <b>are subsumed by</b> ${aspect_desc.toLowerCase()}`,
      }"> -->
      <label :key="model" v-for="model in [
        'alterant',
        'student',
        'operant',
        'agent',
        'subsumer',
        'subsumee',
      ].filter(model => !(model.startsWith('subsum') && !enableMaster))">
        <!-- <input type="checkbox"
          :checked.prop="relationship == model"
          :disabled="masterclass_nature === (!model.startsWith('subsum'))"
          @click="relationship != model ? relationship = model : relationship = undefined"
        /> -->
        <input type="checkbox"
          v-model="relationships"
          :value="model"
        />
        <span v-html="`${$t(`classrel_${model}`)} ${aspect_desc.toLowerCase()}`" />
      </label>
    </div>
  </div>

  <div class="question">
    <p>
      ...in a way that is:
    </p>
    <div class="col">
      <label :key="model" v-for="model in [ 'mutualist', 'commensalist', 'parasitic', 'self' ].filter(model => !(model == 'self' && !enableMaster))">
        <!-- <input type="checkbox"
          :checked.prop="nature == model"
          :disabled="masterclass_rel === (model != 'self')"
          @click="nature != model ? nature = model : nature = undefined"
        /> -->
        <input type="checkbox"
          v-model="natures"
          :value="model"
        />
        {{ $t(`desc_${model}`) }}
      </label>
    </div>
  </div>

  <div class="internal">
    <!-- <ClasspectDisplay v-for="class_pick in class_picks" :key="class_pick"
      :class="class_pick" :aspect="aspect_pick" />
    + {{aspect_confidence}} -->
    <pre v-text="{aspect_picks, natures, relationships, class_picks}" />
  </div>
</template>

<script>

import data from "@/data.yaml";
import ClasspectDisplay from "@/components/ClasspectDisplay.vue"

const defaults = Object.freeze({
  theme_rating: 2,
  relationships: [],
  natures: [],
})

export default {
  name: 'AspectQuiz',
  // components: { ClasspectDisplay },
  props: [ 'theme', 'enableMaster' ],
  emits: [ 'changed' ],
  data: function() {
    return {
      data,
      ...defaults
    }
  },
  watch: {
    overall_value: {
      handler(to) {
        this.$emit('changed', to)
        this.save()
      },
      deep: true
    }
  },
  created() {
    let saved = this.Store[this.theme] || {}
    this.relationships = saved.relationships || defaults.relationships
    this.natures       = saved.natures       || defaults.natures
    this.theme_rating  = saved.theme_rating === undefined ? defaults.theme_rating : saved.theme_rating // Treat zero as significant
  },
  methods: {
    save() {
      this.Store[this.theme] = {
        relationships: this.relationships,
        natures: this.natures,
        theme_rating: this.theme_rating
      }
    }
  },
  computed: {
    aspect_pair() { return data.aspect_pairs[this.theme] || ['Null', 'Nil'] },
    aspect_picks() {
      if (this.score_rating > 0) {
        return [this.aspect_pair[Math.round(this.theme_rating/5)]]
      }
      return this.aspect_pair
    },
    aspect_desc() {
      if (this.aspect_picks.length > 1) {
        return this.$t(`aspect_desc.${this.theme}`)
      } else {
        return this.$t(`aspect_desc.${this.aspect_picks[0]}`)
      }
    },
    score_rating() { return Math.abs(this.theme_rating-2) }, // convert 0-5 to 0-2 or 0-2
    class_picks() {
      return this.relationships.map(relationship => {
        return this.natures.map(nature => {
          var nature_opts = data.class_nature[nature] || []
          var rel_opts = data.class_rel[relationship] || []
          // Filter class by nature vertically, relationship horizontally, meeting on one space
          var filtered = nature_opts.filter(a => rel_opts.includes(a))
          return filtered[0] || undefined
        }).flat()
      }).flat()
      .filter(Boolean)

      // return []
    },
    masterclass_nature() {
      if (this.nature == "self") return true
      else if (this.nature) return false
      return undefined
    },
    masterclass_rel() {
      if (this.relationship && this.relationship.startsWith("subsume")) return true
      else if (this.relationship) return false
      return undefined
    },
    aspect_confidence() { return this.score_rating },
    overall_value() {
      return this.aspect_picks.map(a => this.class_picks.map(c => ({
          aspect: a,
          class: c,
          aspect_confidence: this.aspect_confidence,
          valid: (a && c && true)
        })).flat()
      ).flat()
    }
  },
}
</script>