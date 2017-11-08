<template lang="pug">
  el-form.fixed-width(:model='form', :rules='rules', label-width='125px', ref='addForm')
    el-row(:gutter='10')
      el-col(:md='8')
        el-form-item(label='Номер заказа', :required='true', prop='orderNumber')
          el-input-number(v-model='form.orderNumber', :min=1, :controls='false')
      el-col(:md='16')
        el-form-item(label='Цена', prop='price')
          el-input.input-with-select(type='text', v-model='form.price', placeholder='0.00')
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
          el-input(type='text', v-model='form.expiration', prefix-icon='el-icon-date', placeholder='MM / YY')
      el-col(:md='12')      
        el-form-item(label='CVV', prop='cvv')
          el-input(type='text', v-model='form.cvv', prefix-icon='el-icon-setting', placeholder='CVV')
    el-row(:gutter='10')
      el-col(:md='12')
        el-form-item
          el-button(type='primary', @click='onSubmit') Добавить
</template>

<script>
  import { Notification } from 'element-ui'
  import AwesomeMask from 'awesome-mask'
  import submitOrder from '../util/submitForm'
  import validator from '../util/validators'
  import masks from '../util/inputMasks'
  const rules = validator()

  export default {
    directives: {
      'mask': AwesomeMask
    },
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
          orderNumber: 1,
          price: '',
          currency: 'USD',
          cardNumber: '',
          name: '',
          expiration: '',
          cvv: ''
        },
        rules,
        masks
      }
    },
    methods: {
      async onSubmit () {
        const valid = await this.$refs.addForm.validate()
        if (!valid) return false
        const response = await submitOrder('POST', this.form)
        if (response.ok) {
          Notification({
            title: 'Добавлен',
            message: `Заказ ${this.form.orderNumber} успешно добавлен`,
            type: 'success',
            offset: 100,
            position: 'bottom-left'
          })
          this.$emit('addorder', this.form)
          this.$refs.addForm.resetFields()
        } else {
          const errors = await response.json()
          let timeout = 0
          for (const err of errors) {
            setTimeout(() => {
              Notification.error({
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
