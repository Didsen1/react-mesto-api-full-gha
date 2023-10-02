class Auth {
    constructor (options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    _handleOriginalResponse(res) {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    }
  
    register({ email, password }) {
      return fetch(`${this._url}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({email,password})
      }).then(this._handleOriginalResponse)
    }
  
    authorize({ email, password }) {
      return fetch(`${this._url}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({email,password})
      }).then(this._handleOriginalResponse)
      .then((data) => {
        if (data.token) {
          const { token } = data;
          localStorage.setItem('jwt', token);
  
          return token;
        };
      })
    };
  
    checkToken(token) {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(this._handleOriginalResponse)
    };
  }
  
  const auth = new Auth({
    baseUrl: 'https://api.didsen1.students.nomo.nomoredomainsrocks.ru',
    headers: {'Content-Type': 'application/json'}
  })
  
  export default auth;
  