<template lang="pug">
  #app
    el-container
      el-aside
        sidebar
      el-main
        router-view(:orders='orders', :currencies='availableCurrencies', v-on:deleteorder='deleteOrder')
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  import submitOrder from './util/submitForm'

  export default {
    name: 'app',
    beforeMount () {
      this.getAvailableCurrencies()
      this.getOrdersList()
    },
    data () {
      return {
        availableCurrencies: [],
        orders: []
      }
    },
    components: {
      Sidebar
    },
    methods: {
      async getAvailableCurrencies () {
        const response = await fetch('/currencies', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        if (response.ok) {
          this.availableCurrencies = await response.json()
        } else {
          this.$notify.error({
            title: 'Ошибка',
            message: 'Не удалось получить список валют',
            offset: 100,
            position: 'bottom-left'
          })
        }
      },
      async getOrdersList () {
        const response = await fetch('/order', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        if (response.ok) {
          this.orders = await response.json()
        } else {
          this.$notify.error({
            title: 'Ошибка',
            message: 'Не удалось получить список заказов',
            offset: 100,
            position: 'bottom-left'
          })
        }
      },
      async deleteOrder (number) {
        const response = await submitOrder('DELETE', {orderNumber: number})
        if (response.ok) {
          const indexToDel = this.orders.findIndex(order => order.order_number === number)
          this.orders.splice(indexToDel, 1)
          this.$notify({
            title: 'Удален',
            message: `Заказ ${number} успешно удален`,
            type: 'success',
            offset: 100,
            position: 'bottom-left'
          })
        } else {
          const errors = await response.json()
          let timeout = 0
          for (const err of errors) {
            setTimeout(() => {
              this.$notify.error({
                title: 'Ошибка',
                message: err,
                offset: 100,
                position: 'bottom-left'
              })
            }, timeout)
            timeout += 200
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    margin-top 60px
</style>
