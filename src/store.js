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
    characterId: localStorage.getItem('characterId'),
    character: undefined
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
    select_character (state, id) {
      state.characterId = id
      if (id === undefined) {
        localStorage.removeItem('characterId')
      } else {
        localStorage.setItem('characterId', id)
      }
    },

    /**
     * Update Character
     * @param {Object} state
     * @param {Object} update
     */
    update_character (state, update) {
      Vue.set(state, 'character', update)
      // localStorage.setItem('character', JSON.stringify(state.character))
    },

    /**
     * Update Character Field
     * @param {Object} state
     * @param {Object} update
     */
    update_character_field (state, update) {
      if (!state.character) return
      state.character = Object.assign({}, state.character, {[update.field]: update.value})
      // Vue.set(state.character, update.field, update.value)
      // localStorage.setItem('character', JSON.stringify(state.character))
    },

    /**
     * Customize Character
     * @param {Object} state
     * @param {Object} update
     */
    customize_character (state, update) {
      if (!state.character.custom) Vue.set(state.character, 'custom', {})
      switch (typeof update.value) {
        case 'boolean':
          Vue.set(state.character.custom, update.field, update.value)
          break
        case 'object':
          Vue.set(
            state.character.custom[update.field][update.value.index],
            update.value.prop,
            update.value.value
          )
          break
      }
      // localStorage.setItem('character', JSON.stringify(state.character))
    },

    /**
     * Customize Class
     * @param {Object} state
     * @param {Object} update
     */
    customize_class (state, update) {
      if (!state.character.classes[update.id].custom) {
        Vue.set(state.character.classes[update.id], 'custom', {})
      }
      Vue.set(
        state.character.classes[update.id].custom,
        update.field,
        update.value
      )
    }
  },

  /**
   * Actions
   */
  actions: {

  }
})
