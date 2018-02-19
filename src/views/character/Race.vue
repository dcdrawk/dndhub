<template>
  <section>

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
        <component
          :is="tabItem.component"
        />
      </v-tab-item>
    </v-tabs>

    <!-- Floating Action Button -->
    <v-fab-transition v-if="activeTab">
      <v-btn
        v-if="tabs[activeTab].showFab"
        color="secondary"
        dark
        fab
        fixed
        bottom
        right
        small
        @click="tabs[activeTab].fabAction"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

  </section>
</template>

<script>
/**
 * <race></race>
 * @desc A character's general / basic info
 */
import character from '../../mixins/character'
import RaceSummary from '../../components/character/race/RaceSummary'
import RaceTraits from '../../components/character/race/RaceTraits'
import ClassFeatureDialog from '../../components/character/class/ClassFeatureDialog'
import ClassProficiencies from '../../components/character/class/ClassProficiencies'

export default {
  // Name
  name: 'race',

  // Components
  components: {
    RaceSummary,
    RaceTraits,
    ClassFeatureDialog,
    ClassProficiencies
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
        component: 'race-summary',
        showFab: false
      }, {
        title: 'Traits',
        component: 'race-traits',
        showFab: true,
        fabAction: () => { this.$bus.$emit('new-race-trait') }
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
