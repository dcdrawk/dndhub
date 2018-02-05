<template>
  <v-app>
    <!-- <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app></v-toolbar> -->
    <TheNavDrawer
      :open="navDrawerOpen"
      @close="navDrawerOpen = false"
    />
    <TheToolbar
      @toggle="navDrawerOpen = !navDrawerOpen"
    />
    <v-content>
      <!-- <v-container fluid> -->
      <router-view></router-view>
      <!-- </v-container> -->
    </v-content>
    <v-footer app></v-footer>
  </v-app>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->
</template>

<script>
import TheToolbar from './components/layout/TheToolbar'
import TheNavDrawer from './components/layout/TheNavDrawer'
import firebase from './mixins/firebase'

export default {
  // Name
  name: 'dnd-hub-app',

  // Components
  components: {
    TheToolbar,
    TheNavDrawer
  },

  // Mixins
  mixins: [
    firebase
  ],

  // Data
  data () {
    return {
      navDrawerOpen: false
    }
  }
}
</script>
