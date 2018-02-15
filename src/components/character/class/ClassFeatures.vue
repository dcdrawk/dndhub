<template>
  <div class="class-features">
    CLASS FEATURES

    {{ classFeatures || 'none'}}

    <class-feature-dialog
      :show-dialog="showDialog"
      @close="showDialog = false"
    />

    <!-- Floating Action Button
    <v-fab-transition>
      <v-btn
        v-show="!hideFab"
        color="secondary"
        dark
        fab
        fixed
        bottom
        right
        small
        @click="showDialog = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition> -->
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
      classFeatures: undefined,
      showDialog: false,
      hideFab: true
    }
  },

  computed: {
    user () {
      return this.$store.state.user
    }
  },

  methods: {
    getClassFeatures () {
      this.$db.ref(
        `classFeatures/${this.characterId}`
      ).on('value', (snapshot) => {
        this.classFeatures = snapshot.value
      })
    }
  },

  activated () {
    // console.log('mounted')
    setTimeout(() => {
      this.hideFab = false
    }, 1000)
  },

  deactivated () {
    // this.hideFab = true
  }
}
</script>

<style scoped lang="scss">
.class-features {
  min-height: 100vh;
}
</style>
