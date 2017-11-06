import Vue from 'vue'
import {
  Container,
  Aside,
  Main,
  Menu,
  MenuItem,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  Option,
  Button,
  ButtonGroup,
  Popover,
  Pagination
} from 'element-ui'
import AsyncComputed from 'vue-async-computed'
import App from './App'
import router from './router'

Vue.use(AsyncComputed)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Popover)
Vue.use(Pagination)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
