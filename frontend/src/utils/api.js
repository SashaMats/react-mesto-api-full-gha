  class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      // this._headers = options.headers;
      // this._autoriz = options.headers.authorization;
    }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      // headers: this._headers
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => this._checkResponse(res));
  }

  setCardOnServ = (data, token) => {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      body: JSON.stringify(data),
      // headers: this._headers
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => this._checkResponse(res));
  }

  getAuthorInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      // headers: this._headers
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => this._checkResponse(res));
  }
  setAuthorInfo = (data, token) => {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.description
      }),
      // headers: this._headers
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => this._checkResponse(res));
  }
  setAuthorAvatar = (data, token) => {
    return fetch(this._baseUrl + '/users/me/avatar ', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.link
      }),
      // headers: this._headers
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => this._checkResponse(res));
  }

  setLike = (cardId, token) => {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      // headers: this._headers
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => this._checkResponse(res));
  }

  deleteLike = (cardId, token) => {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      // headers: this._headers
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCard(data, token) {
    return fetch(this._baseUrl + '/cards/' + data, {
      method: 'DELETE',
      // headers: this._headers
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => this._checkResponse(res));
  }
}

export const apiData = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  baseUrl: 'http://localhost:3000',

  // headers: {
    // authorization: 'c8278fb8-59b1-406f-bd93-93c438e0e690',
  //   'Content-Type': 'application/json'
  // }
});
