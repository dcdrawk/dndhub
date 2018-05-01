<template>
  <div v-if="filteredItems">

    <feats-list
      :items="items"
    />

  </div>
</template>

<script>
/**
 * <feats-known></feats-known>
 * @desc A character's known feats
 */
import character from '../../../mixins/character'
import FeatsList from './FeatsList'
import FeatsDialog from './FeatsDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'feats-known',

  // Components
  components: {
    FeatsList,
    FeatsDialog,
    SearchBar
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
      defaultItem: {
        name: '',
        description: ''
      },
      search: undefined,
      newItem: false,
      items: undefined,
      selectedItem: undefined,
      showDialog: false
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
    }
  },

  // Created
  created () {
    this.getItems()
    // Listen for events from the parent component
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
