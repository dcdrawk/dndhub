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

        <!-- Character List -->
        <v-list
          v-if="characters"
          two-line
          class="character-list"
        >
          <!-- List Tile -->
          <v-list-tile
            v-for="(item, index) in characters"
            :key="index"
            @click.capture="selectCharacter(item)"
          >
            <!-- Checkbox -->
            <v-list-tile-action>
              <v-checkbox
                color="secondary"
                true-value="testdd"
                :input-value="characterId === item['.key']"
              />
            </v-list-tile-action>

            <!-- Content -->
            <v-list-tile-content>
              <!-- Character Name -->
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>

              <!-- Character Details -->
              <v-list-tile-sub-title>
                Level {{ item.level }} {{ item.race }} {{ item.class }}
              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>

            <!-- Toolbar Menu (if a user is signed in)-->
            <v-menu v-if="user" light left :z-index="5">
              <!-- Menu Activator -->
              <v-btn class="menu-toggle" light icon slot="activator">
                <v-icon>more_vert</v-icon>
              </v-btn>

              <!-- Menu List -->
              <v-list light dense>
                <!-- Sign Out -->
                <v-list-tile
                  @click="duplicateCharacter(item)"
                >
                  <v-list-tile-title>
                    <v-icon class="mr-2">content_copy</v-icon>
                    Duplicate
                  </v-list-tile-title>
                </v-list-tile>
                <!-- Sign Out -->
                <v-list-tile
                  @click="showDeleteDialog(item)"
                >
                  <v-list-tile-title>
                    <v-icon class="mr-2">delete</v-icon>
                    Delete
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider/>
        </v-list>

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

    <v-dialog
      v-model="deleteCharacterDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title v-if="characterToDelete">
          <span>Delete {{characterToDelete.name}}?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            flat
            @click.stop="deleteCharacterDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="error"
            @click.stop="deleteCharacter()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </v-layout>
</template>

<script>
import NewCharacter from '../../components/new-character/NewCharacter'
// import { blobToArrayBuffer } from 'blob-util'
// import classes from '../../mixins/classes'

export default {
  // Name
  name: 'character-list',

  // Components
  components: {
    NewCharacter
  },

  // Data
  data () {
    return {
      characters: undefined,
      loading: false,
      newCharacterDialog: false,
      deleteCharacterDialog: false,
      characterToDelete: undefined
    }
  },

  // Computed
  computed: {
    character () {
      return this.$store.state.character
    },
    user () {
      return this.$store.state.user
    },
    characterId () {
      return this.character
        ? this.character['.key']
        : undefined
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
    getCharacters () {
      this.loading = true
      this.$bindAsArray(
        'characters',
        this.$db.ref(`characters/${this.user.uid}`),
        null,
        () => {
          this.loading = false
        }
      )
    },

    async deleteCharacter (id) {
      try {
        await this.$db
          .ref(`characters/${this.user.uid}/${this.characterToDelete['.key']}`)
          .remove()
      } catch (error) {

      } finally {
        this.showDeleteDialog = false
        this.deleteCharacterDialog = false
        this.$store.commit('select_character', undefined)
      }
    },

    async duplicateCharacter (character) {
      delete character['.key']
      await this.$db
        .ref(`characters/${this.user.uid}`)
        .push(character)
    },

    selectCharacter (character) {
      this.$store.commit('select_character', character)
    },

    async showDeleteDialog (character) {
      this.deleteCharacterDialog = true
      this.characterToDelete = character
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
