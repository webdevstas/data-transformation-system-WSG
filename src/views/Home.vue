<template>
  <div class="home">
    <h1>Учёт расходов</h1>
    <div class="alert"
         v-if="alertOpened"
         :class="response.status === 'received' ? 'success' : 'danger'">
      {{ response.msg }}
    </div>
    <h2>Введи свои покупки</h2>
    <form @submit.prevent="sendData">
      <AppInputBlock v-for="n in inputsArr" :key="n" :countInp="countInp" @onData="handleInpData"/>
      <div class="btn-cnt-block">
        <span class="count">Товаров: {{ countInp + 1 }}</span>
        <div class="btn-block">
          <button @click.prevent="addNewBlock" class="btn">Добавить</button>
          <button type="submit" class="btn">Сохранить</button>
        </div>
        <span class="total">Всего: {{ totalPrice }} руб.</span>
      </div>
    </form>
  </div>
</template>

<script>
import AppInputBlock from '@/components/AppInputBlock'

export default {
  name: 'Home',
  components: {AppInputBlock},
  emits: ['inputAdded'],
  data() {
    return {
      countInp: 0,
      inputsArr: [this.countInp],
      inputsData: [],
      name: '',
      response: {},
      alertOpened: false
    }
  },
  methods: {
    sendData() {
      this.$axios({
        method: 'POST',
        url: 'http://localhost:3000/api/web',
        data: {
          goods: this.inputsData
        }
      }).then((res) => {
        this.response = res.data
        this.openAlert()
        this.countInp = 0
        this.inputsArr = [0]
        this.inputsData = []
      })
    },
    addNewBlock() {
      this.inputsArr.push(++this.countInp)
    },
    handleInpData(dataInp) {
      this.inputsData[this.countInp] = dataInp
    },
    openAlert() {
      this.alertOpened = true
      setTimeout(() => {
        this.alertOpened = false
      }, 5000)
    }
  },
  computed: {
    totalPrice() {
      const prices = this.inputsData.map(item => {
        return +item.price
      })
      return prices.reduce((total, cur) => {
        return total + cur
      }, 0)
    }
  }
}
</script>

<style lang="sass">
.alert
  margin: 20px auto
  padding: 10px
  border-radius: 0.25rem
  border: 1px solid #000
  width: max-content

.success
  color: #42b983
  border-color: #42b983

.danger
  color: red
  border-color: red

.btn
  padding: 5px
  text-transform: uppercase
.btn-cnt-block
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  width: 50%
  margin: 20px auto
</style>
