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
      @input="updateCharacter('spellModifier', $event)"
    />

    <v-text-field
      class="mb-3"
      label="Spell Attack"
      type="text"
      readonly
      disabled
      :value="spellAttackText"
      hint="Proficiency Bonus + Spell Modifier"
      persistent-hint
      @input="updateCharacter('spellSave', $event)"
    />

    <v-text-field
      label="Spell Save"
      type="number"
      :value="character.spellSave"
      @input="updateCharacter('spellSave', $event)"
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

    spellAttack () {
      return this.getAbilityModifier(this.spellModifier) + this.proficiencyBonus
    },

    spellAttackPrefix () {
      return this.spellAttack >= 0 ? '+' : '-'
    },

    spellAttackText () {
      return `${this.spellAttackPrefix}${this.spellAttack}`
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
