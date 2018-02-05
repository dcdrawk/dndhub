import Axios from 'axios'

/**
 * @mixin gameData
 * Grab all the required dnd data
 */
export default {
  // Data
  data () {
    return {
      files: [
        'races',
        'classes',
        'alignments',
        'backgrounds',
        'classFeatures'
      ],
      // Update the version number if data json is updated.
      // So we can store the json in LocalStorage
      versions: {
        races: 1,
        classes: 1,
        alignments: 1,
        backgrounds: 1,
        classFeatures: 1

      }
    }
  },

  // Created
  created () {
    this.getGameData()
  },

  // Methods
  methods: {
    /**
     * Get Game Data
     * @desc Loop through this.files and retrieve
     * game data json data from '/static/data'
     */
    async getGameData () {
      try {
        return Promise.all(this.files.map((file) => {
          // If the file is already in local storage
          if (localStorage.getItem(file) &&
          localStorage.getItem(`${file}-ver`) === this.versions[file]) {
            // Update store with Localstorage data
            const data = JSON.parse(localStorage.getItem(file))
            this.$store.commit('update_game_data', {
              field: file,
              data: data
            })
          } else {
            // Fetch JSON from '/public/dnd-game-data/' using Axios
            return Axios.get(`/dnd-game-data/${file}.json`).then((response) => {
              const data = response.data[file]
              // console.log(response, data)
              this.$store.commit('update_game_data', {
                field: file,
                data: data
              })
              // Store in localStorage
              localStorage.setItem(file, JSON.stringify(data))
              localStorage.setItem(`${file}-ver`, this.versions[file])
            })
          }
        }))
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
