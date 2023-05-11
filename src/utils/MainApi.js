export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            ...this._headers,
            authorization: `Bearer ${token}`
        },
        credentials: 'include',
        }).then(this._getResponseData)
    }

    getMovies(token) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                ...this._headers,
                authorization: `Bearer ${token}`
            },
        })
        .then(this._getResponseData)
    }

    saveMovie(data, token) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                ...this._headers,
                authorization: `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({
                country : data.country,
                director : data.director,
                duration : data.duration,
                year : data.year,
                description : data.description,
                image : `https://api.nomoreparties.co${data.image.url}`,
                trailer : data.trailerLink,
                thumbnail : `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId : data.id,
                nameRU : data.nameRU,
                nameEN : data.nameEN
            })
        })
        .then(this._getResponseData)
    }

    deleteMovie(data, token) {
        return fetch(`${this._baseUrl}/movies/${data}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                authorization: `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(this._getResponseData)
    }

    updateProfile(data, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                authorization: `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
        .then(this._getResponseData)
    }


    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    } 
}

const apiMain = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default apiMain;