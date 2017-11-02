import Vue from 'vue'
import Router from 'vue-router'
import AddOrder from '@/components/AddOrder'
import ListOrders from '@/components/ListOrders'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: AddOrder
    },
    {
      path: '/list',
      name: 'Список заказов',
      component: ListOrders
    }
  ]
})
