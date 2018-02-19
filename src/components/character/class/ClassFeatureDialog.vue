<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
    @input="handleInput($event)"
  >
    <v-card tile v-if="feature">
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
          <span v-if="feature.new">New</span>
           Class Feature
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <v-container class="pa-0">
          <v-layout row wrap>

            <!-- Class Feature Name -->
            <v-flex xs12>
              <v-text-field
                label="Name"
                type="text"
                required
                :readonly="isReadOnly"
                v-model="classFeature.name"
                v-validate="'required'"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
                @input="handleInput('name', $event)"
              />
            </v-flex>

            <!-- Class Feature Level -->
            <v-flex xs12>
              <v-text-field
                label="Level"
                type="number"
                required
                :readonly="isReadOnly"
                v-model="classFeature.level"
                v-validate="'required'"
                data-vv-name="level"
                :error-messages="errors.collect('level')"
              />
            </v-flex>

            <!-- Class Feature Description -->
            <v-flex xs12>
              <v-text-field
                label="Description"
                type="text"
                rows="10"
                required
                multi-line
                :readonly="isReadOnly"
                v-model="classFeature.description"
                v-validate="'required'"
                data-vv-name="description"
                :error-messages="errors.collect('description')"
              />
            </v-flex>

            <!-- Save Button (new) -->
            <v-flex xs12
              v-if="feature.new"
            >
              <v-btn
                block
                color="secondary"
                :disabled="!isFormValid"
                :loading="loading"
                @click="addClassFeature()"
              >
                Save
              </v-btn>
            </v-flex>

            <!-- Delete Button (custom) -->
            <v-flex
              v-if="feature.custom"
            >
              <v-btn
                flat
                icon
                :loading="loading"
                @click="deleteClassFeature()"
              >
                <v-icon>delete</v-icon>
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
import classes from '../../../mixins/game-data/classes'
import races from '../../../mixins/game-data/races'
import character from '../../../mixins/character'
import validation from '../../../mixins/validation'
import CustomSelect from '../../inputs/CustomSelect'
import debounce from 'debounce'

export default {
  // Name
  name: 'class-feature-dialog',

  // Components
  components: {
    CustomSelect
  },

  // Mixins
  mixins: [
    classes,
    races,
    character,
    validation
  ],

  // Props
  props: {
    showDialog: Boolean,
    feature: Object
  },

  // Data
  data () {
    return {
      classFeature: {
        name: undefined,
        level: 1,
        description: ''
      },
      loading: false
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
    featureURL () {
      if (!this.feature) return
      return `classFeatures/${this.characterId}/${this.feature.id}`
    },
    isReadOnly () {
      if (this.feature.new || this.feature.custom) {
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
        const defaultFeature = {
          name: undefined,
          level: 1,
          description: ''
        }
        this.classFeature = this.feature || defaultFeature
      }
    }
  },

  // Methods
  methods: {
    /**
     * Add Class Feature
     */
    async addClassFeature () {
      try {
        await this.validate()
        this.loading = true
        delete this.classFeature.new
        this.$db.ref(
          `classFeatures/${this.characterId}`
        ).push(this.classFeature)

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
    deleteClassFeature () {
      this.$db.ref(this.featureURL).remove()
      this.$emit('close')
      this.$bus.$emit('toast', 'Class Feat Removed')
    },

    /**
     * Update Class Feature
     */
    updateClassFeature (field, value) {
      const update = {}
      update[field] = value
      this.$db.ref(this.featureURL).update(update)
    },

    /**
     * Handle Input
     */
    handleInput (field, value) {
      if (this.feature.new) return
      this.updateClassFeature(field, value)
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
