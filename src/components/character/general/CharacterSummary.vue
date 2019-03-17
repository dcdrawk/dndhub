<template>
  <div>
    <v-card flat class="mb-1">
      <v-card-text>
        <v-container grid-list-md class="pa-0">
          <v-layout row wrap>
            <v-flex xs12>
              <!-- Character Name -->
              <v-text-field
                label="Character Name"
                type="text"
                required
                :value="character.name"
                v-validate="'required'"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
                @input="updateCharacter('name', $event)"
              />
            </v-flex>

            <!-- Character Level -->
            <v-flex xs6 class="pr-1">
              <v-text-field
                label="Level"
                type="number"
                required
                :value="character.level"
                v-validate="'required'"
                data-vv-name="level"
                :error-messages="errors.collect('level')"
                @input="updateCharacter('level', $event)"
              />
            </v-flex>

            <!-- Character Experience -->
            <v-flex xs6 class="pl-2">
              <v-text-field
                label="Experience"
                type="number"
                required
                :value="character.experience"
                v-validate="'required'"
                data-vv-name="experience"
                :error-messages="errors.collect('experience')"
                @input="updateCharacter('experience', $event)"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-divider/>

    <v-card flat>
      <v-card-text>
        <!-- Appearance Container -->
        <v-container grid-list-md class="pa-0">
          <v-layout row wrap>

            <!-- Heading -->
            <v-flex xs12>
              <h3>Appearance</h3>
            </v-flex>

            <!-- Gender -->
            <v-flex xs6>
              <v-text-field
                label="Gender"
                type="number"
                :value="character.gender"
                @input="updateCharacter('gender', $event)"
              />
            </v-flex>

            <!-- Size -->
            <v-flex xs6>
              <v-text-field
                label="Size"
                type="number"
                :value="character.size"
                @input="updateCharacter('size', $event)"
              />
            </v-flex>

            <!-- Age -->
            <v-flex xs6>
              <v-text-field
                label="Age"
                type="number"
                :value="character.age"
                @input="updateCharacter('age', $event)"
              />
            </v-flex>

            <!-- Height -->
            <v-flex xs6>
              <v-text-field
                label="Height"
                type="text"
                :value="character.height"
                @input="updateCharacter('height', $event)"
              />
            </v-flex>

            <!-- Weight -->
            <v-flex xs6>
              <v-text-field
                label="Weight"
                type="number"
                :value="character.weight"
                @input="updateCharacter('weight', $event)"
              />
            </v-flex>

            <!-- Eyes -->
            <v-flex xs6>
              <v-text-field
                label="Eyes"
                type="text"
                :value="character.eyes"
                @input="updateCharacter('eyes', $event)"
              />
            </v-flex>

            <!-- Skin -->
            <v-flex xs6>
              <v-text-field
                label="Skin Color"
                type="text"
                :value="character.skin"
                @input="updateCharacter('skin', $event)"
              />
            </v-flex>

            <!-- Hair -->
            <v-flex xs6>
              <v-text-field
                label="Hair"
                type="text"
                :value="character.hair"
                @input="updateCharacter('hair', $event)"
              />
            </v-flex>

            <!-- Description -->
            <v-flex xs12>
              <v-textarea
                label="Description"
                type="text"
                v-model="character.description"
                multi-line
                @input="updateCharacter('description', $event)"
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
 * <character-summary></character-summary>
 * @desc A character's general / basic info
 */
import validation from '../../../mixins/validation'
import character from '../../../mixins/character'
import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'character-summary',

  // Components
  components: {
    CustomSelect
  },

  // Mixins
  mixins: [
    character,
    validation
  ]
}
</script>

<style scoped lang="scss">

</style>
