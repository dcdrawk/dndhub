<template>
  <v-tabs
    v-if="character"
    v-model="activeTab"
    background-color="secondary"
    dark
    fixed-tabs
    slider-color="accent"
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
      <component :is="tabItem.component" />
    </v-tab-item>
  </v-tabs>
</template>

<script>
/**
 * <stats></stats>
 * @desc A character's stats
 */
import character from '../../mixins/character'
import AbilityScores from '../../components/character/stats/AbilityScores'
import Combat from '../../components/character/stats/Combat'
import Skills from '../../components/character/stats/Skills'

export default {
  // Name
  name: 'Stats',

  // Components
  components: {
    AbilityScores,
    Combat,
    Skills
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
        title: 'Combat',
        component: 'combat'
      }, {
        title: 'Ability Scores',
        component: 'ability-scores'
      }, {
        title: 'Skills',
        component: 'skills'
      }]
    }
  },

  // Computed
  computed: {
    alignments () {
      return this.$store.state.gameData.alignments
    },
    backgrounds () {
      return this.$store.state.gameData.backgrounds
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
