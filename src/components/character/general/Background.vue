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
          <v-layout
            row
            wrap
          >
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
                @input="updateCharacter('alignment', $event)"
                @customize="customizeCharacter('alignment', !character.custom.alignment)"
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
                @input="updateCharacter('background', $event)"
                @customize="customizeCharacter('background', !character.custom.background)"
              />
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="character.backgroundFeature"
                label="Background Feature"
                type="text"
                multi-line
                @input="updateCharacter('backgroundFeature', $event)"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-divider />
    <v-card flat>
      <v-card-text>
        <v-container
          grid-list-md
          class="pa-0"
        >
          <v-layout
            row
            wrap
          >
            <v-flex xs12>
              <h2>Personality Traits</h2>
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="character.personality"
                label="Personality"
                type="text"
                multi-line
                @input="updateCharacter('personality', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="character.ideals"
                label="Ideals"
                type="text"
                multi-line
                @input="updateCharacter('ideals', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="character.bonds"
                label="Bonds"
                type="text"
                multi-line
                @input="updateCharacter('bonds', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="character.flaws"
                label="Flaws"
                type="text"
                multi-line
                @input="updateCharacter('flaws', $event)"
              />
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="character.backstory"
                label="Backstory"
                type="text"
                multi-line
                @input="updateCharacter('backstory', $event)"
              />
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="character.allies"
                label="Allies & Organizations"
                type="text"
                multi-line
                @input="updateCharacter('allies', $event)"
              />
            </v-flex>
          </v-layout>
        </v-container>
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
