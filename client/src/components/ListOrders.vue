<template lang="pug">
  el-container(direction='vertical')
    list-element(v-for='order in visibleOrdersList', :key='order.order_number', :order='order', :availableCurrencies='currencies', v-on:delete='deleteOrder(order.order_number)')
    el-row(:gutter='10')
      el-col(:md='{span: 6, offset: 7}')
        el-pagination(v-if='orders.length > ordersOnPage', layout='prev, pager, next', :total='orders.length', :page-size='ordersOnPage', :current-page.sync='currentPage')
</template>

<script>
  import ListElement from './ListElement.vue'

  export default {
    components: {ListElement},
    name: 'ListOrder',
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
        ordersOnPage: 15,
        currentPage: 1,
        displayPagination: false
      }
    },
    asyncComputed: {
      visibleOrdersList: {
        async get () {
          return this.orders.slice((this.currentPage - 1) * this.ordersOnPage, this.currentPage * this.ordersOnPage)
        },
        default: []
      }
    },
    methods: {
      deleteOrder (number) {
        this.$emit('deleteorder', number)
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
