<template>
  <div class="column">
    <span class="row" v-if="big">
      <img :src="`./aspect/aspect_${data.aspects.indexOf(aspect) + 1}.png`" />
      <img :src="`./classsprites/${c}_template.png`" />
    </span>
    <span>
      <img v-if="!big" :src="`./icons/icon_aspect_${data.aspects.indexOf(aspect) + 1}.png`" />
      <span v-text="c" /> of <span v-text="aspect" />
    </span>
  </div>
</template>

<script>

import data from "@/data.yaml";

export default {
  name: 'ClasspectDisplay',
  props: [ 'class', 'aspect', 'big' ],
  data: function() {
    return { data }
  },
  computed: {
    c() {
      return this.class
    }
  }
}
</script>