<template>
  <div class="character-list-container">

  <!-- Character List -->
  <v-list
    v-if="characters"
    two-line
    class="character-list"
  >
    <!-- List Tile -->
    <v-list-tile
      v-for="(item, key) in characters"
      :key="key"
      @click.capture="selectCharacter(item, key)"
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
          Level {{ item.level }} {{ item.race }} {{ item.class }}
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <!-- List Menu -->
        <v-menu v-if="user" light left :z-index="5">
          <!-- Menu Activator -->
          <v-btn class="menu-toggle" light icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>

          <!-- Menu List -->
          <v-list light dense>
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
  </v-list>
  <v-divider/>

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
    character () {
      return this.$store.state.character
    },

    user () {
      return this.$store.state.user
    },

    characterId () {
      return this.character
        ? this.character.id
        : undefined
    }
  },

  // Methods
  methods: {
    /**
     * Delete Character
     * @param {String} - id
     */
    async deleteCharacter (id) {
      try {
        this.loading = true
        await this.$db
          .ref(`characters/${this.user.uid}/${this.characterToDelete.id}`)
          .remove()
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
     * @param {Object} - character
     * @param {String} - key
     */
    selectCharacter (character, key) {
      character.id = key
      this.$store.commit('select_character', character)
    },

    /**
     * Show Delete Dialog
     * @param {Object} - character
     */
    async showDeleteDialog (character) {
      this.deleteCharacterDialog = true
      this.characterToDelete = character
    }
  }
}
</script>

<style scoped lang="scss">
.character-list-container {
  margin-bottom: 72px;
}
</style>
