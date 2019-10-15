import Firebase from 'firebase/app'
import 'firebase/auth'
// import Vue from 'vue'
// import Store from '../store'

export default class CharacterClass {
  constructor (options) {
    this.name = 'undefined'
    this.ref = undefined
  }

  static addClasses (characterId, classes) {
    console.log(this)
    const user = Firebase.auth().currentUser
    // const characterId = Store.state.character.id
    classes.forEach((classObj) => {
      for (let i in classObj) {
        if (classObj[i] === undefined) delete classObj[i]
      }
      Firebase.database()
        .ref(`characters/${user.uid}/${characterId}/classes`)
        .push(classObj)
    })
  }

  // static getClassFeatures (class) {

  // }
}
