<template>
  <section>

    <v-tabs
      v-if="character"
      v-model="activeTab"
      color="secondary"
      dark
      fixed-tabs
      slider-color="pink"
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
 * <armor></armor>
 * @desc A character's armor, tabs for equipped and browsing
 */
import character from '../../mixins/character'
import ArmorBrowse from '../../components/character/armor/ArmorBrowse'
import ArmorEquipped from '../../components/character/armor/ArmorEquipped'

export default {
  // Name
  name: 'armor',

  // Components
  components: {
    ArmorBrowse,
    ArmorEquipped
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
        title: 'Known',
        component: 'armor-equipped',
        showFab: true,
        fabAction: () => { this.$bus.$emit('new-armor') }
      }, {
        title: 'Browse',
        component: 'armor-browse',
        showFab: false
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
