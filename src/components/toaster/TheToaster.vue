<template>
  <v-snackbar
    :timeout="3000"
    :bottom="true"
    v-model="show"
  >
    {{ text }}
    <v-btn
      flat
      small
      color="blue"
      @click.native="closeToast()"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  // Name
  name: 'the-toaster',

  // Data
  data () {
    return {
      show: false,
      text: undefined,
      processingQueue: false,
      queue: [],
      duration: 3000,
      processTimeout: undefined,
      queueTimeout: undefined
    }
  },

  // Mounted
  mounted () {
    this.$bus.$on('toast', (text) => {
      this.queueToast(text)
    })
  },

  // Methods
  methods: {
    /**
     * Queue Toast
     * @param {String} - text
     * Adds a toast to the queue
     * Process the queue if not already doing so
     */
    queueToast (text) {
      let toast = {
        text
      }
      this.queue.push(Object.assign({}, toast))
      if (this.processingQueue === false) {
        this.processQueue() // Process the queue if it's not doing so already
      }
    },

    /**
     * Process Queue
     * Grab the first toast in the queue
     */
    processQueue () {
      this.processingQueue = true
      this.show = true
      this.text = this.queue[0].text
      this.processTimeout = setTimeout(() => {
        this.show = false
        this.queue.shift()
        this.checkQueue()
      }, this.duration)
    },

    checkQueue () {
      if (this.queue.length > 0) {
        this.queueTimeout = setTimeout(() => {
          this.processQueue()
        }, this.delay || 500)
      } else {
        this.processingQueue = false
      }
    },

    // Close the toast
    closeToast () {
      clearTimeout(this.processTimeout)
      clearTimeout(this.queueTimeout)
      this.show = false
      this.queue.shift()
      this.checkQueue()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
