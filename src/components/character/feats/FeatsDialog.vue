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
           Feat
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <v-container class="pa-0">
          <v-layout row wrap v-if="selectedItem">
            <!-- Feat Name -->
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

            <!-- Feat Description -->
            <v-flex xs12>
              <v-textarea
                label="Description"
                type="text"
                rows="10"
                multi-line
                auto-grow
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
                color="accent"
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
      <div style="flex: 1 1 auto;"/>
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
  name: 'feats-dialog',

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
    item: Object,
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
        console.log(newValue)
        console.log(this.item)
        this.$set(this, 'selectedItem', this.item)
        // this.selectedItem = newValue
        // this.$set(this.selectedItem, i, this.item[i])
      //   for (let i of this.item) {
      //     this.$set(this.selectedItem, i, this.item[i])
      //   }
      //   setTimeout(() => {
      //     this.errors.clear()
      //   }, 0)
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
    this.updateClassFeature = debounce(this.updateClassFeature, 500)
  }
}
</script>

<style scoped lang="scss">
</style>
