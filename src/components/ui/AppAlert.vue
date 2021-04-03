<template>
  <div :class="['alert', type]" v-if="visible" @click="closeAlert">
    <h2 :class="['alert-title', type]" v-if="title">{{ title }}</h2>
    <p :class="['alert-text', type]" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['type', 'title', 'message', 'visibility'],

  emits: ['alertClosed'],

  data () {
    return {
      visible: this.visibility,
      timeout: null
    }
  },

  methods: {
    /**
     * Показывает alert, скрывает с указанной задержкой
     * @param {number} timeout
     */
    showAlert (timeout = 5000) {
      const openPromise = new Promise((resolve) => {
        this.visible = true
        resolve()
      })
      openPromise.then(() => {
        this.gsap.to('.alert', {
          y: 600,
          onComplete: () => {
            this.timeout = setTimeout(this.closeAlert, timeout)
          }
        })
      })
    },

    /**
     * Скрывает alert, чистит локальное свойство this.timeout, сообщает родительскому компоненту
     */
    closeAlert () {
      this.gsap.to('.alert', {
        y: -600,
        onComplete: () => {
          this.visible = false
          this.$emit('alertClosed')
          clearTimeout(this.timeout)
        }
      })
    }
  },

  watch: {
    visibility: function () {
      if (this.visibility) {
        this.showAlert()
      } else {
        this.closeAlert()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.alert
  position: fixed
  top: -500px
  left: 50%
  transform: translateX(-50%)
  background-color: rgba(255,255,255, 0.9)
  width: 400px
  height: auto
  padding: 10px 20px
  border-radius: 0.25rem

  &.success
    border-left: 10px solid #28a745

  &.danger
    border-left: 10px solid #a72828

  &-title
    &.success
      color: #28a745

    &.danger
      color: #a72828

  &-text
    color: #070707

</style>
