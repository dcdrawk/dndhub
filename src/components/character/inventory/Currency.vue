<template>
  <!-- <div> -->
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
          <!-- Hair -->
          <v-flex xs12>
            <v-text-field
              label="Copper"
              type="number"
              :value="character.copper"
              @input="updateCharacter('copper', $event)"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Silver"
              type="number"
              :value="character.silver"
              @input="updateCharacter('silver', $event)"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Electrum"
              type="number"
              :value="character.electrum"
              @input="updateCharacter('electrum', $event)"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Gold"
              type="number"
              :value="character.gold"
              @input="updateCharacter('gold', $event)"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Platinum"
              type="number"
              :value="character.platinum"
              @input="updateCharacter('platinum', $event)"
            />
          </v-flex>

          <!-- Description -->
          <v-flex xs12>
            <!-- <v-textarea
              label="Description"
              type="text"
              v-model="character.description"
              multi-line
              @input="updateCharacter('description', $event)"
            /> -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
  <!-- </div> -->
</template>

<script>
/**
 * <character-summary></character-summary>
 * @desc A character's general / basic info
 */
import validation from '@/mixins/validation'
import character from '@/mixins/character'
// import CustomSelect from '@/compoents/inputs/CustomSelect'

export default {
  // Name
  name: 'Currency',

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
