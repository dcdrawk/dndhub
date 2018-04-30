<template>
  <!--  Page Tabs -->
  <v-tabs
    v-if="character"
    v-model="activeTab"
    color="secondary"
    dark
    slider-color="yellow"
    centered
    grow
    class="page-tabs elevation-1"
  >
    <v-tab
      v-for="(tab, index) in tabs"
      :key="index"
      ripple
    >
      {{ tab.title }}
    </v-tab>

    <!-- Tab Items (content) -->
    <v-tab-item
      v-for="(tabItem, index) in tabs"
      :key="index"
    >
      <component :is="tabItem.component"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>
/**
 * <general></general>
 * @desc A character's general / basic info
 */
import character from '../../mixins/character'
import CharacterSummary from '../../components/character/general/CharacterSummary'
import Background from '../../components/character/general/Background'

export default {
  // Name
  name: 'general',

  // Components
  components: {
    CharacterSummary,
    Background
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      activeTab: undefined,
      tabs: [{
        title: 'Summary',
        component: 'character-summary'
      }, {
        title: 'Background',
        component: 'background'
      }]
    }
  }
}
</script>

<style scoped lang="scss">
.page-tabs {
  max-width: 1200px;
  margin: auto;
  @media screen and (min-width: 1260px) {
    margin-top: 20px;
  }
}
</style>
