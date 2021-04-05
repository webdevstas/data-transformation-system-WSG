<template>
  <div class="home">
    <h1>Учёт расходов</h1>
    <AppAlert :type="alertType" :title="alertTitle" :visibility="alertOpened" @alertClosed="alertOpened = false"/>
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
import AppInputBlock from '@/components/ui/AppInputBlock'
import AppAlert from '@/components/ui/AppAlert'

export default {
  name: 'Home',
  components: {AppAlert, AppInputBlock},
  emits: ['inputAdded'],
  data() {
    return {
      countInp: 0,
      inputsArr: [0],
      inputsData: [],
      name: '',
      response: {},
      alertOpened: false,
      alertTitle: '',
      alertType: ''
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
        this.openAlert(this.response.msg, this.response.status === 'failed' ? 'danger' : 'success')
        this.countInp = 0
        this.inputsArr = [0]
        this.inputsData = []
      }).catch(err => {
        console.log(err)
        this.openAlert('Ошибка при отправке на сервер!', 'danger')
      })
    },
    addNewBlock() {
      this.countInp++
      this.inputsArr.push(this.countInp)
    },
    handleInpData(dataInp) {
      this.inputsData[this.countInp] = dataInp
    },
    openAlert(title, type) {
      this.alertOpened = true
      this.alertTitle = title
      this.alertType = type
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
