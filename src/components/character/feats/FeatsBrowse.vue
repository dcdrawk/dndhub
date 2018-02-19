<template>
  <div>
    <!-- Character List -->
    <v-list
      v-if="items"
      two-line
      dense
      class="elevation-1"
    >
      <!-- Traits List -->
      <v-list-tile
        v-for="(item, key) in items"
        :key="key"
        @click="handleShowDialog(item)"
      >
        <!-- Content -->
        <v-list-tile-content>
          <!-- Trait Name -->
          <v-list-tile-title>
            {{ item.name }}
          </v-list-tile-title>

          <!-- Character Details -->
          <v-list-tile-sub-title>
            {{ item.source }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <p
      v-else
      class="ma-4 text-xs-center"
    >
      No Known Feats
    </p>
    <!-- <race-trait-dialog
      :show-dialog="showDialog"
      :item="selectedItem"
      @close="showDialog = false"
    /> -->
  </div>
</template>

<script>
/**
 * <class-features></class-features>
 * @desc A character's class features
 */
// import races from '../../../mixins/game-data/races'
import character from '../../../mixins/character'
// import CustomSelect from '../../inputs/CustomSelect'
// import RaceTraitDialog from './RaceTraitDialog'

export default {
  // Name
  name: 'feats-browse',

  // Components
  components: {
    // CustomSelect,
    // RaceTraitDialog
    // ClassFeatureDialog
  },

  // Mixins
  mixins: [
    character
    // races
  ],

  // Data
  data () {
    return {
      endpoint: 'feats',
      dialogEvent: 'new-feat',
      defaultItem: {
        name: '',
        description: '',
        new: true
      },
      items: undefined,
      selectedItem: undefined,
      showDialog: false
    }
  },

  // Computed
  computed: {
  },

  // Methods
  methods: {
    /**
     * Get Items
     * retrieve the list of items
     */
    getItems () {
      this.$db.ref(
        `${this.endpoint}/${this.characterId}`
      ).on('value', (snapshot) => {
        // const value = snapshot.val()

        // const traits = Object.values(value || [])
        // .map((item, index) => {
        //   item.id = Object.keys(snapshot.val())[index]
        //   item.custom = true
        //   item.source = 'Custom'
        //   return item
        // })
        this.items = snapshot.val()
      })
    },

    /**
     * Get Features Data
     * return an array of all features associated with a class
     * @param {Object} - classObj
     */
    // getTraitsData (classObj) {
    //   let features = []
    //   for (let i in this.classFeaturesData) {
    //     const classFeature = this.classFeaturesData[i]
    //     if (classObj.name === classFeature.class) {
    //       const abilities = classFeature.abilities.map((ability) => {
    //         const subclass = classFeature.subclass === 'default'
    //           ? classFeature.class
    //           : classFeature.subclass
    //         ability.subclass = subclass
    //         return ability
    //       })
    //       if (classFeature.subclass === 'default') {
    //         features = features.concat(abilities)
    //       } else if (classFeature.subclass === classObj.subclass) {
    //         features = features.concat(abilities)
    //       }
    //     }
    //   }
    //   return features
    // },

    /**
     * Handle Show Dialog
     * Select the feature and show the dialog
     * @param {Object} feature
     */
    handleShowDialog (feature) {
      this.selectedItem = feature
      this.showDialog = true
    }
  },

  // Created
  created () {
    this.getItems()
    // Listen for events from the parent component
    this.$bus.$on(this.dialogEvent, () => {
      this.selectedItem = {...this.defaultItem}
      this.showDialog = true
    })
  }
}
</script>

<style scoped lang="scss">
.class-features {
  min-height: 100vh;
}
.source {
  opacity: 0.5;
}
</style>
