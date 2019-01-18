<template>
  <v-container fluid>
    <v-alert
      :value="true"
      color="secondary"
      icon="help"
    >
      It appears {{ character.name }} does not have any spell slots yet. Maybe you should add some?
    </v-alert>
  </v-container>
</template>

<script>
/**
 * <spells-browse></spells-browse>
 * @desc Browse and equip spells
 */
import SpellsDialog from './SpellsDialog'
import SpellsList from './SpellsList'
import SpellsListVirtual from './SpellsListVirtual'
import SearchBar from '../../inputs/SearchBar'
import character from '../../../mixins/character'

export default {
  // Name
  name: 'spells-slots',

  // Components
  components: {
    SpellsDialog,
    SpellsList,
    SpellsListVirtual,
    SearchBar
  },

  // Mixins
  mixins: [character],

  // Data
  data () {
    return {
      // endpoint: 'spells'
    }
  },

  // Computed
  computed: {
    // items () {
    //   return this.$store.state.gameData.spells.map((item) => {
    //     return item
    //   })
    // }
  }
}
</script>

<style scoped lang="scss">
</style>
