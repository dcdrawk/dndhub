<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row>
      <v-flex xs4>
        <v-select
          label="Class"
          :items="classes"
          item-text="name"
          item-value="name"
          dense
          hide-details
          clearable
          :value="filter.class"
          @input="$emit('filter-class', $event)"
        ></v-select>
      </v-flex>

      <v-flex xs4>
        <v-select
          label="Level"
          :items="spellLevels"
          dense
          hide-details
          clearable
          @input="$emit('filter-level', $event)"
        ></v-select>
      </v-flex>

      <v-flex xs4>
        <v-select
          label="School"
          :items="spellSchools"
          dense
          hide-details
          clearable
          @input="$emit('filter-school', $event)"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import
export default {
  // Name
  name: 'SpellFilters',

  // Props
  props: {
    filter: {
      type: Object,
      default: () => {}
    }
  },

  // Data
  data () {
    return {
      spellLevels: [
        'Cantrip',
        '1st-level',
        '2nd-level',
        '3rd-level',
        '4th-level',
        '5th-level',
        '6th-level',
        '7th-level',
        '8th-level',
        '9th-level'
      ],

      spellSchools: [
        'Conjuration',
        'Divination',
        'Abjuration',
        'Necromancy',
        'Evocation',
        'Transmutation',
        'Enchantment',
        'Illusion'
      ]
    }
  },

  // Computed
  computed: {
    classes () {
      return this.$store.state.gameData.classes
    }
  }
}
</script>

<style scoped lang="scss">
</style>
