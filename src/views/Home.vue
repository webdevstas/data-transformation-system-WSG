<template>
  <div class="home">
    <h1>Data Transformation System</h1>
    <form @submit.prevent="sendData">
      <label for="name">Представься друг</label>
      <input type="text" id="name" v-model="name">
      <button type="submit">Это я</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      name: '',
      content: ''
    }
  },
  methods: {
    sendData() {
      this.$axios({
        method: 'POST',
        url: 'http://localhost:3000/api/web',
        data: {
          name: this.name
        }
      }).then((res) => {
        console.log(res.data)
      })
    }
  },
  computed: {

  }
}
</script>
