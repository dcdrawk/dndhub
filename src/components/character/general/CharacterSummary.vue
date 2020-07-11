<template>
  <div>
    <v-card
      flat
      class="mb-1"
    >
      <v-card-text>
        <v-row
          wrap
        >
          <v-col cols="12">
            <!-- Character Name -->
            <ValidationProvider
              v-slot="{ errors }"
              name="Character Name"
              rules="required"
            >
              <v-text-field
                label="Character Name"
                type="text"
                required
                color="secondary"
                filled
                :value="character.name"
                :error-messages="errors[0]"
                hide-details="auto"
                @input="updateCharacter('name', $event)"
              />
            </ValidationProvider>
          </v-col>

          <!-- Character Level -->
          <v-col
            cols="6"
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="Level"
              rules="required"
            >
              <v-text-field
                label="Level"
                type="number"
                required
                color="secondary"
                filled
                :value="character.level"
                :error-messages="errors[0]"
                hide-details="auto"
                @input="updateCharacter('level', $event)"
              />
            </ValidationProvider>
          </v-col>

          <!-- Character Experience -->
          <v-col
            cols="6"
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="Experience"
              rules="required"
            >
              <v-text-field
                label="Experience"
                type="number"
                required
                filled
                color="secondary"
                :value="character.experience"
                :error-messages="errors[0]"
                hide-details="auto"
                @input="updateCharacter('experience', $event)"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-divider />

    <v-card flat>
      <v-card-text>
        <div class="text-h6">
          Appearance
        </div>
        <!-- Appearance Container -->
        <v-row
          wrap
        >
          <!-- Gender -->
          <v-col cols="6">
            <v-text-field
              label="Gender"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              :value="character.gender"
              @input="updateCharacter('gender', $event)"
            />
          </v-col>

          <!-- Size -->
          <v-col cols="6">
            <v-text-field
              label="Size"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              :value="character.size"
              @input="updateCharacter('size', $event)"
            />
          </v-col>

          <!-- Age -->
          <v-col cols="6">
            <v-text-field
              label="Age"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              :value="character.age"
              @input="updateCharacter('age', $event)"
            />
          </v-col>

          <!-- Height -->
          <v-col cols="6">
            <v-text-field
              label="Height"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              :value="character.height"
              @input="updateCharacter('height', $event)"
            />
          </v-col>

          <!-- Weight -->
          <v-col cols="6">
            <v-text-field
              label="Weight"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              :value="character.weight"
              @input="updateCharacter('weight', $event)"
            />
          </v-col>

          <!-- Eyes -->
          <v-col cols="6">
            <v-text-field
              label="Eyes"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              :value="character.eyes"
              @input="updateCharacter('eyes', $event)"
            />
          </v-col>

          <!-- Skin -->
          <v-col cols="6">
            <v-text-field
              label="Skin Color"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              :value="character.skin"
              @input="updateCharacter('skin', $event)"
            />
          </v-col>

          <!-- Hair -->
          <v-col cols="6">
            <v-text-field
              label="Hair"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              :value="character.hair"
              @input="updateCharacter('hair', $event)"
            />
          </v-col>

          <!-- Description -->
          <v-col cols="12">
            <v-textarea
              v-model="character.description"
              label="Description"
              type="text"
              color="secondary"
              filled
              hide-details="auto"
              multi-line
              @input="updateCharacter('description', $event)"
            />
          </v-col>
        </v-row>
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
// import CustomSelect from '../../inputs/CustomSelect'

export default {
  // Name
  name: 'CharacterSummary',

  // Components
  components: {
    // CustomSelect
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
