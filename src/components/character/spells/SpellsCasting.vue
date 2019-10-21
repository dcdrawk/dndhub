<template>
  <v-card flat>
    <v-card-text>
      <h2 class="mb-4">
        Spell Casting
      </h2>
      <!-- {{ }} -->
      <v-select
        class="spell-casting__modifier"
        label="Spell Modifier"
        :value="character.spellModifier"
        :items="SpellModifierOptions"
        item-text="text"
        item-value="value"
        color="secondary"
        @input="updateCharacter('spellModifier', $event)"
      />

      <v-text-field
        class="mb-3"
        label="Spell Attack"
        type="text"
        readonly
        disabled
        :value="spellAttackText"
        hint="Spell Modifier + Proficiency Bonus"
        persistent-hint
      />

      <v-text-field
        class="mb-5"
        label="Spell Save"
        type="text"
        readonly
        disabled
        :value="spellSaveText"
        hint="8 + Spell Modifier + Proficiency Bonus"
        persistent-hint
      />
    </v-card-text>
    <v-divider />
    <v-card-text>
      <!-- <v-layout row> -->
      <!-- <v-flex xs12> -->
      <h2 class="mb-4">
        Spell Slots
        <v-btn
          class="ma-0"
          fab
          text
          small
          @click="showSlotDialog = true"
        >
          <v-icon>
            edit
          </v-icon>
        </v-btn>
      </h2>
      <!-- </v-flex>
      </v-layout> -->

      <SpellsSlotsDialog
        :show-dialog="showSlotDialog"
        @close="showSlotDialog = false"
      />
      <!-- <v-divider class="mt-1 mb-3" /> -->
      <v-alert
        v-if="!characterHasSpellSlots"
        :value="true"
        color="accent"
        icon="help"
      >
        It appears {{ character.name }} does not have any spell slots yet.
      </v-alert>

      <div
        v-for="(slot, key, index) in characterSpellSlots"
        :key="index"
      >
        <div v-if="slot && slot.length">
          <h3>Level {{ key }}</h3>
          <div d-flex>
            <v-checkbox
              v-for="(item, itemIndex) in slot"
              :key="itemIndex"
              class="d-inline-block mr-2"
              :input-value="item"
              :true-value="'1'"
              :false-value="'0'"
              color="secondary"
              @change="handleUpdateSpellSlot(key, itemIndex, $event)"
            />
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * <spells-browse></spells-browse>
 * @desc Browse and equip spells
 */
import SpellsSlotsDialog from './SpellsSlotsDialog'
// import SpellsList from './SpellsList'
// import SpellsListVirtual from './SpellsListVirtual'
// import SearchBar from '../../inputs/SearchBar'
import character from '../../../mixins/character'
import abilityScores from '@/mixins/abilityScores'
import proficiencyBonus from '@/mixins/proficiencyBonus'

export default {
  // Name
  name: 'SpellsSlots',

  // Components
  components: {
    SpellsSlotsDialog
    // SpellsList,
    // SpellsListVirtual,
    // SearchBar
  },

  // Mixins
  mixins: [character, abilityScores, proficiencyBonus],

  // Data
  data () {
    return {
      showSlotDialog: false
    }
  },

  // Computed
  computed: {
    abilityScoresCapitalized () {
      return this.abilityScores.map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1)
      })
    },

    SpellModifierOptions () {
      return this.abilityScoresCapitalized.map((item) => {
        return {
          text: `${item} (+${this.getAbilityModifier(item.toLowerCase())})`,
          value: item.toLowerCase()
        }
      })
    },

    spellModifier () {
      if (!this.character) return
      return this.character.spellModifier
    },

    spellAbilityModifier () {
      if (!this.character) return
      return this.getAbilityModifier(this.spellModifier)
    },

    spellAttack () {
      return this.spellAbilityModifier + this.proficiencyBonus
    },

    spellSave () {
      return 8 + this.spellAbilityModifier + this.proficiencyBonus
    },

    spellAttackPrefix () {
      return this.spellAttack >= 0 ? '+' : '-'
    },

    spellSavePrefix () {
      return this.spellAttack >= 0 ? '+' : '-'
    },

    spellAttackText () {
      return `${this.spellAttackPrefix}${this.spellAttack}`
    },

    spellSaveText () {
      return `${this.spellSavePrefix}${this.spellSave}`
    },

    characterSpellSlots () {
      if (!this.character) return
      return this.character.spellSlots
    },

    characterHasSpellSlots () {
      if (!this.characterSpellSlots) return
      for (let i in this.characterSpellSlots) {
        if (this.characterSpellSlots[i].length) return true
      }
      return undefined
    }
  },

  mounted () {
    this.getAbilityScores()
  },

  methods: {
    handleUpdateSpellSlot (level, index, value) {
      const slots = { ...this.characterSpellSlots }
      slots[level][index] = value
      this.updateCharacter('spellSlots', slots)
    }
  }
}
</script>

<style scoped lang="scss">
.spell-casting {
  &__modifier {
    text-transform: capitalize;
  }
}
</style>
