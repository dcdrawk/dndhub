<template>
  <div>
    <v-card
      flat
      class="mb-1"
    >
      <v-card-text>
        <v-container
          grid-list-md
          class="pa-0"
        >
          <v-row
            row
            wrap
          >
            <v-col
              cols="12"
              md="6"
            >
              <custom-select
                label="Alignment"
                :value="character.alignment"
                :items="alignments"
                item-text="name"
                item-value="name"
                :custom="character.custom.alignment"
                @input="updateCharacter('alignment', $event)"
                @customize="customizeCharacter('alignment', !character.custom.alignment)"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <custom-select
                label="Background"
                :value="character.background"
                :items="backgrounds"
                item-text="name"
                item-value="name"
                :custom="character.custom.background"
                @input="updateCharacter('background', $event)"
                @customize="customizeCharacter('background', !character.custom.background)"
              />
            </v-col>

            <v-col
              cols="12"
            >
              <v-textarea
                v-model="character.backgroundFeature"
                label="Background Feature"
                type="text"
                multi-line
                filled
                hide-details
                color="secondary"
                @input="updateCharacter('backgroundFeature', $event)"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="character.backstory"
                label="Backstory"
                type="text"
                multi-line
                filled
                hide-details
                color="secondary"
                @input="updateCharacter('backstory', $event)"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="character.allies"
                label="Allies & Organizations"
                type="text"
                multi-line
                filled
                hide-details
                color="secondary"
                @input="updateCharacter('allies', $event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-divider />

    <v-card flat>
      <v-card-text>
        <div class="text-h6">
          Personality Traits
        </div>
        <v-row
          wrap
        >
          <v-col cols="12">
            <v-textarea
              v-model="character.personality"
              label="Personality"
              type="text"
              multi-line
              filled
              hide-details
              @input="updateCharacter('personality', $event)"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="character.ideals"
              label="Ideals"
              type="text"
              multi-line
              filled
              hide-details
              @input="updateCharacter('ideals', $event)"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="character.bonds"
              label="Bonds"
              type="text"
              multi-line
              filled
              hide-details
              @input="updateCharacter('bonds', $event)"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="character.flaws"
              label="Flaws"
              type="text"
              multi-line
              filled
              hide-details
              @input="updateCharacter('flaws', $event)"
            />
          </v-col>
        </v-row>
        <!-- </v-container> -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/**
 * <background></background>
 * @desc A character's background info, alignment, and personality traits
 */
import validation from '../../../mixins/validation'
import character from '../../../mixins/character'
import CustomSelect from '../../inputs/CustomSelect'
export default {
  // Name
  name: 'Background',

  // Components
  components: {
    CustomSelect
  },

  // Mixins
  mixins: [
    character,
    validation
  ],

  // Computed
  computed: {
    alignments () {
      return this.$store.state.gameData.alignments
    },
    backgrounds () {
      return this.$store.state.gameData.backgrounds
    }
  }
}
</script>

<style scoped lang="scss">
</style>
