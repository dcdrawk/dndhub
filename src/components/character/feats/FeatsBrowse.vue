<template>
  <div>
    <search-bar
      v-model="search"
      :items="filteredItems"
    ></search-bar>

    <!-- Character List -->
    <v-list
      v-if="filteredItems.length > 0"
      two-line
      dense
      class="elevation-1"
    >
      <template v-for="(item, index) in filteredItems">
        <!-- Traits List -->
        <v-list-tile
          :key="item.title"
          @click="handleShowDialog(item)"
        >
          <!-- Content -->
          <v-list-tile-content>
            <!-- Trait Name -->
            <v-list-tile-title>
              {{ item.name }}
            </v-list-tile-title>

            <!-- Character Details -->
            <v-list-tile-sub-title>
              {{ item.description }}
            </v-list-tile-sub-title>

          </v-list-tile-content>

          <!-- Feat Add -->
          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="addItem(item)"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider
          v-if="index < filteredItems.length - 1"
          :key="`${index}-divider`"
        ></v-divider>
      </template>
    </v-list>

    <feats-dialog
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
 * <class-features></class-features>
 * @desc A character's class features
 */
import character from '../../../mixins/character'
import FeatsDialog from './FeatsDialog'
import SearchBar from '../../inputs/SearchBar'

export default {
  // Name
  name: 'feats-browse',

  // Components
  components: {
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
