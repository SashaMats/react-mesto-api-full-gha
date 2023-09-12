
// const baseUrl = 'https://auth.nomoreparties.co'
// const baseUrl = 'https://api.mats-creation.nomoredomainsicu.ru'
const baseUrl = 'https://localhost:3000'

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
}

export function registration(password, email) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getResponseData(res))

}

export function authorization(password, email) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(getResponseData);
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(res => getResponseData(res))
}