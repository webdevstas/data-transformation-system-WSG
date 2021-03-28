<template>
  <div class="input-block">
    <label for="name">Наименование:</label><input type="text" id="name" v-model="name">
    <label for="price">Цена:</label><input type="number" id="price" v-model="price">
  </div>
</template>

<script>
export default {
  emits: ['onData'],
  props: ['countInp'],
  data() {
    return {
      name: '',
      price: 0
    }
  },
  computed: {
    dataObj() {
      return {name: this.name, price: this.price}
    }
  },
  methods: {

  },
  watch: {
    dataObj: function (obj) {
      this.$emit('onData', obj)
    }
  }
}
</script>

<style lang="sass">
.input-block
  border-radius: 0.25rem
  border: #2c3e50 1px solid
  padding: 10px
  width: 50%
  margin: 20px auto
  display: flex
  flex-direction: row
  justify-content: space-around
  align-items: center

  & input
    padding: 5px
    border: 1px solid #42b983
    border-radius: 0.25rem
    width: 30%
</style>
