<template>
  <h1>Questions</h1>
  <div v-for="(aspects, theme) in data.aspect_pairs" :key="theme">
    <AspectQuiz
      :theme="theme"
      @aspectSet="v => quiz_inputs[theme].aspect = v"
      @classSet="v => quiz_inputs[theme].class = v"
      @confidenceSet="v => quiz_inputs[theme].confidence = v"
    />
  </div>

  <h1>Results</h1>
  <h2>Main</h2>
  <ol>
    <li v-for="(res, theme) in quiz_inputs_main" :key="theme" >
      <ClasspectDisplay :class="res.class" :aspect="res.aspect" big="true" />
    </li>
  </ol>
  <h2>Sub</h2>
  <ol>
    <li v-for="(res, theme) in quiz_inputs_sub" :key="theme" >
      <ClasspectDisplay :class="res.class" :aspect="res.aspect" />
    </li>
  </ol>
  <pre v-text="quiz_inputs" />
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
      quiz_inputs: {

      }
    }
  },
  computed: {
    quiz_inputs_main() {
      return Object.fromEntries(Object.entries(this.quiz_inputs).filter(i => i[1]['class'] && i[1]['aspect'] && i[1].confidence == 2))
    },
    quiz_inputs_sub() {
      return Object.fromEntries(Object.entries(this.quiz_inputs).filter(i => i[1]['class'] && i[1]['aspect'] && i[1].confidence == 1))
    }
  },
  methods: {

  },
  created() {
    Object.keys(data.aspect_pairs).forEach(theme => {
      this.quiz_inputs[theme] = {}
    })
    window.vm = this
  }
}
</script>