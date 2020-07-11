<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    @input="handleInput($event)"
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
          <span v-if="item.new">New</span>
          Race Trait
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <ValidationObserver
          ref="observer"
          v-slot="{ invalid }"
        >
          <v-row
            wrap
          >
            <!-- Class Feature Name -->
            <v-col cols="12">
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
                  filled
                  color="secondary"
                  hide-details="auto"
                  :readonly="isReadOnly"
                  :error-messages="errors[0]"
                  @input="handleInput('name', $event)"
                />
              </ValidationProvider>
            </v-col>

            <!-- Class Feature Description -->
            <v-col cols="12">
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
                  filled
                  color="secondary"
                  hide-details="auto"
                  :readonly="isReadOnly"
                  :error-messages="errors[0]"
                  @input="handleInput('description', $event)"
                />
              </ValidationProvider>
            </v-col>

            <!-- Save Button (new) -->
            <v-col
              v-if="item.new"
              cols="12"
            >
              <v-btn
                block
                color="secondary"
                :disabled="invalid"
                :loading="loading"
                @click="addItem()"
              >
                Add Race Trait
              </v-btn>
            </v-col>

            <!-- Delete Button (custom) -->
            <v-col
              v-if="item.custom"
              cols="12"
            >
              <v-btn
                outlined
                color="warning"
                :loading="loading"
                @click="deleteItem()"
              >
                <v-icon>delete</v-icon>
                delete
              </v-btn>
            </v-col>
          </v-row>
        </ValidationObserver>
      </v-card-text>
      <div style="flex: 1 1 auto;" />
    </v-card>
  </v-dialog>
</template>

<script>
import character from '../../../mixins/character'
import validation from '../../../mixins/validation'
// import CustomSelect from '../../inputs/CustomSelect'
import debounce from 'debounce'

export default {
  // Name
  name: 'RaceTraitDialog',

  // Components
  components: {
    // CustomSelect
  },

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
      endpoint: 'raceTraits'
    }
  },

  // Computed
  computed: {
    characterId () {
      return this.$store.state.characterId
    },
    // isFormValid () {
    //   return Object.keys(this.fields).every(
    //     key => this.fields[key].valid
    //   )
    // },
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
        this.$_validation_reset()
        this.selectedItem = this.item
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
     * Add Item
     */
    async addItem () {
      try {
        await this.validate()
        this.loading = true
        delete this.selectedItem.new
        this.$db.ref(
          `${this.endpoint}/${this.characterId}`
        ).push(this.selectedItem)

        this.$bus.$emit('toast', 'Race Trait Added.')
        this.$emit('close')
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Delete Item
     */
    deleteItem () {
      this.$db.ref(this.firebaseURL).remove()
      this.$emit('close')
      this.$bus.$emit('toast', 'Race Trait Removed')
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
      if (this.item.new) return
      this.updateItem(field, value)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
