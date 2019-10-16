import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import colors from 'vuetify/es5/util/colors'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blueGrey.base,
        secondary: colors.blue.darken1,
        accent: colors.amber.base,
        error: colors.red.darken3,
        info: colors.cyan.accent3,
        success: colors.green.base,
        warning: colors.deepOrange.base
      }
    }
  }
}

export default new Vuetify(opts)
