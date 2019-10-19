<template>
  <div>
    <armor-list
      browse
      :items="items"
    />
  </div>
</template>

<script>
/**
 * <armor-browse></armor-browse>
 * @desc Browse and equip armor
 */
// import ArmorDialog from './ArmorDialog'
import ArmorList from './ArmorList'
// import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'ArmorBrowse',

  // Components
  components: {
    // ArmorDialog,
    ArmorList
    // SearchBar
  },

  // Data
  data () {
    return {
      endpoint: 'armor'
    }
  },

  // Computed
  computed: {
    items () {
      return this.$store.state.gameData.armor.map((item) => {
        return item
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
