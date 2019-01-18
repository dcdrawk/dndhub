<template>
  <v-container fluid class="spell-casting">
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

    <h2>
      Spell Slots
    </h2>
    <v-divider class="mt-1 mb-3"></v-divider>
    <v-alert
      :value="true"
      color="secondary"
      icon="help"
    >
      It appears {{ character.name }} does not have any spell slots yet. Maybe you should add some?
    </v-alert>
  </v-container>
</template>

<script>
/**
 * <spells-browse></spells-browse>
 * @desc Browse and equip spells
 */
import SpellsDialog from './SpellsDialog'
import SpellsList from './SpellsList'
import SpellsListVirtual from './SpellsListVirtual'
import SearchBar from '../../inputs/SearchBar'
import character from '../../../mixins/character'
import abilityScores from '@/mixins/abilityScores'
import proficiencyBonus from '@/mixins/proficiencyBonus'

export default {
  // Name
  name: 'spells-slots',

  // Components
  components: {
    SpellsDialog,
    SpellsList,
    SpellsListVirtual,
    SearchBar
  },

  // Mixins
  mixins: [character, abilityScores, proficiencyBonus],

  // Data
  data () {
    return {
      // endpoint: 'spells'
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
    }
  },

  mounted () {
    this.getAbilityScores()
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
