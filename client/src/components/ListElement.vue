<template lang="pug">
  el-form.demo-form-inline(:inline='true', :rules='rules', :model='formInline', size='mini', ref='editForm')
    el-row(:gutter='10')
      el-col(:md='2')
        el-form-item
          el-input(v-model='formInline.orderNumber', placeholder='Номер заказа', :disabled='true')
      el-col(:md='3')
        el-form-item(prop='price')
          el-input(v-model='formInline.price', placeholder='0.00')
      el-col(:md='2')
        el-form-item(prop='currency')
          el-select(v-model='formInline.currency')
            el-option(v-for='curr in availableCurrencies', :key='curr', :value='curr')
      el-col(:md='3')
        el-form-item(prop='cardNumber')
          el-input(v-model='formInline.cardNumber', placeholder='Номер карты')
      el-col(:md='3')
        el-form-item(prop='name')
          el-input(v-model='formInline.name', placeholder='Имя владельца')
      el-col(:md='3')
        el-form-item(prop='expiration')
          el-input(v-model='formInline.expiration', placeholder='MM / YY')
      el-col(:md='3')
        el-form-item(prop='cvv')
          el-input(v-model='formInline.cvv', v-mask='masks.cvv', placeholder='CVV')
      el-col(:md='3')
        el-form-item
          el-button-group
            el-button(type='success', icon='el-icon-edit', @click='editOrder')
            el-popover(ref='popover5', placement='top', width='160', v-model='confirmationVisible')
              p Точно удалить?
              div(style='text-align: right; margin: 0')
                el-button(size='mini', type='primary', @click='confirmationVisible = false') отмена
                el-button(size='mini', type='danger', @click='deleteOrder') удалить
            el-button(v-popover:popover5='', type='danger', icon='el-icon-delete')
</template>

<script>
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item.vue'
  import AwesomeMask from 'awesome-mask'
  import submitOrder from '../util/submitForm'
  import validator from '../util/validators'
  import masks from '../util/inputMasks'
  const rules = validator()

  export default {
    components: {ElFormItem},
    directives: {
      'mask': AwesomeMask
    },
    props: ['order', 'availableCurrencies'],
    data () {
      let price = this.order.price.toString(),
        cardNumber = this.order.card_number.toString().trim().match(/.{1,4}/g).join(' ')
      const decimal = price.split('.')[1]
      if (!decimal) price += '.00'
      else if (decimal.length < 2) price += '0'
      return {
        formInline: {
          orderNumber: this.order.order_number,
          price: price,
          currency: this.order.currency,
          cardNumber: cardNumber,
          name: this.order.name,
          expiration: this.order.expiration.split('/').join(' / '),
          cvv: this.order.cvv
        },
        rules,
        masks,
        confirmationVisible: false
      }
    },
    methods: {
      async editOrder () {
        const valid = await this.$refs.editForm.validate()
        if (!valid) return false
        const response = await submitOrder('PUT', this.formInline)
        if (response.ok) {
          this.$notify({
            title: 'Изменен',
            message: `Заказ ${this.formInline.orderNumber} успешно отредактирован`,
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
      deleteOrder () {
        this.confirmationVisible = false
        this.$emit('delete')
      }
    }
  }
</script>

<style lang="stylus">
  .el-popover
    text-align center
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
</style>