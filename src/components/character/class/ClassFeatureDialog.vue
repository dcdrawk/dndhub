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
      <v-card-text>
        <v-container class="pa-0">
          <v-layout row wrap>
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
              />
            </v-flex>

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

            <v-flex xs12
              v-if="!feature"
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

            <v-flex
              v-else-if="feature.custom"
            >
              <v-btn
                color="secondary"
                :disabled="!isFormValid"
                :loading="loading"
                class="mr-0 ml-0"
                @click="addClassFeature()"
              >
                Save & close
              </v-btn>
              <v-btn
                flat
                color="error"
                :loading="loading"
                @click="deleteClassFeature()"
              >
                Delete
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- test -->
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
// import CharacterCRUD from '../../../models/characterCRUD'

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
    // edit: Boolean,
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
    isFormValid () {
      return Object.keys(this.fields).every(
        key => this.fields[key].valid
      )
    },
    isReadOnly () {
      if (this.feature.new || this.feature.custom) {
        return false
      } else {
        return true
      }
    }
  },

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
        this.$db.ref(
          `classFeatures/${this.characterId}`
        ).push(this.classFeature)

        // const characterValue = await CharacterCRUD.create(
        //   this.character, this.characterClasses
        // )
        // // Character.test('TEST')
        // this.loading = true

        // CharacterCRUD.select(characterValue.id)
        // Character
        // this.$store.commit('select_character', character)
        // this.$bus.$emit(
        //   'toast',
        //   `Character Created!`
        // )
        this.$emit('close')
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
