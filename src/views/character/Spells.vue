<template>
  <section>

    <v-tabs
      v-if="character"
      v-model="activeTab"
      color="secondary"
      dark
      fixed-tabs
      slider-color="yellow"
      class="page-tabs"
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
 * <spells></spells>
 * @desc A character's spells, tabs for equipped and browsing
 */
import character from '../../mixins/character'
import SpellsBrowse from '../../components/character/spells/SpellsBrowse'
import SpellsEquipped from '../../components/character/spells/SpellsEquipped'

export default {
  // Name
  name: 'spells',

  // Components
  components: {
    SpellsBrowse,
    SpellsEquipped
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
        component: 'spells-equipped',
        showFab: true,
        fabAction: () => {
          console.log('fab action')
          this.$bus.$emit('new-spells')
        }
      }, {
        title: 'Browse',
        component: 'spells-browse',
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
