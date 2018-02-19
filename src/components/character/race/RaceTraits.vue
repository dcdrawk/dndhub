<template>
  <div class="class-features">
    <!-- Character List -->
    <v-list
      v-if="traits"
      two-line
      dense
      class="character-list elevation-1"
    >
      <!-- Traits List -->
      <v-list-tile
        v-for="(item, key) in traits"
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
    <race-trait-dialog
      :show-dialog="showDialog"
      :item="selectedItem"
      @close="showDialog = false"
    />
  </div>
</template>

<script>
/**
 * <class-features></class-features>
 * @desc A character's class features
 */
import races from '../../../mixins/game-data/races'
import character from '../../../mixins/character'

import CustomSelect from '../../inputs/CustomSelect'
import RaceTraitDialog from './RaceTraitDialog'
export default {
  // Name
  name: 'race-traits',

  // Components
  components: {
    CustomSelect,
    RaceTraitDialog
    // ClassFeatureDialog
  },

  // Mixins
  mixins: [
    character,
    races
  ],

  // Data
  data () {
    return {
      defaultItem: {
        name: '',
        description: '',
        new: true
      },
      customTraits: [],
      selectedItem: undefined,
      showDialog: false
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    race () {
      if (!this.character) return
      return this.character.race
    },

    subrace () {
      if (!this.character) return
      return this.character.subrace
    },

    raceData () {
      for (let i in this.races) {
        if (this.races[i].name === this.race) {
          return this.races[i]
        }
      }
    },

    subraceData () {
      if (!this.subrace) return
      for (let i in this.raceData.subraces) {
        if (this.raceData.subraces[i].name === this.subrace) {
          return this.raceData.subraces[i]
        }
      }
    },

    raceTraitsData () {
      return this.raceData.traits.map((item) => {
        item.source = this.race
        return item
      })
    },

    subraceTraitsData () {
      if (!this.subraceData) return []
      return this.subraceData.traits.map((item) => {
        item.source = this.subrace
        return item
      })
    },

    traits () {
      const array = [
        ...this.customTraits,
        ...this.raceTraitsData,
        ...this.subraceTraitsData
      ]
      // return array
      return array.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    },

    defaultRaceTraits () {
      if (!this.classFeaturesData || !this.character) return
      let defaultFeatures = []
      if (this.character.enableMulticlass) {
        for (let i in this.character.classes) {
          const classObj = this.character.classes[i]
          defaultFeatures = defaultFeatures.concat(this.getTraitsData(classObj))
        }
      } else {
        defaultFeatures = this.getTraitsData(this.primaryClass)
      }
      return defaultFeatures
    }
  },

  // Methods
  methods: {
    /**
     * Get Race Traits
     * retrieve the list of the characters custom traits
     */
    getRaceTraits () {
      this.$db.ref(
        `raceTraits/${this.characterId}`
      ).on('value', (snapshot) => {
        const value = snapshot.val()
        const traits = Object.values(value || [])
          .map((item, index) => {
            item.id = Object.keys(snapshot.val())[index]
            item.custom = true
            item.source = 'Custom'
            return item
          })
        this.customTraits = traits
      })
    },

    /**
     * Get Features Data
     * return an array of all features associated with a class
     * @param {Object} - classObj
     */
    getTraitsData (classObj) {
      let features = []
      for (let i in this.classFeaturesData) {
        const classFeature = this.classFeaturesData[i]
        if (classObj.name === classFeature.class) {
          const abilities = classFeature.abilities.map((ability) => {
            const subclass = classFeature.subclass === 'default'
              ? classFeature.class
              : classFeature.subclass
            ability.subclass = subclass
            return ability
          })
          if (classFeature.subclass === 'default') {
            features = features.concat(abilities)
          } else if (classFeature.subclass === classObj.subclass) {
            features = features.concat(abilities)
          }
        }
      }
      return features
    },

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
    this.getRaceTraits()
    // Listen for events from the parent component
    this.$bus.$on('new-race-trait', () => {
      // this.selectedItem = this.defaultFeature
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
