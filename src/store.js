import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  /**
   * State
   */
  state: {
    user: undefined,
    gameData: {},
    character: localStorage.getItem('character')
      ? JSON.parse(localStorage.getItem('character'))
      : undefined
  },

  /**
   * Mutations
   * methods used to update the state
   */
  mutations: {
    /**
     * Update user
     * @param {Object} state
     * @param {Object} user
     */
    update_user (state, user) {
      state.user = user
    },

    /**
     * Update Game Data
     * @param {Object} state
     * @param {Object} update
     */
    update_game_data (state, update) {
      Vue.set(state.gameData, update.field, update.data)
    },

    /**
     * Select Character
     * @param {Object} state
     * @param {Object} character
     */
    select_character (state, character) {
      if (character === undefined) {
        localStorage.removeItem('character')
      } else {
        localStorage.setItem('character', JSON.stringify(character))
      }
      state.character = character
    }
  },

  /**
   * Actions
   */
  actions: {

  }
})
