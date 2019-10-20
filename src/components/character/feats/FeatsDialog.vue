<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
    @input="handleDialog($event)"
  >
    <v-card
      v-if="item"
      tile
    >
      <!-- Dialog Toolbar -->
      <v-toolbar
        dark
        max-height="56px"
        color="primary"
      >
        <!-- Close Button -->
        <v-btn
          icon
          dark
          @click.native="$emit('close')"
        >
          <v-icon>close</v-icon>
        </v-btn>

        <!-- Dialog Title -->
        <v-toolbar-title>
          <span v-if="newItem">New</span>
          Feat
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <ValidationObserver
          ref="observer"
          v-slot="{ invalid }"
        >
          <v-container class="pl-0 pr-0">
            <v-layout
              v-if="selectedItem"
              row
              wrap
            >
              <!-- Feat Name -->
              <v-flex xs12>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required"
                >
                  <v-text-field
                    v-model="selectedItem.name"
                    label="Name"
                    type="text"
                    required
                    :readonly="browse"
                    :error-messages="errors[0]"
                    @input="handleInput('name', $event)"
                  />
                </ValidationProvider>
              </v-flex>

              <!-- Feat Description -->
              <v-flex xs12>
                <v-textarea
                  v-model="selectedItem.description"
                  label="Description"
                  type="text"
                  rows="10"
                  multi-line
                  auto-grow
                  :readonly="browse"
                  @input="handleInput('description', $event)"
                />
              </v-flex>

              <!-- Dialog Buttons -->
              <v-flex xs12>
                <v-btn
                  v-if="browse || newItem"
                  block
                  color="secondary"
                  :disabled="invalid"
                  :loading="loading"
                  @click="$emit('add-item', selectedItem)"
                >
                  Add
                </v-btn>

                <v-btn
                  v-if="!browse && !newItem"
                  block
                  color="warning"
                  :disabled="invalid"
                  :loading="loading"
                  @click="deleteItem()"
                >
                  Remove
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </ValidationObserver>
      </v-card-text>
      <div style="flex: 1 1 auto;" />
    </v-card>
  </v-dialog>
</template>

<script>
import character from '../../../mixins/character'
import validation from '../../../mixins/validation'
import debounce from 'debounce'

export default {
  // Name
  name: 'FeatsDialog',

  // Mixins
  mixins: [
    character,
    validation
  ],

  // Props
  props: {
    showDialog: Boolean,
    item: {
      type: Object,
      default: () => {}
    },
    browse: Boolean,
    newItem: Boolean
  },

  // Data
  data () {
    return {
      selectedItem: {
        name: undefined,
        description: undefined
      },
      loading: false,
      endpoint: 'feats'
    }
  },

  // Computed
  computed: {
    characterId () {
      return this.$store.state.characterId
    },
    firebaseURL () {
      if (!this.item) return
      return `${this.endpoint}/${this.characterId}/${this.item.id}`
    },
    isReadOnly () {
      if (this.newItem || !this.browse) {
        return false
      } else {
        return true
      }
    }
  },

  // Watch
  watch: {
    showDialog (newValue, oldValue) {
      if (newValue) {
        this.$set(this, 'selectedItem', this.item)
      }
    }
  },

  // Mounted
  mounted () {
    this.updateClassFeature = debounce(this.updateClassFeature, 500)
  },

  // Methods
  methods: {
    /**
     * Delete Item
     */
    deleteItem () {
      this.$db.ref(this.firebaseURL).remove()
      this.$emit('close')
      this.$bus.$emit('toast', `${this.selectedItem.name} Removed`)
    },

    /**
     * Update Item
     */
    updateItem (field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(this.firebaseURL).update(update)
    },

    /**
     * Handle Input
     */
    handleInput (field, value) {
      if (this.newItem) return
      this.updateItem(field, value)
      console.log('handle dialog input')
    },

    /**
     * Handle Dialog
     */
    handleDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
