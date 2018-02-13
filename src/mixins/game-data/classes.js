// import character from '../character'

export default {
  // Mixins
  mixins: [
    // character
  ],

  // Computed
  computed: {
    classes () {
      return this.$store.state.gameData.classes
    },
    classFeatures () {
      return this.$store.state.gameData.classFeatures
    },
    subclass () {
      const className = this.character.class
      if (!className) return
      for (let i in this.classes) {
        if (className === this.classes[i].name) {
          return this.classes[i].archetypes
        }
      }
    },
    subclassOptions () {
      return this.subclass
        ? this.subclass.options
        : undefined
    },
    archetypeOptions () {
      if (!this.archetypes) return
      // if (this.character.level < this.archetypes.level) return
      return this.archetypes.options
    },
    subclassLabel () {
      if (!this.subclass) return
      // if (this.character.level < this.archetypes.level) return
      return this.subclass.name
    },
    user () {
      return this.$store.state.user
    }
  },

  // Methods
  methods: {
    // getSubclasses (className) {
    //   if (!className) return
    //   for (let i in this.classes) {
    //     if (className === this.classes[i].name) {
    //       return this.classes[i].archetypes
    //     }
    //   }
    // },

    // getArchetypeOptions (className, level) {
    //   const archetypes = this.getSubclasses(className)
    //   if (!archetypes) return
    //   return archetypes.options
    // },

    // getArchetypeLabel (className) {
    //   const archetypes = this.getSubclasses(className)
    //   if (!archetypes) return
    //   return archetypes.name
    // },

    getClass (className) {
      for (let classObj of this.classes) {
        if (classObj.name === className) return classObj
      }
    },

    // toggleMulticlass (value) {
    //   // const classList = this.character.classList || []
    //   // classList.push({})
    //   this.updateCharacter('enableMulticlass', value)
    // },

    getFeatures (className) {
      for (let features of this.classFeatures) {
        if (features.class === className) return features.abilities
      }
    },

    setFeatures (newClass, oldClass) {
      const features = {...this.character.classFeatures || {}}
      // const features = {}
      if (oldClass && features[oldClass]) {
        delete features[oldClass]
      }
      features[newClass] = this.getFeatures(newClass) || []
      this.character.update('classFeatures', features)
    },

    /**
     * Set Class
     * @desc Sets a character's class, and related fields
     * @param {String} className
     */
    setClass (className) {
      const classObj = this.getClass(className)
      if (classObj.name === this.character.class) return
      this.setFeatures(classObj.name, this.character.class)
      if (!classObj) {
        this.character.update('class', className)
        return
      }

      this.character.updateMultiple([{
        field: 'class',
        value: classObj.name
      }, {
        field: 'subclass',
        value: ''
      }, {
        field: 'proficiencies',
        value: classObj.proficiencies
      }, {
        field: 'hitDice',
        value: classObj.hitDice
      }])
    },

    setArchetype (archetype) {
      this.setFeatures(archetype)
      this.character.update('archetype', archetype)
    },

    addMulticlass () {
      console.log('add multiclass')
      console.log(`characters/${this.user.uid}/${this.character.id}/multiclass`)
      this.$db.ref(`characters/${this.user.uid}/${this.character.id}/multiclass`)
        .push({
          init: true
        })
      // const multiclassArray = this.character.multiclass || []
      // multiclassArray.push({})
      // this.updateCharacter('multiclass', multiclassArray)
    },

    updateMulticlass (index, field, value) {
    //   if (field === 'class') {
    //     console.log('test')
    //     const classObj = this.getClass(value)
    //     const multiclass = this.character.multiclass
    //     multiclass[index] = classObj
    //     this.updateCharacter('multiclass', multiclass)
    //   }
    },

    customizeMulticlass (index, prop, value) {
      // const custom = this.character.custom.multiclass
      // custom[index][field] = value
      console.log(value)
      const update = {
        field: 'multiclass',
        index: index,
        prop: prop,
        value: value
      }
      console.log(update)
      this.customizeCharacter('multiclass', update)
    },

    customizeHitDice (value) {
      this.$nextTick(() => {
        this.character.customize('hitDice', value)
        const classObj = this.getClass(this.character.class)
        this.character.update(
          'hitDice',
          classObj ? classObj.hitDice : 'd8'
        )
      })
    }
  }
}
