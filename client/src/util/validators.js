import serverValidation from '../../../server/validation'

export default () => {
  return {
    orderNumber: [
      { required: true, validator: orderNumber, trigger: 'blur' }
    ],
    price: [
      { required: true, validator: price, trigger: 'change, blur' }
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
  if (!serverValidation.orderNumber(value)) callback(new Error('Ошибка'))
  else callback()
}

function price (rule, value, callback) {
  if (!serverValidation.price(value)) callback(new Error('Введите цену в формате *.XX'))
  else callback()
}

function currency (rule, value, callback) {
  if (!/^\w{3}$/.test(value)) callback(new Error('Выберите валюту из списка'))
  else callback()
}

function cardNumber (rule, value, callback) {
  if (!serverValidation.cardNumber(value.trim())) callback(new Error('Введите корректный номер'))
  else callback()
}

function name (rule, value, callback) {
  if (!serverValidation.name(value)) callback(new Error('Имя и фамилия, через пробел'))
  else callback()
}

function expiration (rule, value, callback) {
  if (!serverValidation.expirationDateValid(value.trim())) callback(new Error('Формат XX/XX'))
  if (!serverValidation.expirationDateActual(value.trim())) callback(new Error('Карта просрочена'))
  else callback()
}

function cvv (rule, value, callback) {
  if (!serverValidation.cvv(value.trim())) callback(new Error('3-4 цифры'))
  else callback()
}
