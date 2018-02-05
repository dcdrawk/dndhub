import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  /**
   * State
   */
  state: {
    user: undefined
  },

  /**
   * Mutations
   * methods used to update the state
   */
  mutations: {
    update_user (state, user) {
      state.user = user
    }
  },

  /**
   * Actions
   */
  actions: {

  }
})
