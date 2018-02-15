<template>
  <div class="class-features">
    <!-- Character List -->
    <v-list
      v-if="classFeatures"
      two-line
      dense
      class="character-list elevation-1"
    >
      <!-- List Tile -->
      <v-list-tile
        v-for="(item, key) in classFeaturesArray"
        :key="key"
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
    </v-list>

    <class-feature-dialog
      :show-dialog="showDialog"
      :feature="selectedFeature"
      @close="showDialog = false"
    />
  </div>
</template>

<script>
/**
 * <class-feature></class-feature>
 * @desc A character's class features
 */
import classes from '../../../mixins/game-data/classes'
import character from '../../../mixins/character'

import CustomSelect from '../../inputs/CustomSelect'
import ClassFeatureDialog from './ClassFeatureDialog'
export default {
  // Name
  name: 'class-features',

  // Components
  components: {
    CustomSelect,
    ClassFeatureDialog
  },

  // Mixins
  mixins: [
    character,
    classes
  ],

  data () {
    return {
      defaultFeature: {
        title: '',
        level: 1,
        description: '',
        new: true
      },
      classFeatures: undefined,
      selectedFeature: undefined,
      showDialog: false,
      hideFab: true
    }
  },

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
      const array = [...this.classFeatures, ...this.defaultClassFeatures]
      return array.sort((a, b) => {
        if (+a.level < +b.level) {
          return -1
        }
        if (+a.level > +b.level) {
          return 1
        }
        return 0
      })
    },

    defaultClassFeatures () {
      if (!this.classFeaturesData || !this.character) return
      let defaultFeatures = []
      if (this.character.enableMulticlass) {
        for (let i in this.character.classes) {
          const classObj = this.character.classes[i]
          // this.character.classes.forEach((classObj) => {
          defaultFeatures = defaultFeatures.concat(this.getFeaturesData(classObj))
        }
      } else {
        defaultFeatures = this.getFeaturesData(this.primaryClass)
      }
      return defaultFeatures
    }
  },

  methods: {
    getClassFeatures () {
      this.$db.ref(
        `classFeatures/${this.characterId}`
      ).on('value', (snapshot) => {
        const features = Object.values(snapshot.val())
          .map((item, index) => {
            item.id = Object.keys(snapshot.val())[index]
            item.custom = true
            return item
          })
        this.classFeatures = features
      })
    },

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

    handleShowDialog (feature) {
      this.selectedFeature = feature
      this.showDialog = true
    }
  },

  created () {
    this.getClassFeatures()
    this.$bus.$on('new-class-feat', () => {
      this.selectedFeature = this.defaultFeature
      this.showDialog = true
    })
  }
}
</script>

<style scoped lang="scss">
.class-features {
  min-height: 100vh;
}
.subclass {
  opacity: 0.5;
}
</style>
