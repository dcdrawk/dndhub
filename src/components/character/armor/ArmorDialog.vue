<template>
  <v-row>
    <v-dialog
      :value="showDialog"
      fullscreen
      transition="dialog-bottom-transition"
      @input="handleDialog($event)"
    >
      <v-card
        v-if="item"
      >
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="$emit('close')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Armor - {{ item.name }}</v-toolbar-title>
          <!-- <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items> -->
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
                <!-- Armor Name -->
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

                <v-flex xs12>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Armor Class"
                    rules="required"
                  >
                    <v-text-field
                      v-model="selectedItem.ac"
                      label="Armor Class"
                      type="text"
                      required
                      :readonly="browse"
                      :error-messages="errors[0]"
                      @input="handleInput('ac', $event)"
                    />
                  </ValidationProvider>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="selectedItem.armorType"
                    label="Armor Type"
                    type="text"
                    :readonly="browse"
                    @input="handleInput('armorType', $event)"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="selectedItem.weight"
                    label="Weight"
                    type="text"
                    :read-only="browse"
                    @input="handleInput('weight', $event)"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="selectedItem.cost"
                    label="Cost"
                    type="text"
                    :readonly="browse"
                    @input="handleInput('cost', $event)"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-combobox
                    multiple
                    label="Properties"
                    :readonly="browse"
                    :value="selectedItem.properties || []"
                    chips
                    deletable-chips
                    @input="handleInput('properties', $event)"
                  />
                </v-flex>

                <!-- Armor Description -->
                <v-flex xs12>
                  <v-textarea
                    v-model="selectedItem.description"
                    label="Description"
                    type="text"
                    rows="10"
                    multi-line
                    :readonly="browse"
                    @input="handleInput('description', $event)"
                  />
                </v-flex>

                <!-- Dialog Buttons -->
                <v-flex xs12>
                  <v-btn
                    v-if="browse || newItem"
                    block
                    color="accent"
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
  </v-row>
</template>

<script>
import character from '../../../mixins/character'
import validation from '../../../mixins/validation'
import debounce from 'debounce'

export default {
  // Name
  name: 'ArmorDialog',

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
        ac: undefined,
        description: undefined
      },
      loading: false,
      endpoint: 'armor'
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
        this.$_validation_reset()
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
