<template>
  <div>
    <feats-list
      browse
      :items="items"
    />
  </div>
</template>

<script>
/**
 * <class-features></class-features>
 * @desc A character's class features
 */
import character from '../../../mixins/character'
// import FeatsDialog from './FeatsDialog'
import FeatsList from './FeatsList'
// import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'feats-browse',

  // Components
  components: {
    // FeatsDialog,
    FeatsList
    // SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      endpoint: 'feats',
      dialogEvent: 'new-feat',
      search: undefined,
      defaultItem: {
        name: '',
        description: ''
      },
      selectedItem: undefined,
      showDialog: false
    }
  },

  // Computed
  computed: {
    items () {
      return this.$store.state.gameData.feats.map((item) => {
        return item
      })
    },
    filteredItems () {
      const array = this.items
      return array.filter((item) => {
        return this.search
          ? item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          : true
      }).sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    }
  },

  // Methods
  methods: {
    /**
     * Push the item to firebase
     * @param {Object} - item
     */
    addItem (item) {
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added the ${item.name} Feat`)
    },

    /**
     * Handing adding the item
     */
    handleAddItem () {
      this.addItem(this.selectedItem)
      this.showDialog = false
    },

    /**
     * Handle Show Dialog
     * Select the item, and show the dialog
     * @param {Object} - item
     */
    handleShowDialog (item) {
      this.selectedItem = item
      this.showDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
