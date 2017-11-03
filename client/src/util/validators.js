import serverValidation from '../../../server/validation'

export default () => {
  return {
    orderNumber: [
      { required: true, validator: orderNumber, trigger: 'blur' }
    ],
    price: [
      { required: true, validator: price, trigger: 'blur' }
    ],
    currency: [
      { required: true, validator: currency, trigger: 'blur' }
    ],
    cardNumber: [
      { required: true, validator: cardNumber, trigger: 'change, blur' }
    ],
    name: [
      { required: true, validator: name, trigger: 'blur' }
    ],
    expiration: [
      { required: true, validator: expiration, trigger: 'change, blur' }
    ],
    cvv: [
      { required: true, validator: cvv, trigger: 'change, blur' }
    ]
  }
}

function orderNumber (rule, value, callback) {
  const valuePure = value.toString()
  if (!serverValidation.orderNumber(valuePure)) callback(new Error('Ошибка'))
  else callback()
}

function price (rule, value, callback) {
  const valuePure = value.toString().replace(/\s/g, '')
  if (!serverValidation.price(valuePure)) callback(new Error('Введите цену в формате *.XX'))
  else callback()
}

function currency (rule, value, callback) {
  const valuePure = value.toString()
  if (!/^\w{3}$/.test(valuePure)) callback(new Error('Выберите валюту из списка'))
  else callback()
}

function cardNumber (rule, value, callback) {
  const valuePure = value.toString().replace(/\s/g, '')
  if (!serverValidation.cardNumber(valuePure)) callback(new Error('Введите корректный номер'))
  else callback()
}

function name (rule, value, callback) {
  const valuePure = value.toString()
  if (!serverValidation.name(valuePure)) callback(new Error('Имя и фамилия, через пробел'))
  else callback()
}

function expiration (rule, value, callback) {
  const valuePure = value.toString().replace(/\s/g, '')
  if (!serverValidation.expirationDateValid(valuePure)) callback(new Error('Формат MM / YY'))
  else if (!serverValidation.expirationDateActual(valuePure)) callback(new Error('Карта просрочена'))
  else callback()
}

function cvv (rule, value, callback) {
  if (!serverValidation.cvv(value.trim())) callback(new Error('3-4 цифры'))
  else callback()
}
