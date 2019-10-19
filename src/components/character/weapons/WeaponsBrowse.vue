<template>
  <div>
    <weapons-list
      browse
      :items="items"
    />
  </div>
</template>

<script>
/**
 * <weapons-browse></weapons-browse>
 * @desc Browse and equip weapons
 */
// import WeaponsDialog from './WeaponsDialog'
import WeaponsList from './WeaponsList'
// import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'WeaponsBrowse',

  // Components
  components: {
    // WeaponsDialog,
    WeaponsList
    // SearchBar
  },

  // Data
  data () {
    return {
      endpoint: 'weapons'
    }
  },

  // Computed
  computed: {
    items () {
      return this.$store.state.gameData.weapons.map((item) => {
        return item
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
