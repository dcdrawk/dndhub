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
          Create New Character
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-container class="pa-0">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Character Name"
                type="text"
                required
                v-model="character.name"
                v-validate="'required'"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
              />
            </v-flex>

            <v-flex xs6 class="pr-1">
              <v-text-field
                label="Level"
                type="number"
                required
                v-model="character.level"
                v-validate="'required'"
                data-vv-name="level"
                :error-messages="errors.collect('level')"
              />
            </v-flex>

            <v-flex xs6 class="pl-1">
              <v-text-field
                label="Experience"
                type="number"
                required
                v-model="character.experience"
                v-validate="'required'"
                data-vv-name="experience"
                :error-messages="errors.collect('experience')"
              />
            </v-flex>

            <v-flex xs12 md6>
              <custom-select
                label="Race"
                :value="character.race"
                :items="races"
                item-text="name"
                item-value="name"
                :custom="character.custom.race"
                @input="character.race = $event"
                @customize="handleCustomize('race')"
              />
            </v-flex>

            <v-flex xs12 md6>
              <custom-select
                :disabled="!character.race"
                label="Subrace"
                :value="character.subrace"
                :items="subraces"
                item-text="name"
                item-value="name"
                :custom="character.custom.subrace"
                @input="character.subrace = $event"
                @customize="handleCustomize('subrace')"
              />
            </v-flex>

            <v-flex xs12 md6>
              <custom-select
                label="Class"
                :value="character.class"
                :items="classes"
                item-text="name"
                item-value="name"
                :custom="character.custom.class"
                @input="character.class = $event"
                @customize="handleCustomize('class')"
              />
            </v-flex>

            <v-flex xs12 md6>
              <custom-select
                :disabled="!character.class"
                :label="subclassLabel || 'Subclass'"
                :value="character.subclass"
                :items="subclassOptions"
                item-text="title"
                item-value="title"
                :custom="character.custom.subclass"
                @input="character.subclass = $event"
                @customize="handleCustomize('subclass')"
              />
            </v-flex>

            <v-flex md6>
              <custom-select
                label="Alignment"
                :value="character.alignment"
                :items="alignments"
                item-text="name"
                item-value="name"
                :custom="character.custom.alignment"
                @input="character.alignment = $event"
                @customize="handleCustomize('alignment')"
              />
            </v-flex>

            <v-flex md6>
              <custom-select
                label="Background"
                :value="character.background"
                :items="backgrounds"
                item-text="name"
                item-value="name"
                :custom="character.custom.background"
                @input="character.background = $event"
                @customize="handleCustomize('background')"
              />
            </v-flex>

            <v-flex xs12>
              <v-btn
                block
                color="secondary"
                :disabled="!isFormValid"
                :loading="loading"
                @click="createCharacter()"
              >
                Create
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
import classes from '../../mixins/game-data/classes'
import races from '../../mixins/game-data/races'
import validation from '../../mixins/validation'
import CustomSelect from '../inputs/CustomSelect'

export default {
  // Name
  name: 'new-character',

  // Components
  components: {
    CustomSelect
  },

  // Mixins
  mixins: [
    classes,
    races,
    validation
  ],

  // Props
  props: {
    showDialog: Boolean
  },

  // Data
  data () {
    return {
      character: {
        name: undefined,
        experience: 0,
        level: 1,
        race: undefined,
        subrace: undefined,
        alignment: undefined,
        background: undefined,
        class: undefined,
        subclass: undefined,
        custom: {
          init: true,
          multiclass: [{
            init: true
          }]
        }
      },
      loading: false
    }
  },

  // Computed
  computed: {
    alignments () {
      return this.$store.state.gameData.alignments
    },

    backgrounds () {
      return this.$store.state.gameData.backgrounds
    },

    isFormValid () {
      return Object.keys(this.fields).every(
        key => this.fields[key].valid
      )
    },

    user () {
      return this.$store.state.user
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
    /**
     * Handle the customize event
     */
    handleCustomize (field) {
      this.$set(
        this.character.custom,
        field,
        !this.character.custom[field]
      )
    },

    /**
     * Create Character
     */
    async createCharacter () {
      try {
        await this.validate()
        this.loading = true
        // Clean up any undefined variables
        for (var i in this.character) {
          if (this.character[i] === undefined) delete this.character[i]
        }
        const characterRef = await this.$db
          .ref(`characters/${this.user.uid}`)
          .push(this.character)
          .once('value')
        const key = characterRef.key
        const character = characterRef.val()
        character.id = key
        this.$store.commit('select_character', character)
        this.$bus.$emit(
          'toast',
          `Character Created!`
        )
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
