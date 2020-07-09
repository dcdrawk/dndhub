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
    <v-main fluid>
      <router-view />
    </v-main>

    <!-- Toaster -->
    <the-toaster />
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
  name: 'DndHubApp',

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

<style lang="scss">
.centered-input {
  input {
    text-align: center !important;
  }
}
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(/icons/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(/icons/MaterialIcons-Regular.woff2) format('woff2'),
    url(/icons/MaterialIcons-Regular.woff) format('woff'),
    url(/icons/MaterialIcons-Regular.ttf) format('truetype');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  // display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

::scrollbar {
    -webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
    width: 12px;
}
::-webkit-scrollbar:horizontal {
    height: 12px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
    border: 2px solid #ffffff;
}
::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: red;
}
</style>
