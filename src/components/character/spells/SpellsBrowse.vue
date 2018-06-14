<template>
  <div>

    <spells-list-virtual
      browse
      :items="items"
    />

  </div>
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

export default {
  // Name
  name: 'spells-browse',

  // Components
  components: {
    SpellsDialog,
    SpellsList,
    SpellsListVirtual,
    SearchBar
  },

  // Data
  data () {
    return {
      endpoint: 'spells'
    }
  },

  // Computed
  computed: {
    items () {
      return this.$store.state.gameData.spells.map((item) => {
        return item
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
