<template>
  <v-layout column justify-center>
    <transition appear name="slide-y-reverse-transition" mode="out-in">

      <!-- Loading Spinner -->
      <v-flex v-if="!user || loading" class="loading" xs12  key="loading">
        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
      </v-flex>

      <v-flex v-else xs12>
        <!-- No Characters Message -->
        <div class="no-characters-message" v-if="characters.length === 0">
          It looks like you don't have any characters yet.<br><br>
          To get started, tap the '+' in the bottom right
        </div>

        <TheCharacterList
          :characters="characters"
        />
      </v-flex>
    </transition>

    <!-- Floating Action Button -->
    <v-btn
      color="secondary"
      dark
      fab
      fixed
      bottom
      right
      @click="newCharacterDialog = true"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <!-- New Character Dialog -->
    <new-character
      :show-dialog="newCharacterDialog"
      @close="newCharacterDialog = false"
    />

  </v-layout>
</template>

<script>
import TheCharacterList from '../../components/characters/TheCharacterList'
import NewCharacter from '../../components/characters/NewCharacter'
// // import TheCharacterList from '../../components/characters/TheCharacterList'

export default {
  // Name
  name: 'character-list',

  // Components
  components: {
    TheCharacterList,
    NewCharacter
  },

  // Data
  data () {
    return {
      characters: undefined,
      newCharacterDialog: false,
      loading: false
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    }
  },

  // Watch
  watch: {
    user: {
      immediate: true,
      handler: function (newValue, oldValue) {
        if (!newValue) return
        this.getCharacters()
      }
    }
  },

  // Methods
  methods: {
    /**
     * Get Characters
     * Gets a list of the user's characters
     */
    getCharacters () {
      this.loading = true
      this.$db.ref(`characters/${this.user.uid}`)
        .on('value', (snapshot) => {
          this.characters = snapshot.val()
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.no-characters-message {
  margin: 20px 0 10px;
  text-align: center;
}
.character-list {
  margin-bottom: 72px;
}
.loading {
  padding: 32px 16px;
  text-align: center;
}
</style>
