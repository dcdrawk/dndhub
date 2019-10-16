<template>
  <div v-if="filteredItems">
    <spells-list-virtual
      :items="items"
      @select="handleShowDialog($event)"
    />
  </div>
</template>

<script>
/**
 * <spells-known></spells-known>
 * @desc A character's known spells
 */
import character from '../../../mixins/character'
// import SpellsDialog from './SpellsDialog'
import SpellsListVirtual from './SpellsListVirtual'
// import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'spells-equipped',

  // Components
  components: {
    // SpellsDialog,
    SpellsListVirtual
    // SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      endpoint: 'spells',
      dialogEvent: 'new-spell',
      // tableHeaders: [
      //   {
      //     text: 'Name',
      //     align: 'left',
      //     sortable: false,
      //     value: 'name'
      //   },
      //   { text: 'AC', value: 'ac' }
      // ],
      // defaultItem: {
      //   name: '',
      //   description: ''
      // },
      // search: undefined,
      newItem: false,
      items: undefined
      // selectedItem: undefined,
      // showDialog: false
    }
  },

  // Computed
  computed: {
    filteredItems () {
      if (!this.items) return
      const array = this.items.filter((item) => {
        return this.search
          ? item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          : true
      }).sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
      return array
    }
  },

  // Methods
  methods: {
    /**
     * Get Items
     * retrieve the list of items
     */
    getItems () {
      this.$db.ref(
        `${this.endpoint}/${this.characterId}`
      ).on('value', (snapshot) => {
        const value = snapshot.val()

        const items = Object.values(value || [])
          .map((item, index) => {
            item.id = Object.keys(snapshot.val())[index]
            return item
          })
        this.items = items
      })
    },

    /**
     * Adds the item to firebase
     * @param {Object} - item
     */
    // addItem (item) {
    //   console.log('spells known add item...')
    //   this.$db.ref(`${this.endpoint}/${this.characterId}`)
    //     .push(item)
    //   this.$bus.$emit('toast', `Added the ${item.name} Spells`)
    // },

    /**
     * Adds the item from the dialog
     * @param {Object} - item
     */
    handleAddItem (item) {
      console.log('known add item')
      this.addItem(item)
      this.showDialog = false
    }

    /**
     * Handle Show Dialog
     * Select the feature and show the dialog
     * @param {Object} feature
     */
    // handleShowDialog (feature) {
    //   console.log('show!s')
    //   if (this.showDialog) {
    //     // this.showDialog = false
    //   } else {
    //     this.showDialog = true
    //     this.selectedItem = feature
    //     this.newItem = false
    //   }
    //   // this.$nextTick(() => {
    //   // })
    // }
  },

  // Created
  created () {
    this.getItems()
    // // Listen for events from the parent component
    this.$bus.$on(this.dialogEvent, () => {
      this.selectedItem = { ...this.defaultItem }
      this.newItem = true
      this.showDialog = true
    })
  }
}
</script>

<style scoped lang="scss">
.tab-content {
  min-height: 100vh;
}
</style>
