<template>
  <div class="character-list-container">

    <!-- Character List -->
    <v-list
      v-if="characters"
      two-line
      class="character-list elevation-1"
    >
      <!-- List Tile -->
      <v-list-tile
        v-for="(item, key) in characters"
        :key="key"
        @click="selectCharacter(key)"
      >
        <!-- Checkbox -->
        <v-list-tile-action>
          <v-checkbox
            color="secondary"
            true-value="testdd"
            :input-value="characterId === key"
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
            Level {{ item.level }} {{ item.race }}
            <span
              v-if="item.enableMulticlass"
            >
              <span
                v-for="(classObj, key) in item.classes"
                :key="key"
              >
                {{classObj.name}}
              </span>
            </span>
            <span v-else-if="item.classes">
              {{ item.classes[Object.keys(item.classes)[0]].name }}
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <!-- List Menu -->
          <v-menu v-if="user" left :z-index="5">
            <!-- Menu Activator -->
            <v-btn class="menu-toggle" icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>

            <!-- Menu List -->
            <v-list dense>
              <!-- Duplicate Character -->
              <v-list-tile
                @click="duplicateCharacter(item)"
              >
                <v-list-tile-title>
                  <v-icon class="mr-2">content_copy</v-icon>
                  Duplicate
                </v-list-tile-title>
              </v-list-tile>

              <!-- Delete -->
              <v-list-tile
                @click="showDeleteDialog(item, key)"
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
    </v-list>

    <!-- Delete Character Dialog -->
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
            :disabled="loading"
            :loading="loading"
            @click.stop="deleteCharacter()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
import CharacterCRUD from '../../models/characterCRUD'

export default {
  // Name
  name: 'the-character-list',

  // Props
  props: {
    characters: Object
  },

  // Data
  data () {
    return {
      loading: false,
      newCharacterDialog: false,
      deleteCharacterDialog: false,
      characterToDelete: undefined
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    characterId () {
      return this.$store.state.characterId
    }
  },

  // Methods
  methods: {
    /**
     * Delete Character
     */
    async deleteCharacter () {
      try {
        this.loading = true
        console.log(this.characterToDelete)
        await CharacterCRUD.delete(this.characterToDelete.id)
        // await this.$db
        //   .ref(`characters/${this.user.uid}/${this.characterToDelete.id}`)
        //   .remove()
        this.$bus.$emit(
          'toast',
          `Character Deleted.`
        )
      } catch (error) {

      } finally {
        this.deleteCharacterDialog = false
        this.characterToDelete = undefined
        this.$store.commit('select_character', undefined)
        this.loading = false
      }
    },

    /**
     * Duplicate Character
     * @param {Object} - character
     */
    async duplicateCharacter (character) {
      delete character['.key']
      const chararacteRef = await this.$db
        .ref(`characters/${this.user.uid}`)
        .push(character)
      this.$emit('duplicate', chararacteRef.key)
      this.$bus.$emit(
        'toast',
        `Character Duplicated.`
      )
    },

    /**
     * Select Character
     * @param {String} - id
     */
    selectCharacter (id) {
      if (id === this.characterId) return
      CharacterCRUD.select(id)
    },

    /**
     * Show Delete Dialog
     * @param {Object} - character
     */
    async showDeleteDialog (character, id) {
      this.deleteCharacterDialog = true
      this.characterToDelete = character
      this.$set(this.characterToDelete, 'id', id)
    }
  }
}
</script>

<style scoped lang="scss">
.character-list-container {
  margin-bottom: 72px;
}
</style>
