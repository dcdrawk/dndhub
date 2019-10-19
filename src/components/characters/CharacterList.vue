<template>
  <div class="character-list-container">
    <!-- Character List -->
    <v-list
      v-if="characters"
      two-line
      class="character-list elevation-1"
    >
      <!-- List Tile -->
      <v-list-item
        v-for="(item, key) in characters"
        :key="key"
        @click="selectCharacter(key)"
      >
        <!-- Checkbox -->
        <v-list-item-action>
          <v-checkbox
            color="secondary"
            true-value="testdd"
            :input-value="characterId === key"
          />
        </v-list-item-action>

        <!-- Content -->
        <v-list-item-content>
          <!-- Character Name -->
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>

          <!-- Character Details -->
          <v-list-item-subtitle>
            Level {{ item.level }} {{ item.race }}
            <span
              v-if="item.enableMulticlass"
            >
              <span
                v-for="(classObj, classKey) in item.classes"
                :key="classKey"
              >
                {{ classObj.name }}
              </span>
            </span>
            <span v-else-if="item.classes">
              {{ item.classes[Object.keys(item.classes)[0]].name }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <!-- List Menu -->
          <v-menu
            v-if="user"
            left
            :z-index="5"
          >
            <template v-slot:activator="{ on }">
              <!-- Menu Activator -->
              <v-btn
                class="menu-toggle"
                icon
                v-on="on"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>

            <!-- Menu List -->
            <v-list dense>
              <!-- Duplicate Character -->
              <v-list-item
                @click="duplicateCharacter(item)"
              >
                <v-list-item-title>
                  <v-icon class="mr-2">
                    content_copy
                  </v-icon>
                  Duplicate
                </v-list-item-title>
              </v-list-item>

              <!-- Delete -->
              <v-list-item
                @click="showDeleteDialog(item, key)"
              >
                <v-list-item-title>
                  <v-icon class="mr-2">
                    delete
                  </v-icon>
                  Delete
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <!-- Delete Character Dialog -->
    <v-dialog
      v-model="deleteCharacterDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title v-if="characterToDelete">
          <span>Delete {{ characterToDelete.name }}?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
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
  name: 'TheCharacterList',

  // Props
  props: {
    characters: {
      type: Object,
      default: () => {}
    }
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
