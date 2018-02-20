<template>
  <!-- <v-content> -->
    <!-- <v-container class="general" v-if="character"> -->
      <v-tabs
        v-if="character"
        v-model="activeTab"
        color="cyan"
        dark
        fixed-tabs
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
          <!-- <v-card flat>
            <v-card-text> -->
              <component :is="tabItem.component"/>
            <!-- </v-card-text>
          </v-card> -->
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
import SavingThrows from '../../components/character/stats/SavingThrows'

export default {
  // Name
  name: 'stats',

  // Components
  components: {
    AbilityScores,
    Combat,
    SavingThrows
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
        title: 'Saving Throws',
        component: 'saving-throws'
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
