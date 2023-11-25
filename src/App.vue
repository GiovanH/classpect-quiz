<template>
  <div v-for="(aspects, theme) in data.aspect_pairs" :key="theme">
    <h2 v-text="$t(`theme_${theme}`)" />
    <p>
      Which of these two sides of <i>{{ theme }}</i> do you have the <b>strongest</b> connection to?
    </p>
    <template v-for="aspect in aspects" :key="aspect">
      <dt>
        <label>
          <input type="radio"
            :name="aspect"
            :id="aspect"
            :value="aspect"
            v-model="theme_picks[theme]"
          />
          <!-- {{ aspect }} -->
          {{ $t(`aspect_desc.${aspect}`) }}
        </label>
      </dt>
      <!-- <label :for="aspect">
        <dd class="settingDesc" v-html="$t(`aspect_desc.${aspect}`)" />
      </label> -->
    </template>
    <pre v-text="{k, apair}" />
  </div>
  <pre v-text="theme_picks" />
  <pre v-text="scores" />
</template>

<style lang="scss" scoped>

</style>

<script>

import data from "./data.yaml";

export default {
  name: 'App',
  data: function() {
    return {
      data: data,
      theme_picks: {}
    }
  },
  computed: {
    scores() {
      var scores_ = {}
      Object.keys(data.aspect_pairs).forEach(theme => {
        scores_[theme] = {
          "aspect": this.theme_picks[theme],
          "score": 0
        }
      })
      return scores_
    }
  },
  methods: {

  },
  created() {
    window.vm = this
  }
}
</script>