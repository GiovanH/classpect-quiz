<template>
  <h2 v-text="$t(`theme_${theme}`)" />
  <div class="question">
    <p>
      Which of these two sides of <i>{{ theme }}</i> do you have the <b>strongest</b> connection to?
    </p>

    <div class="row">
      <i v-text="$t(`aspect_desc.${aspect_pair[0]}`)" />
      <input
        v-for="i in [0,1,2,3,4]" :key="i"
        type="radio" v-model="theme_rating" :value="i" />
      <i v-text="$t(`aspect_desc.${aspect_pair[1]}`)" />
    </div>
  </div>

  <div class="question" v-if="aspect_pick">
    <p>
      What is your relationship with that theme?
    </p>
    <div class="col">
      <label :key="model" v-for="desc, model in {
        'user': `You <b>use</b> ${aspect_desc.toLowerCase()}`,
        'tool': `You <b>are used by</b> ${aspect_desc.toLowerCase()}`,
        'subject': `You <b>change</b> ${aspect_desc.toLowerCase()}`,
        'object': `You <b>are changed by</b> ${aspect_desc.toLowerCase()}`
      }">
        <input type="checkbox"
          :checked.prop="relationship == model"
          :disabled="masterclass_nature === true"
          @click="relationship != model ? relationship = model : relationship = nature = undefined"
        />
        <span v-html="desc" />
      </label>
      <label :key="model" v-for="desc, model in {
        'subsumer': `You <b>subsume</b> ${aspect_desc.toLowerCase()}`,
        'subsumee': `You <b>are subsumed by</b> ${aspect_desc.toLowerCase()}`,
      }">
        <input type="checkbox"
          :checked.prop="relationship == model"
          :disabled="masterclass_nature === false"
          @click="relationship != model ? relationship = model : relationship = nature = undefined"
        />
        <span v-html="desc" />
      </label>
    </div>
  </div>

  <div class="question" v-if="aspect_pick">
    <p>
      ...in a way that is:
    </p>
    <div class="col">
      <label :key="model" v-for="desc, model in {
        'intrinsic': `For your own advancement. Advancing my goals advances the narrative's goals.`,
        'extrinsic': `For the advancement of others. I advance the goals of others to advance the narrative's goals.`,
        'victim': `For/at the advancement of the narrative. The narrative advances its goals by actively acting in my detriment.`
      }">
        <input type="checkbox"
          :checked.prop="nature == model"
          :disabled="masterclass_rel === true"
          @click="nature != model ? nature = model : nature = undefined"
        />
        {{ desc }}
      </label>
      <label :key="model" v-for="desc, model in {
        'self': `For the advancement of both the self and the narrative as one. My goals and the narrative's are inseperable. We are codependent on each other.`
      }">
        <input type="checkbox"
          :checked.prop="nature == model"
          :disabled="masterclass_rel === false"
          @click="nature != model ? nature = model : nature = undefined"
        />
        {{ desc }}
      </label>
    </div>
  </div>

  <!-- <pre v-text="{theme_rating, relationship, nature, aspect_pick, score_rating, class_pick}" /> -->
  <div v-if="aspect_pick && class_pick">
    <ClasspectDisplay :class="class_pick" :aspect="aspect_pick" />
  </div>
</template>

<script>

import data from "@/data.yaml";
import ClasspectDisplay from "@/components/ClasspectDisplay.vue"

export default {
  name: 'AspectQuiz',
  components: { ClasspectDisplay },
  props: [ 'theme' ],
  emits: [ 'aspectSet', 'classSet', 'confidenceSet' ],
  data: function() {
    return {
      data,
      theme_rating: 2,
      relationship: undefined,
      nature: undefined,
    }
  },
  watch: {
    aspect_pick(to) {
      this.$emit('aspectSet', to)
    },
    class_pick(to) {
      this.$emit('classSet', to)
    },
    confidence(to) {
      this.$emit('confidenceSet', to)
    },
  },
  computed: {
    aspect_pair() { return data.aspect_pairs[this.theme] || ['Null', 'Nil'] },
    aspect_pick() { return this.score_rating > 0 ? this.aspect_pair[Math.round(this.theme_rating/5)] : undefined },
    aspect_desc() { return this.$t(`aspect_desc.${this.aspect_pick}`) },
    score_rating() { return Math.abs(this.theme_rating-2) },
    class_pick() {
      var nature_opts = data.class_nature[this.nature] || []
      var rel_opts = data.class_rel[this.relationship] || []
      var filtered = nature_opts.filter(a => rel_opts.includes(a))
      console.log(rel_opts, nature_opts, filtered)
      return filtered[0] || undefined
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
    confidence() { return this.score_rating }
  },
}
</script>