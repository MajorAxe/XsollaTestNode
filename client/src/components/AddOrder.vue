<template lang="pug">
  el-form.fixed-width(ref='form', :model='form', :rules='rules', label-width='125px')
    el-row(:gutter='10')
      el-col(:md='8')
        el-form-item(label='Номер заказа', :required='true', prop='orderNumber')
          el-input-number(v-model='form.orderNumber', :min=1, :controls='false')
      el-col(:md='16')
        el-form-item(label='Цена', prop='price')
          el-input.input-with-select(type='text', v-model='form.price')
            el-select(v-model='form.currency', slot='append')
              el-option(v-for='curr in currencies', :key='curr', :value='curr')
    el-row(:gutter='10')
      el-col(:md='24')
        el-form-item(label='Номер карты', prop='cardNumber')
          el-input(type='text', v-model='form.cardNumber', prefix-icon='el-icon-tickets')
    el-row(:gutter='10')
      el-col(:md='24')
        el-form-item(label='Имя владельца', prop='name')
          el-input(type='text', v-model='form.name', prefix-icon='el-icon-view')
    el-row(:gutter='10')
      el-col(:md='12')
        el-form-item(label='Expiration date', prop='expiration')
          el-input(type='text', v-model='form.expiration', prefix-icon='el-icon-date')
      el-col(:md='12')      
        el-form-item(label='CVV', prop='cvv')
          el-input(type='text', v-model='form.cvv', prefix-icon='el-icon-setting')
    el-row(:gutter='10')
      el-col(:md='12')
        el-form-item
          el-button(type='primary', @click='onSubmit') Добавить
</template>

<script>
  import ElInput from '../../node_modules/element-ui/packages/input/src/input.vue'
  import submitOrder from '../util/submitForm'
  import validator from '../util/validators'
  const rules = validator()

  export default {
    components: {ElInput},
    name: 'AddOrder',
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
        form: {
          orderNumber: 0,
          price: '0.00',
          currency: 'USD',
          cardNumber: '',
          name: '',
          expiration: '',
          cvv: ''
        },
        rules: rules
      }
    },
    methods: {
      async onSubmit () {
        const response = await submitOrder('POST', this.form)
        if (response.ok) {
          this.$notify({
            title: 'Добавлен',
            message: `Заказ ${this.form.orderNumber} успешно добавлен`,
            type: 'success',
            offset: 100,
            position: 'bottom-left'
          })
          this.resetForm()
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
      resetForm () {
        this.form.orderNumber = ''
        this.form.price = 0.00
        this.form.currency = 'USD'
        this.form.cardNumber = ''
        this.form.name = ''
        this.form.expiration = ''
        this.form.cvv = ''
      }
    }
  }
</script>

<style lang="stylus">
  .fixed-width
    max-width 500px
  .el-input-number
    width 90px
  .el-select .el-input
    width 90px
  .el-select-dropdown__item
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50    
</style>
