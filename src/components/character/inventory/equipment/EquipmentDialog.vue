<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
    @input="handleDialog($event)"
  >
    <v-card tile v-if="item">
      <!-- Dialog Toolbar -->
      <v-toolbar card dark color="primary">
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
          Equipment
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <v-container class="pa-0">
          <v-layout row wrap v-if="selectedItem">
            <!-- Armor Name -->
            <v-flex xs12>
              <v-text-field
                label="Name*"
                type="text"
                :value="selectedItem.name"
                v-validate="'required'"
                data-vv-name="name"
                :error-messages="errors.first('name')"
                @input="handleInput('name', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Quantity*"
                type="number"
                required
                :readonly="browse"
                v-model="selectedItem.quantity"
                v-validate="'required'"
                data-vv-name="quantity"
                :error-messages="errors.first('quantity')"
                @input="handleInput('quantity', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Weight"
                type="text"
                :read-only="browse"
                v-model="selectedItem.weight"
                @input="handleInput('weight', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Value"
                type="text"
                :readonly="browse"
                v-model="selectedItem.cost"
                @input="handleInput('cost', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-combobox
                multiple
                label="Properties"
                :readonly="browse"
                v-model="selectedItem.properties"
                chips
                deletable-chips
                @input="handleInput('properties', $event)"
              />
            </v-flex>

            <!-- Armor Description -->
            <v-flex xs12>
              <v-textarea
                label="Description"
                type="text"
                rows="10"
                multi-line
                :readonly="browse"
                v-model="selectedItem.description"
                data-vv-name="description"
                :error-messages="errors.collect('description')"
                @input="handleInput('description', $event)"
              />
            </v-flex>

            <!-- Dialog Buttons -->
            <v-flex xs12>
              <v-btn
                v-if="browse || newItem"
                block
                color="accent"
                :disabled="newItem && !isFormValid"
                :loading="loading"
                @click="$emit('add-item', selectedItem)"
              >
                Add
              </v-btn>

              <v-btn
                v-if="!browse && !newItem"
                block
                color="warning"
                :disabled="!isFormValid"
                :loading="loading"
                @click="deleteItem()"
              >
                Remove
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <!-- <div style="flex: 1 1 auto;"/> -->
    </v-card>
  </v-dialog>
</template>

<script>
import character from '@/mixins/character'
import validation from '@/mixins/validation'
import debounce from 'debounce'

export default {
  // Name
  name: 'EquipmentDialog',

  // Components
  components: {},

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
        description: undefined,
        properties: []
      },
      loading: false,
      endpoint: 'equipment'
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
        setTimeout(() => {
          this.errors.clear()
        }, 0)
      }
    }
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
      this.selectedItem[field] = value
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
  },

  // Mounted
  mounted () {
    this.updateClassArmorure = debounce(this.updateClassArmorure, 500)
  }
}
</script>

<style scoped lang="scss">
</style>
