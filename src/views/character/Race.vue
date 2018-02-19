<template>
  <section>
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
        <!-- <v-card flat>
          <v-card-text> -->
        <component
          :is="tabItem.component"
        />
          <!-- </v-card-text>
        </v-card> -->
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
 * <character-class></character-class>
 * @desc A character's general / basic info
 */
import character from '../../mixins/character'
import RaceSummary from '../../components/character/race/RaceSummary'
import RaceTraits from '../../components/character/race/RaceTraits'
import ClassFeatureDialog from '../../components/character/class/ClassFeatureDialog'
import ClassProficiencies from '../../components/character/class/ClassProficiencies'

export default {
  // Name
  name: 'character-class',

  // Components
  components: {
    // CustomSelect,
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
  },

  // Methods
  methods: {
    handleShowTrait (event) {
      this.selectedItem = event
      this.showDialog = true
    },

    handleDialogClose () {
      this.showDialog = false
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
