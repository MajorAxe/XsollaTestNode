export default async (method, form) => {
  const options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encodeForm(form)
  }
  return fetch('/order', options)
}

function encodeForm (form) {
  let formBody = []
  for (let property in form) {
    const encodedKey = encodeURIComponent(property),
      encodedValue = typeof form[property] === 'string' ? encodeURIComponent(form[property].trim()) : encodeURIComponent(form[property])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  return formBody.join('&')
}
