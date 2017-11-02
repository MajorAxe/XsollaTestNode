<template lang="pug">
  el-form(ref='form', :model='form', label-width='120px')
    el-form-item(label='Номер заказа')
      el-input-number(v-model='form.orderNumber', :min=0, :controls="false")
    el-form-item(label='Цена')
      el-input(v-model='form.price')
      el-select(v-model='form.currency')
        el-option(v-for='curr in currencies', :key='curr', :value='curr')
    el-form-item(label='Номер карты')
      el-input(type='text', v-model='form.cardNumber')
    el-form-item(label='Имя владельца')
      el-input(type='text', v-model='form.name')
    el-form-item(label='Expiration date')
      el-input(type='text', v-model='form.expiration')
    el-form-item(label='CVV')
      el-input(type='text', v-model='form.cvv')
    el-form-item
      el-button(type='primary', @click='onSubmit') Добавить
</template>

<script>
  import ElInput from '../../node_modules/element-ui/packages/input/src/input.vue'
  import submitOrder from '../util/submitForm'

  export default {
    components: {ElInput},
    name: 'AddOrder',
    props: {
      currencies: {
        default: []
      }
    },
    data () {
      return {
        form: {
          orderNumber: '',
          price: 0.00,
          currency: 'USD',
          cardNumber: '',
          name: '',
          expiration: '',
          cvv: ''
        }
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
