<template lang="pug">
  el-container(direction='vertical')
    list-element(v-for='order in visibleOrdersList', :key='order.order_number', :order='order', :availableCurrencies='currencies', v-on:delete='deleteOrder(order.order_number)')
    el-row(:gutter='10')
      el-col(:md='{span: 6, offset: 7}')
        el-pagination(v-if='orders.length > ordersOnPage', layout='prev, pager, next', :total='orders.length', :page-size='ordersOnPage', :current-page.sync='currentPage')
</template>

<script>
  import ListElement from './ListElement.vue'
  import submitOrder from '../util/submitForm'

  export default {
    components: {ListElement},
    name: 'ListOrder',
    beforeMount () {
      this.getOrdersList()
    },
    props: {
      currencies: {
        default: []
      },
      orders: {
        default: []
      }
    },
    data () {
      return {
        localList: [],
        ordersOnPage: 15,
        currentPage: 1,
        displayPagination: false
      }
    },
    asyncComputed: {
      ordersList: {
        async get () {
          const response = await fetch('http://localhost/order', {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })
          if (response.ok) return response.json()
          this.$notify.error({
            title: 'Ошибка',
            message: 'Не удалось получить список заказов',
            offset: 100,
            position: 'bottom-left'
          })
        },
        default: []
      },
      visibleOrdersList: {
        async get () {
          return this.localList.slice((this.currentPage - 1) * this.ordersOnPage, this.currentPage * this.ordersOnPage)
        },
        default: []
      },
      availableCurrencies: {
        async get () {
          const response = await fetch('http://localhost/currencies', {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })
          if (response.ok) return response.json()
          this.$notify.error({
            title: 'Ошибка',
            message: 'Не удалось получить список валют',
            offset: 100,
            position: 'bottom-left'
          })
        },
        default: []
      }
    },
    methods: {
      async deleteOrder (number) {
        const response = await submitOrder('DELETE', {orderNumber: number})
        if (response.ok) {
          const indexToDel = this.localList.findIndex(order => order.order_number === number)
          this.localList.splice(indexToDel, 1)
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
      },
      async getOrdersList () {
        const response = await fetch('http://localhost/order', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        if (response.ok) {
          this.localList = await response.json()
        } else {
          this.$notify.error({
            title: 'Ошибка',
            message: 'Не удалось получить список заказов',
            offset: 100,
            position: 'bottom-left'
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  h1, h2
    font-weight normal
  ul
    list-style-type none
    padding 0
  li
    display inline-block
    margin 0 10px
  a
    color #42b983
</style>
