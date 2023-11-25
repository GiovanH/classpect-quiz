<template>
  <div v-for="(aspects, theme) in data.aspect_pairs" :key="theme">
    <AspectQuiz
      :theme="theme"
      @aspectSet="v => quiz_inputs[theme].aspect = v"
      @classSet="v => quiz_inputs[theme].class = v"
      @confidenceSet="v => quiz_inputs[theme].confidence = v"
    />
  </div>
  <ol>
    <li v-for="(res, theme) in quiz_inputs" :key="theme">
      {{ res.class }} of {{ res.aspect }}
    </li>
  </ol>
  <pre v-text="quiz_inputs" />
</template>

<style lang="scss">
.row {
  display: flex;
}
.col {
  display: flex;
  flex-direction: column;
}
</style>

<script>

import data from "./data.yaml";
import AspectQuiz from "@/components/AspectQuiz.vue"

export default {
  name: 'App',
  components: { AspectQuiz },
  data: function() {
    return {
      data: data,
      quiz_inputs: {

      }
    }
  },
  computed: {
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