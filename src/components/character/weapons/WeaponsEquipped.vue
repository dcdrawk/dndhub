<template>
  <div v-if="filteredItems">
    <weapons-list
      :items="items"
      @select="handleShowDialog($event)"
    />
  </div>
</template>

<script>
/**
 * <weapons-known></weapons-known>
 * @desc A character's known weapons
 */
import character from '../../../mixins/character'
import WeaponsDialog from './WeaponsDialog'
import WeaponsList from './WeaponsList'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'weapons-equipped',

  // Components
  components: {
    WeaponsDialog,
    WeaponsList,
    SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Data
  data () {
    return {
      endpoint: 'weapons',
      // dialogEvent: 'new-feat',
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
    addItem (item) {
      console.log('weapons known add item...')
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added the ${item.name} Weapons`)
    },

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
    // this.$bus.$on(this.dialogEvent, () => {
    //   this.selectedItem = {...this.defaultItem}
    //   this.newItem = true
    //   this.showDialog = true
    // })
  }
}
</script>

<style scoped lang="scss">
.tab-content {
  min-height: 100vh;
}
</style>
