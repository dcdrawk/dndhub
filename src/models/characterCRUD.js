import Firebase from 'firebase/app'
import 'firebase/database'

// import Vue from 'vue'
import Store from '../store'
import CharacterClass from './characterClass'

import abilityScores from './stats/abilityScores'
import savingThrows from './stats/savingThrows'
import skills from './stats/skills'

const endpoints = [{
  name: 'abilityScores',
  default: abilityScores
}, {
  name: 'savingThrows',
  default: savingThrows
}, {
  name: 'skills',
  default: skills
// }, {
//   name: 'classes'
}]

export default class Character {
  constructor (options) {
    this.name = 'undefined'
    this.ref = undefined
  }

  static async create (character, classes) {
    const user = Firebase.auth().currentUser
    try {
      for (var i in character) {
        if (character[i] === undefined) delete character[i]
      }
      const url = `characters/${user.uid}`

      const snapshot = await Firebase.database()
        .ref(url)
        .push(character)
        .once('value')
      const characterId = snapshot.key
      const characterValue = snapshot.val()
      characterValue.id = characterId
      CharacterClass.addClasses(characterId, classes)
      endpoints.forEach((endpoint) => {
        if (!endpoint.default) return
        Firebase.database()
          .ref(`${endpoint.name}/${characterId}`)
          .set(endpoint.default)
      })
      return characterValue
    } catch (error) {
      console.warn(error)
    }
  }

  static async select (characterId) {
    console.log(characterId)
    try {
      Store.commit('select_character', characterId)
      const user = Firebase.auth().currentUser
      const snapshot = await Firebase.database()
        .ref(`characters/${user.uid}/${characterId}`)
        .once('value')

      Store.commit('update_character', snapshot.val())
      // endpoints.forEach(async (endpoint) => {
      //   const snapshot = await Firebase.database()
      //     .ref(`${endpoint.name}/${characterId}`)
      //     .once('value')

      //   const update = {}
      //   update.field = endpoint.name
      //   update.value = snapshot.val()

      //   Store.commit('update_character_field', update)
      // })
    } catch (error) {
      console.warn(error)
    }
  }

  static async delete (characterId) {
    const user = Firebase.auth().currentUser
    console.log(`characters/${user.uid}/${characterId}`)
    try {
      await Firebase.database()
        .ref(`characters/${user.uid}/${characterId}`)
        .remove()

      endpoints.forEach((endpoint) => {
        Firebase.database()
          .ref(`${endpoint.name}/${characterId}`)
          .remove()
      })
      this.select(undefined)
    } catch (error) {
      console.warn(error)
    }
  }

  static update (field, value) {

    // endpoints.forEach
    // const character = Store.state.character
    // .ref(`characters/${this.user.uid}/${this.character.id}/`)
    //   .update(update)
    // console.log(character)
  }
}
