<template>
  <div>

    <spells-list
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
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'spells-browse',

  // Components
  components: {
    SpellsDialog,
    SpellsList,
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
