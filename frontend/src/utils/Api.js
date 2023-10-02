class Api {
    constructor() {
        this._baseUrl = 'https://api.didsen1.students.nomo.nomoredomainsrocks.ru';
    }

    _request(url, options) {
        return fetch(url, options)
            .then(this._checkResponse);
    };

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            Promise.reject(`Ошибка: ${response.status}/${response.statusText}`);
        };
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            }
        }
        );
    };

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            },
        });
    }

    changeUserInfo({ name, about }) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, about })
        });
    }

    changeUserAvatar({ avatar }) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ avatar })
        });
    }

    addCard({ name, link }) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, link })
        });
    }

    changeLikeCardStatus(id, isLiked) {
        if (!isLiked) {
            return this._request(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-type': 'application/json'
                },
            });
        } else {
            return this._request(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-type': 'application/json'
                },
            });
        };
    };

    deleteCard(id) {
        return this._request(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            },
        });
    };

};

const api = new Api();

export default api;