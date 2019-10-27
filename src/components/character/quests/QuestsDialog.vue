<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    @input="handleDialog($event)"
  >
    <v-card
      v-if="item"
      tile
    >
      <!-- Dialog Toolbar -->
      <v-toolbar
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
          Quest
          <span v-if="selectedItem.name">-</span>
          {{ selectedItem.name }}
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
              <!-- Quest Name -->
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

              <!-- Quest Description -->
              <v-flex xs12>
                <v-textarea
                  v-model="selectedItem.summary"
                  label="Summary"
                  type="text"
                  rows="3"
                  multi-line
                  auto-grow
                  :readonly="browse"
                  @input="handleInput('summary', $event)"
                />
              </v-flex>

              <!-- Weapons Description -->
              <v-flex xs12>
                <v-textarea
                  v-model="selectedItem.description"
                  label="Description"
                  type="text"
                  rows="3"
                  multi-line
                  auto-grow
                  :readonly="browse"
                  @input="handleInput('description', $event)"
                />
              </v-flex>

              <v-flex xs12>
                <v-combobox
                  label="Characters"
                  :readonly="browse"
                  :value="selectedItem.properties || []"
                  multiple
                  chips
                  deletable-chips
                  @input="handleInput('properties', $event)"
                />
              </v-flex>

              <v-flex xs12>
                <v-combobox
                  label="Rewards"
                  :readonly="browse"
                  :value="selectedItem.rewards || []"
                  multiple
                  chips
                  deletable-chips
                  @input="handleInput('rewards', $event)"
                />
              </v-flex>

              <v-flex
                xs12
                class="mb-4"
              >
                <v-switch
                  color="success"
                  label="Completed"
                  :input-value="selectedItem.completed"
                  :true-value="true"
                  :false-value="false"
                  @change="handleInput('completed', $event)"
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
import proficiencyBonus from '../../../mixins/proficiencyBonus'
import validation from '../../../mixins/validation'
import debounce from 'debounce'

export default {
  // Name
  name: 'QuestsDialog',

  // Components
  components: {},

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
        summary: undefined,
        description: undefined,
        characters: [],
        rewards: [],
        completed: false
      },
      loading: false,
      endpoint: 'quests'
    }
  },

  // Computed
  computed: {
    characterId () {
      return this.$store.state.characterId
    },
    // invalid () {
    //   return Object.keys(this.fields).every(
    //     key => this.fields[key].valid
    //   )
    // },
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
    // proficientHint () {
    //   const bonus = this.proficiencyBonus || 0
    //   return `Add Profiency Bonus to Attack Roll (+${bonus})`
    // }
  },

  // Watch
  watch: {
    showDialog (newValue, oldValue) {
      if (newValue) {
        this.$set(this, 'selectedItem', this.item)
        setTimeout(() => {
          this.$_validation_reset()
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
  }
}
</script>

<style scoped lang="scss">
</style>
