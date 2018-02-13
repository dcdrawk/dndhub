import Firebase from 'firebase'
// import Vue from 'vue'
import Store from '../store'

/**
 * Default Character
 * /characters/${userId}/${characterId}
 */
const defaultCharacter = {
  name: 'Drawkcab',
  level: 10,
  experience: 12345,
  background: 'Criminal',
  alignment: 'Chaotic Neutral',
  armorclass: 10,
  enableMulticlass: false,
  hitPointsCurrent: 50,
  hitPointsMax: 50,
  hitPointsTemp: 0,
  initiativeBonus: 0,
  inspiration: false,
  speed: '30"',
  passiveWisdom: 10
}

/**
 * Default Class
 * /classes/{characterId}/{classId}
 */
const defaultClass = {
  name: 'Rogue',
  subclass: 'Thief',
  hitDice: '1d8',
  level: 12
}

console.log(defaultCharacter, defaultClass)

export default class Character {
  constructor (options) {
    this.name = 'undefined'
  }

  static getUser () {
    const user = Firebase.auth().currentUser
    return user
  }

  static async create (character) {
    try {
      for (var i in character) {
        if (character[i] === undefined) delete character[i]
      }

      const snapshot = await Firebase.database()
        .ref(`characters/${this.getUser().uid}`)
        .push(character)
        .once('value')

      const key = snapshot.key
      const characterValue = snapshot.val()
      characterValue.id = key

      return characterValue
    } catch (error) {
      console.warn(error)
    }
  }

  static async select (characterId) {
    try {
      Store.commit('select_character', characterId)
      await Firebase.database()
        .ref(`characters/${this.getUser().uid}/${characterId}`)
        .on('value', (snapshot) => {
          // Vue.set(this)
          const character = snapshot.val()
          character.id = snapshot.key
          Store.commit('update_character', character)
        })
    } catch (error) {

    }
    // this.test = test
    // Vue.set(this, 'test', test)
    // console.dir(this)
  }
}
