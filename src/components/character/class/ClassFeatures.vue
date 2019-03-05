<template>
  <div class="class-features">
    <search-bar
      v-model="search"
    />
    <!-- Character List -->
    <v-list
      v-if="filteredItems"
      two-line
      dense
      class="character-list elevation-1"
    >
      <template v-for="(item, index) in filteredItems">
        <!-- List Tile -->
        <v-list-tile
          :key="index"
          @click="handleShowDialog(item)"
        >
          <!-- Content -->
          <v-list-tile-content>
            <!-- Character Name -->
            <v-list-tile-title>
              {{ item.name }}
            </v-list-tile-title>

            <!-- Character Details -->
            <v-list-tile-sub-title>
              Level {{ item.level }}
              <span class="subclass">{{ item.subclass || 'Custom' }} </span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index < filteredItems.length - 1"
          :key="`${index}-divider`"
        ></v-divider>
      </template>
    </v-list>

    <class-feature-dialog
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
import classes from '../../../mixins/game-data/classes'
import character from '../../../mixins/character'
import CustomSelect from '../../inputs/CustomSelect'
import ClassFeatureDialog from './ClassFeatureDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'class-features',

  // Components
  components: {
    CustomSelect,
    ClassFeatureDialog,
    SearchBar
  },

  // Mixins
  mixins: [
    character,
    classes
  ],

  // Data
  data () {
    return {
      defaultItem: {
        title: '',
        level: 1,
        description: '',
        new: true
      },
      classFeatures: undefined,
      selectedItem: undefined,
      showDialog: false,
      hideFab: true,
      search: undefined
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    classFeaturesData () {
      return this.$store.state.gameData.classFeatures
    },

    primaryClassId () {
      return this.character
        ? Object.keys(this.character.classes)[0]
        : {}
    },

    primaryClass () {
      return this.primaryClassId
        ? this.character.classes[this.primaryClassId]
        : {}
    },

    classFeaturesArray () {
      if (!this.classFeatures || !this.defaultClassFeatures) return
      const array = [...this.classFeatures, ...this.defaultClassFeatures]
      return array.sort((a, b) => {
        if (+a.level < +b.level) return -1
        if (+a.level > +b.level) return 1
        return 0
      })
    },

    defaultClassFeatures () {
      if (!this.classFeaturesData || !this.character) return
      let defaultItems = []
      if (this.character.enableMulticlass) {
        for (let i in this.character.classes) {
          const classObj = this.character.classes[i]
          defaultItems = defaultItems.concat(this.getFeaturesData(classObj))
        }
      } else {
        defaultItems = this.getFeaturesData(this.primaryClass)
      }
      return defaultItems
    },

    filteredItems () {
      if (!this.classFeaturesArray) return
      const array = this.classFeaturesArray
      return array.filter((item) => {
        return this.search
          ? item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          : true
      })
    }
  },

  // Methods
  methods: {
    /**
     * Get Class Features
     * retrieve the list of the characters custom class features from firebase
     */
    getClassFeatures () {
      this.$db.ref(
        `classFeatures/${this.characterId}`
      ).on('value', (snapshot) => {
        const value = snapshot.val()
        const features = Object.values(value || [])
          .map((item, index) => {
            item.id = Object.keys(snapshot.val())[index]
            item.custom = true
            return item
          })
        this.classFeatures = features
      })
    },

    /**
     * Get Features Data
     * return an array of all features associated with a class
     * @param {Object} - classObj
     */
    getFeaturesData (classObj) {
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
    this.getClassFeatures()
    // Listen for events from the parent component
    this.$bus.$on('new-class-feat', () => {
      this.selectedItem = {...this.defaultItem}
      this.showDialog = true
    })
  }
}
</script>

<style scoped lang="scss">
.subclass {
  opacity: 0.5;
}
</style>
