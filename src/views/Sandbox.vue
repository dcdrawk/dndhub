<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          filled
          label="Select a favorite activity or create a new one"
          multiple
        />
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="I use chips"
          multiple
          chips
        />
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="I use a scoped slot"
          multiple
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
              />
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          label="I'm readonly"
          chips
          multiple
          readonly
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // Name
  name: 'Sandbox',

  // Components
  components: {},

  // Mixins
  mixins: {},

  // Props
  props: {},

  // Data
  data () {
    return {
      select: ['Vuetify', 'Programming'],
      items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify'
      ]
    }
  },

  // Computed
  computed: {
    computedProperty () {
      return 'something'
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
    myFunction () {
      return 'something'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
