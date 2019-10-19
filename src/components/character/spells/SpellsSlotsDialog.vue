<template>
  <v-dialog
    :value="showDialog"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay="false"
    scrollable
    @input="handleDialog($event)"
  >
    <v-card tile>
      <!-- Dialog Toolbar -->
      <v-toolbar
        card
        dark
        color="primary"
      >
        <!-- Close Button -->
        <v-btn
          icon
          dark
          @click.native="$emit('close')"
        >
          <v-icon>close</v-icon>
        </v-btn>

        <!-- Dialog Title -->
        <v-toolbar-title>
          Edit Spell Slots
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <!-- Card Text -->
      <v-card-text>
        <v-container class="pa-0">
          <SpellsSlotInput
            v-for="(slot, index) in spellSlotFields"
            :key="index"
            :label="slot.text"
            :value="slot.value"
            @add="handleAdd(index + 1)"
            @subtract="handleSubtract(index + 1)"
          />
        </v-container>
      </v-card-text>
      <div style="flex: 1 1 auto;" />
    </v-card>
  </v-dialog>
</template>

<script>
import character from '../../../mixins/character'
import SpellsSlotInput from './SpellsSlotInput'

export default {
  // Name
  name: 'SpellsSlotsDialog',

  // Components
  components: {
    SpellsSlotInput
  },

  // Mixins
  mixins: [
    character
  ],

  // Props
  props: {
    showDialog: Boolean
  },

  // Data
  data () {
    return {
      loading: false,
      level1Slot: 0

    }
  },

  // Computed
  computed: {
    characterId () {
      return this.$store.state.characterId
    },

    characterSpellSlots () {
      if (!this.character) return
      return this.character.spellSlots
    },

    spellSlotFields () {
      if (!this.characterSpellSlots) return
      return [{
        text: 'Level 1',
        value: this.getNumberOfSpellSlots(1)
      }, {
        text: 'Level 2',
        value: this.getNumberOfSpellSlots(2)
      }, {
        text: 'Level 3',
        value: this.getNumberOfSpellSlots(3)
      }, {
        text: 'Level 4',
        value: this.getNumberOfSpellSlots(4)
      }, {
        text: 'Level 5',
        value: this.getNumberOfSpellSlots(5)
      }, {
        text: 'Level 6',
        value: this.getNumberOfSpellSlots(6)
      }, {
        text: 'Level 7',
        value: this.getNumberOfSpellSlots(7)
      }, {
        text: 'Level 8',
        value: this.getNumberOfSpellSlots(8)
      }, {
        text: 'Level 9',
        value: this.getNumberOfSpellSlots(9)
      }]
    }
  },

  // Mounted
  mounted () {
    this.initSpellSlots()
  },

  // Methods
  methods: {
    /**
     * Delete Item
     */
    getNumberOfSpellSlots (level) {
      if (!this.characterSpellSlots) return
      if (!this.characterSpellSlots[level]) return 0
      return this.characterSpellSlots[level].length
    },

    /**
     * Initialize a Character's Spell Slots if they don't have any
     */
    initSpellSlots () {
      if (!this.character) return
      if (this.character.spellSlots) return
      this.updateCharacter('spellSlots', {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: []
      })
    },

    /**
     * Handle Input
     */
    handleAdd (level) {
      const slots = { ...this.characterSpellSlots }
      if (!slots[level]) slots[level] = []
      slots[level].push('0')
      this.updateCharacter('spellSlots', slots)
    },

    /**
     * Handle Input
     */
    handleSubtract (level) {
      const slots = { ...this.characterSpellSlots }
      slots[level].pop()
      this.updateCharacter('spellSlots', slots)
    },

    /**
     * Handle Dialog
     */
    handleDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
