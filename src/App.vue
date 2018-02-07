<template>
  <v-app dark>
    <!-- Nav Drawer -->
    <the-nav-drawer
      :open="navDrawerOpen"
      @close="navDrawerOpen = false"
    />

    <!-- Toolbar -->
    <the-toolbar
      @toggle="navDrawerOpen = !navDrawerOpen"
    />
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- Toaster -->
    <the-toaster/>
  </v-app>
</template>

<script>
import TheToolbar from './components/layout/TheToolbar'
import TheNavDrawer from './components/layout/TheNavDrawer'
import TheToaster from './components/toaster/TheToaster'
import firebase from './mixins/firebase'
import gameData from './mixins/game-data/gameData'

export default {
  // Name
  name: 'dnd-hub-app',

  // Components
  components: {
    TheToolbar,
    TheNavDrawer,
    TheToaster
  },

  // Mixins
  mixins: [
    firebase,
    gameData
  ],

  // Data
  data () {
    return {
      navDrawerOpen: false
    }
  }
}
</script>
