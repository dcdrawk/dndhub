<template>
  <div v-if="items">
    <quests-list
      :items="items"
      :active="active"
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
import QuestsList from './QuestsList'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'quests-browse',

  // Components
  components: {
    QuestsList,
    SearchBar
  },

  // Mixins
  mixins: [
    character
  ],

  // Props
  props: {
    active: Boolean
  },

  // Data
  data () {
    return {
      endpoint: 'quests',
      newItem: false,
      items: undefined
    }
  },

  // Computed
  computed: {
    // filteredItems () {
    //   if (!this.items) return
    //   const array = this.items.filter((item) => {
    //     return true
    //     // console.log(item.completed !== true)
    //     // return item.completed !== true
    //   }).filter((item) => {
    //     return this.search
    //       ? item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
    //       : true
    //   }).sort((a, b) => {
    //     if (a.name < b.name) return -1
    //     if (a.name > b.name) return 1
    //     return 0
    //   })
    //   return array
    // }
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
      console.log(`${this.endpoint}/${this.characterId}`)
      this.$db.ref(`${this.endpoint}/${this.characterId}`)
        .push(item)
      this.$bus.$emit('toast', `New Quest: ${item.name}`)
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
  },

  // Created
  created () {
    this.getItems()
  }
}
</script>

<style scoped lang="scss">
.tab-content {
  min-height: 100vh;
}
</style>
