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
    characterId: localStorage.getItem('characterId')
      ? JSON.parse(localStorage.getItem('characterId'))
      : undefined,
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
        localStorage.setItem('characterId', JSON.stringify(id))
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
     * Customize Character
     * @param {Object} state
     * @param {Object} update
     */
    customize_character (state, update) {
      if (!state.character.custom) Vue.set(state.character, 'custom', {})
      // console.log(update.value.prop)
      switch (update.value) {
        case (typeof update.value === 'boolean'):
          Vue.set(state.character.custom, update.field, update.value)
          break
        case (typeof update.value === 'object'):
          Vue.set(
            state.character.custom[update.field][update.value.index],
            update.value.prop,
            update.value.value
          )
      }
      console.log(update.value.prop)
      console.log(update.value.index)
      console.log(update.value.value)
      console.log(state.character.custom[update.field][update.value.index])
      // if (typeof update === 'boolean') {
      //   Vue.set(state.character.custom, update.field, update.value)
      // }
      localStorage.setItem('character', JSON.stringify(state.character))
    }

    // customize_deep ()
  },

  /**
   * Actions
   */
  actions: {

  }
})
