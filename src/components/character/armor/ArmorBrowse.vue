<template>
  <div>

    <armor-table
      browse
      :items="items"
    />

    <armor-dialog
      :show-dialog="showDialog"
      :item="selectedItem"
      :browse="true"
      @add-item="handleAddItem()"
      @close="showDialog = false"
    />
  </div>
</template>

<script>
/**
 * <armor-browse></armor-browse>
 * @desc Browse and equip armor
 */
import character from '../../../mixins/character'
import ArmorDialog from './ArmorDialog'
import ArmorTable from './ArmorTable'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'armor-browse',

  // Components
  components: {
    ArmorDialog,
    ArmorTable,
    SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      endpoint: 'armor',
      dialogEvent: 'new-feat',
      search: undefined,
      tableHeaders: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'AC', value: 'ac' }
      ],
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
      return this.$store.state.gameData.armor.map((item) => {
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
      this.$bus.$emit('toast', `Added the ${item.name} Armor`)
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
