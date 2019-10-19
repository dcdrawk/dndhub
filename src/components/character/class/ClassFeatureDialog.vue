<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
    @input="handleInput($event)"
  >
    <v-card tile>
      <!-- Dialog Toolbar -->
      <v-toolbar
        card
        dark
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
          <span v-if="item.new">New</span>
          Class Feature
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <v-container class="pa-0">
          <v-layout
            row
            wrap
          >
            <!-- Class Feature Name -->
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
                  :readonly="isReadOnly"
                  :error-messages="errors[0]"
                  @input="handleInput('name', $event)"
                />
              </ValidationProvider>
            </v-flex>

            <!-- Class Feature Level -->
            <v-flex xs12>
              <ValidationProvider
                v-slot="{ errors }"
                name="Level"
                rules="required"
              >
                <v-text-field
                  v-model="selectedItem.level"
                  label="Level"
                  type="number"
                  required
                  :readonly="isReadOnly"
                  :error-messages="errors[0]"
                  @input="handleInput('level', $event)"
                />
              </ValidationProvider>
            </v-flex>

            <!-- Class Feature Description -->
            <v-flex xs12>
              <ValidationProvider
                v-slot="{ errors }"
                name="Description"
                rules="required"
              >
                <v-textarea
                  v-model="selectedItem.description"
                  label="Description"
                  type="text"
                  rows="10"
                  required
                  multi-line
                  :readonly="isReadOnly"
                  :error-messages="errors[0]"
                  @input="handleInput('description', $event)"
                />
              </ValidationProvider>
            </v-flex>

            <!-- Save Button (new) -->
            <v-flex
              v-if="item.new"
              xs12
            >
              <v-btn
                block
                color="secondary"
                :disabled="!isFormValid"
                :loading="loading"
                @click="addItem()"
              >
                Add Class Feature
              </v-btn>
            </v-flex>

            <!-- Delete Button (custom) -->
            <v-flex
              v-if="item.custom"
            >
              <v-btn
                outline
                color="warning"
                :loading="loading"
                @click="deleteItem()"
              >
                <v-icon>delete</v-icon>
                delete
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
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
  name: 'ClassFeatureDialog',

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
    }
  },

  // Data
  data () {
    return {
      selectedItem: {
        name: undefined,
        level: 1,
        description: ''
      },
      loading: false,
      endpoint: 'classFeatures'
    }
  },

  // Computed
  computed: {
    characterId () {
      return this.$store.state.characterId
    },
    isFormValid () {
      return Object.keys(this.fields).every(
        key => this.fields[key].valid
      )
    },
    firebaseURL () {
      if (!this.item) return
      return `${this.endpoint}/${this.characterId}/${this.item.id}`
    },
    isReadOnly () {
      if (this.item.new || this.item.custom) {
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
        setTimeout(() => {
          this.errors.clear()
        }, 0)
      }
    }
  },

  // Mounted
  mounted () {
    this.updateItem = debounce(this.updateItem, 500)
  },

  // Methods
  methods: {
    /**
     * Add Class Feature
     */
    async addItem () {
      try {
        await this.validate()
        this.loading = true
        delete this.selectedItem.new
        this.$db.ref(
          `${this.endpoint}/${this.characterId}`
        ).push(this.selectedItem)

        this.$bus.$emit('toast', 'Class Feat Added.')
        this.$emit('close')
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Delete Class Feature
     */
    deleteItem () {
      this.$db.ref(this.firebaseURL).remove()
      this.$emit('close')
      this.$bus.$emit('toast', 'Class Feat Removed')
    },

    /**
     * Update Class Feature
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
      if (this.item.new) return
      this.updateItem(field, value)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
