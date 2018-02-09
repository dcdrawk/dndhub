<template>
  <!-- <v-content> -->
    <!-- <v-container class="general" v-if="character"> -->
      <v-tabs
        v-if="character"
        v-model="activeTab"
        color="cyan"
        dark
        slider-color="yellow"
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
          <v-card flat>
            <v-card-text>
              <component :is="tabItem.component"/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
</template>

<script>
/**
 * <general></general>
 * @desc A character's general / basic info
 */
// import classes from '../../mixins/game-data/classes'
// import races from '../../mixins/game-data/races'
// import validation from '../../mixins/validation'
import character from '../../mixins/character'
// import CustomSelect from '../../components/inputs/CustomSelect'
import CharacterSummary from '../../components/character/general/CharacterSummary'
import Appearance from '../../components/character/general/Appearance'
import Background from '../../components/character/general/Background'

export default {
  // Name
  name: 'general',

  // Components
  components: {
    // CustomSelect,
    CharacterSummary,
    Appearance,
    Background
  },

  // Mixins
  mixins: [
    character
    // classes,
    // races,
    // validation
  ],

  // Data
  data () {
    return {
      activeTab: undefined,
      tabs: [{
        title: 'Summary',
        component: 'character-summary'
      }, {
        title: 'Appearance',
        component: 'appearance'
      }, {
        title: 'Background',
        component: 'background'
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
