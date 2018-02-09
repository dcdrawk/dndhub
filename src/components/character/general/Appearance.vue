<template>
  <v-container grid-list-md>

    <v-layout row wrap>
      <v-flex xs6>
        <v-text-field
          label="Age"
          type="number"
          :value="character.age"
          @input="updateCharacter('age', $event)"
        />
      </v-flex>

      <v-flex xs6>
        <v-text-field
          label="Height"
          type="text"
          :value="character.height"
          @input="updateCharacter('height', $event)"
        />
      </v-flex>

      <v-flex xs6>
        <v-text-field
          label="Weight"
          type="number"
          :value="character.weight"
          @input="updateCharacter('weight', $event)"
        />
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Eyes"
          type="text"
          :value="character.eyes"
          @input="updateCharacter('eyes', $event)"
        />
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Skin"
          type="text"
          :value="character.skin"
          @input="updateCharacter('skin', $event)"
        />
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Hair"
          type="text"
          :value="character.hair"
          @input="updateCharacter('hair', $event)"
        />
      </v-flex>

      <v-flex xs12>
        <v-text-field
          label="Description"
          type="text"
          v-model="character.description"
          multi-line
          @input="updateCharacter('description', $event)"
        />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
/**
 * <apparance></apparance>
 * @desc A character's apparance
 */
import character from '../../../mixins/character'

export default {
  // Name
  name: 'apparance',

  // Mixins
  mixins: [
    character
  ]
}
</script>

<style scoped lang="scss">
</style>
