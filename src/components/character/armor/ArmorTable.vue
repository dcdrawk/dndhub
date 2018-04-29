<template>
  <div v-if="filteredItems">
    <search-bar
      v-model="search"
    />
    <v-data-table
      :headers="tableHeaders"
      :items="items"
      :search="search"
      hide-actions
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <tr
          @click="handleShowDialog(props.item)"
        >
          <td >{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.ac }}</td>
          <td class="text-xs-right">{{ props.item.ac }}</td>
          <td class="text-xs-right">{{ props.item.ac }}</td>
        </tr>
      </template>
    </v-data-table>

    <armor-dialog
      :browse="browse"
      :show-dialog="showDialog"
      :item="selectedItem"
      :new-item="newItem"
      @add-item="handleAddItem($event)"
      @close="showDialog = false"
    />

  </div>
</template>

<script>
/**
 * <armor-known></armor-known>
 * @desc A character's known armor
 */
import ArmorDialog from './ArmorDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'armor-table',

  // Components
  components: {
    ArmorDialog,
    SearchBar
  },

  // Data
  data () {
    return {
      tableHeaders: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        { text: 'AC',
          value: 'ac',
          align: 'right'
        },
        { text: 'test',
          value: 'ac',
          align: 'right'
        },
        { text: 'test2',
          value: 'ac',
          align: 'right'
        }
      ],
      selectedItem: undefined,
      newItem: false,
      showDialog: false,
      search: undefined
    }
  },

  // Computed
  computed: {
    // items () {
    //   return this.$store.state.gameData.armor.map((item) => {
    //     return item
    //   })
    // },
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

  // Props
  props: {
    items: Array,
    browse: Boolean
  },

  // Methods
  methods: {
    /**
     * Adds the item to firebase
     * @param {Object} - item
     */
    addItem (item) {
      console.log('armor known add item...')
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `Added the ${item.name} Armor`)
    },

    /**
     * Adds the item from the dialog
     * @param {Object} - item
     */
    handleAddItem (item) {
      console.log('known add item')
      this.addItem(item)
      this.showDialog = false
    },

    /**
     * Handle Show Dialog
     * Select the feature and show the dialog
     * @param {Object} feature
     */
    handleShowDialog (feature) {
      console.log('show!s')
      if (this.showDialog) {
        // this.showDialog = false
      } else {
        this.showDialog = true
        this.selectedItem = feature
        this.newItem = false
      }
      // this.$nextTick(() => {
      // })
    }
  }

  // Created
  // created () {
  //   this.getItems()
  //   // Listen for events from the parent component
  //   this.$bus.$on(this.dialogEvent, () => {
  //     this.selectedItem = {...this.defaultItem}
  //     this.newItem = true
  //     this.showDialog = true
  //   })
  // }
}
</script>

<style scoped lang="scss">
.tab-content {
  min-height: 100vh;
}
</style>
