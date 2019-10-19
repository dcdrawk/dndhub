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
          :active="activeTab === index"
          :is="tabItem.component"
        />
      </v-tab-item>
    </v-tabs>

    <!-- Floating Action Button -->
    <v-fab-transition v-if="activeTab !== undefined">
      <v-btn
        class="spell-fab"
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
import character from '@/mixins/character'
import QuestsBrowse from '@/components/character/quests/QuestsBrowse'
import QuestsCompleted from '@/components/character/quests/QuestsCompleted'
// import Treasure from '../../components/character/inventory/treasure/Treasure'
// import Currency from '../../components/character/inventory/Currency'
// import SpellsEquipped from '../../components/character/spells/SpellsEquipped'
// import SpellsCasting from '../../components/character/spells/SpellsCasting'

export default {
  // Name
  name: 'Quests',

  // Components
  components: {
    QuestsBrowse,
    QuestsCompleted
    // Treasure,
    // Currency
    // SpellsBrowse,
    // SpellsEquipped,
    // SpellsCasting
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
        title: 'Quests',
        component: 'QuestsBrowse',
        showFab: true,
        fabAction: () => {
          this.$bus.$emit('new-quest')
        }
      }, {
        title: 'Completed',
        component: 'QuestsCompleted',
        showFab: false
        // fabAction: () => {
        //   this.$bus.$emit('new-treasure')
        // }
      // }, {
      //   title: 'Currency',
      //   component: 'Currency',
      //   showFab: false
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

.spell-fab {
  bottom: 60px;
}
</style>
