import Vue from 'vue'
import ElementUI from 'element-ui'
import AsyncComputed from 'vue-async-computed'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

Vue.use(AsyncComputed)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
