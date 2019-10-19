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
          Weapon - {{ selectedItem.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <v-container class="pa-0">
          <v-layout row wrap v-if="selectedItem">
            <!-- Weapons Name -->
            <v-flex xs12>
              <v-text-field
                label="Name"
                type="text"
                required
                :readonly="browse"
                v-model="selectedItem.name"
                v-validate="'required'"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
                @input="handleInput('name', $event)"
              />
            </v-flex>

            <v-flex xs12 class="mb-4">
              <v-switch
                color="accent"
                label="Profiecient"
                :persistent-hint="selectedItem.proficient"
                :hint="proficientHint"
                :input-value="selectedItem.proficient"
                :true-value="true"
                :false-value="false"
                @change="handleInput('proficient', $event)"
              ></v-switch>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Damage"
                type="text"
                :readonly="browse"
                v-model="selectedItem.damage"
                data-vv-name="damage"
                :error-messages="errors.collect('damage')"
                @input="handleInput('damage', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Weapon Type"
                type="text"
                :readonly="browse"
                v-model="selectedItem.weaponType"
                @input="handleInput('weaponType', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Damage Type"
                type="text"
                :readonly="browse"
                v-model="selectedItem.damageType"
                @input="handleInput('damageType', $event)"
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
                label="Cost"
                type="text"
                :readonly="browse"
                v-model="selectedItem.cost"
                @input="handleInput('cost', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-combobox
                label="Properties"
                :readonly="browse"
                :value="selectedItem.properties || []"
                multiple
                chips
                deletable-chips
                @input="handleInput('properties', $event)"
              />
            </v-flex>

            <!-- Weapons Description -->
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
                color="secondary"
                :disabled="!isFormValid"
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
      <div style="flex: 1 1 auto;" />
    </v-card>
  </v-dialog>
</template>

<script>
import character from '../../../mixins/character'
import proficiencyBonus from '../../../mixins/proficiencyBonus'
import validation from '../../../mixins/validation'
// import CustomSelect from '../../inputs/CustomSelect'
import debounce from 'debounce'

export default {
  // Name
  name: 'WeaponsDialog',

  // Components
  components: {
    // CustomSelect
  },

  // Mixins
  mixins: [
    character,
    proficiencyBonus,
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
        proficient: false,
        description: undefined
      },
      loading: false,
      endpoint: 'weapons'
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
    },
    proficientHint () {
      const bonus = this.proficiencyBonus || 0
      return `Add Profiency Bonus to Attack Roll (+${bonus})`
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
      this.$set(this.selectedItem, field, value)
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
      console.log('handle dialog input', value)
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
    this.updateClassWeaponsure = debounce(this.updateClassWeaponsure, 500)
  }
}
</script>

<style scoped lang="scss">
</style>
