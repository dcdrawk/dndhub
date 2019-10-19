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
          <span v-if="newItem">New</span>
          Spell - {{ selectedItem.name }}
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <v-container class="pa-0">
          <v-layout
            v-if="selectedItem"
            row
            wrap
          >
            <!-- Spells Name -->
            <v-flex xs12>
              <v-text-field
                v-model="selectedItem.name"
                v-validate="'required'"
                label="Name"
                type="text"
                required
                :readonly="browse"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
                @input="handleInput('name', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="selectedItem.casting_time"
                label="Casting Time"
                type="text"
                :readonly="browse"
                @input="handleInput('casting_time', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="selectedItem.range"
                label="Range"
                type="text"
                :readonly="browse"
                @input="handleInput('range', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="selectedItem.duration"
                label="Duration"
                type="text"
                :readonly="browse"
                @input="handleInput('duration', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="selectedItem.components"
                label="Components"
                type="text"
                :readonly="browse"
                @input="handleInput('components', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="selectedItem.level"
                label="Level"
                :readonly="browse"
                :items="spellLevels"
                @input="handleInput('level', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="selectedItem.school"
                label="School"
                :readonly="browse"
                :items="spellSchools"
                @input="handleInput('school', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-select
                label="Class"
                :readonly="browse"
                color="accent"
                :value="getClasses(selectedItem)"
                :items="classes"
                chips
                multiple
                item-value="name"
                item-text="name"
                dense
                @input="handleInput('class', $event.join(', '))"
              />
            </v-flex>

            <v-flex xs12>
              <v-switch
                label="Ritual"
                :disabled="browse"
                color="accent"
                :input-value="selectedItem.ritual"
                :true-value="'1'"
                :false-value="'0'"
                @change="handleInput('ritual', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-switch
                label="Concentration"
                :disabled="browse"
                color="accent"
                :input-value="selectedItem.concentration"
                :true-value="'1'"
                :false-value="'0'"
                @change="handleInput('concentration', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="selectedItem.desc"
                label="Description"
                type="text"
                rows="10"
                multi-line
                :readonly="browse"
                @input="handleInput('desc', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="selectedItem.higher_level"
                label="At Higher Levels"
                type="text"
                rows="5"
                multi-line
                :readonly="browse"
                @input="handleInput('higher_level', $event)"
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
import spells from '../../../mixins/spells'
import classes from '../../../mixins/game-data/classes'
// import CustomSelect from '../../inputs/CustomSelect'
import debounce from 'debounce'

export default {
  // Name
  name: 'SpellsDialog',

  // Components
  components: {
    // CustomSelect
  },

  // Mixins
  mixins: [
    character,
    classes,
    proficiencyBonus,
    validation,
    spells
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
      endpoint: 'spells'
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
      this.$set(this.selectedItem, field, value)
      const update = {}
      update[field] = value
      this.$db.ref(this.firebaseURL).update(update)
    },

    /**
     * Handle Input
     */
    handleInput (field, value) {
      if (this.newItem) {
        this.$set(this.item, field, value)
        return
      }
      this.updateItem(field, value)
      console.log('handle dialog input', value)
    },

    /**
     * Handle Dialog
     */
    handleDialog () {
      this.$emit('close')
    },

    getClasses (item) {
      return item.class
        ? item.class.split(', ')
        : []
    }
  }
}
</script>

<style scoped lang="scss">
</style>
