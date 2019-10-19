<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
    @input="handleInput($event)"
  >
    <v-card>
      <!-- Dialog Toolbar -->
      <v-toolbar
        dark
        short
        :max-height="56"
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
          Create New Character
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <ValidationObserver
          ref="observer"
          v-slot="{ invalid }"
        >
          <v-container class="pa-0 pt-4">
            <v-layout
              row
              wrap
            >
              <v-flex xs12>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Character Name"
                  rules="required"
                >
                  <v-text-field
                    v-model="character.name"
                    label="Character Name"
                    type="text"
                    required
                    :error-messages="errors[0]"
                  />
                </ValidationProvider>
              </v-flex>

              <v-flex
                xs6
                class="pr-1"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Level"
                  rules="required"
                >
                  <v-text-field
                    v-model="character.level"
                    label="Level"
                    type="number"
                    required
                    :error-messages="errors[0]"
                  />
                </ValidationProvider>
              </v-flex>

              <v-flex
                xs6
                class="pl-1"
              >
                <v-text-field
                  v-model="character.experience"
                  label="Experience"
                  type="number"
                  required
                />
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Race"
                  rules="required"
                >
                  <custom-select
                    v-model="character.race"
                    label="Race"
                    :items="races"
                    item-text="name"
                    item-value="name"
                    :custom="character.custom.race"
                    required
                    :error-messages="errors[0]"
                    @customize="handleCustomize('race')"
                  />
                </ValidationProvider>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <custom-select
                  v-model="character.subrace"
                  :disabled="!character.race"
                  label="Subrace"
                  :items="subraces"
                  item-text="name"
                  item-value="name"
                  :custom="character.custom.subrace"
                  @customize="handleCustomize('subrace')"
                />
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Class"
                  rules="required"
                >
                  <custom-select
                    v-model="characterClasses[0].name"
                    label="Class"
                    :items="classes"
                    item-text="name"
                    item-value="name"
                    :custom="characterClasses[0].custom.name"
                    :error-messages="errors[0]"
                    @input="validateField('class')"
                    @customize="customizeClass('name')"
                  />
                </ValidationProvider>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <custom-select
                  v-model="characterClasses[0].subclass"
                  :disabled="!characterClasses[0].name"
                  :label="getSubclassLabel() || 'Subclass'"
                  :items="getSubclassOptions(characterClasses[0].name)"
                  item-text="title"
                  item-value="title"
                  :custom="characterClasses[0].custom.subclass"
                  @customize="customizeClass('subclass')"
                />
              </v-flex>

              <v-flex
                xs12
                md6
              >
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

              <v-flex
                xs12
                md6
              >
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
                  :disabled="invalid"
                  :loading="loading"
                  @click="createCharacter()"
                >
                  Create
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </ValidationObserver>
        <!-- test -->
      </v-card-text>

      <div style="flex: 1 1 auto;" />
    </v-card>
  </v-dialog>
</template>

<script>
import classes from '../../mixins/game-data/classes'
import races from '../../mixins/game-data/races'
import validation from '../../mixins/validation'
import CustomSelect from '../inputs/CustomSelect'
import CharacterCRUD from '../../models/characterCRUD'

export default {
  // Name
  name: 'NewCharacter',

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
        proficiencies: {
          armor: '',
          weapons: '',
          tools: '',
          languages: '',
          skills: '',
          other: ''
        },
        class: undefined,
        subclass: undefined,
        custom: {
          init: true
          // multiclass: [{
          //   init: true
          // }]
        }
      },
      characterClasses: [{
        name: undefined,
        subclass: undefined,
        level: undefined,
        hitDice: undefined,
        custom: {
          name: false,
          subclass: false
        }
      }],
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
      return false
      // return Object.keys(this.fields).every(
      //   key => this.fields[key].valid
      // )
    },

    user () {
      return this.$store.state.user
    }
  },

  // Methods
  methods: {
    /**
     * Handle the input validation
     */
    // handleValidation (field) {
    //   this.$nextTick(() => {
    //     this.$validator.validate(field)
    //   })
    // },

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
     * Handle the customize event
     */
    customizeClass (field) {
      this.$set(
        this.characterClasses[0].custom,
        field,
        !this.characterClasses[0].custom[field]
      )
    },

    /**
     * Create Character
     */
    async createCharacter () {
      try {
        // await this.validate()
        const isValid = await this.$refs.observer.validate()
        if (!isValid) return

        const characterValue = await CharacterCRUD.create(
          this.character, this.characterClasses
        )
        // Character.test('TEST')
        this.loading = true

        CharacterCRUD.select(characterValue.id)
        // Character
        // this.$store.commit('select_character', character)
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
