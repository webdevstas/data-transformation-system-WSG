import axios from 'axios'

export default {
  install: (app) => {
    app.mixin({
      created () {
        this.$axios = axios
      }
    })
  }
}
