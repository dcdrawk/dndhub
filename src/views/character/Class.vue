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
          @show-feature="handleShowFeature($event)"
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

    <!-- <class-feature-dialog
      :show-dialog="showClassFeatureDialog"
      :feature="selectedFeature"
      @close="handleDialogClose()"
    /> -->
  </section>
</template>

<script>
/**
 * <character-class></character-class>
 * @desc A character's general / basic info
 */
import character from '../../mixins/character'
import ClassSummary from '../../components/character/class/ClassSummary'
import ClassFeatures from '../../components/character/class/ClassFeatures'
import ClassFeatureDialog from '../../components/character/class/ClassFeatureDialog'
import Background from '../../components/character/general/Background'

export default {
  // Name
  name: 'character-class',

  // Components
  components: {
    // CustomSelect,
    ClassSummary,
    ClassFeatures,
    ClassFeatureDialog,
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
      showClassFeatureDialog: false,
      selectedFeature: undefined,
      // classFeatureEdit:
      tabs: [{
        title: 'Summary',
        component: 'class-summary',
        showFab: false
      }, {
        title: 'Features',
        component: 'class-features',
        showFab: true,
        fabAction: () => { this.$bus.$emit('new-class-feat') }
      }, {
        title: 'Proficiencies',
        component: 'background',
        showFab: false
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
  },

  // Methods
  methods: {
    handleShowFeature (event) {
      this.selectedFeature = event
      this.showClassFeatureDialog = true
    },

    handleDialogClose () {
      this.showClassFeatureDialog = false
      // setTimeout(() => {
      //   this.selectedFeature = undefined
      // }, 500)
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
