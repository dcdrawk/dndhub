<template>
  <v-layout row justify-center>
    <transition appear name="slide-y-reverse-transition" mode="out-in">

      <!-- Loading Spinner -->
      <v-flex v-if="!user || loading" class="loading" xs12  key="loading">
        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
      </v-flex>

      <v-flex v-else xs12 md9>
        <!-- No Characters Message -->
        <div class="no-characters-message" v-if="!characters">
          It looks like you don't have any characters yet.<br><br>
          To get started, tap the '+' in the bottom right
        </div>

        <!-- Character List -->
        <character-list
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
      small
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
import CharacterList from '../../components/characters/CharacterList'
import NewCharacter from '../../components/characters/NewCharacter'

export default {
  // Name
  name: 'characters',

  // Components
  components: {
    CharacterList,
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
        console.log('user!', newValue)
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
      console.log('get characters!')
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
.loading {
  padding: 32px 16px;
  text-align: center;
}
</style>
