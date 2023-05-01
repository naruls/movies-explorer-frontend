export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getMovies() {
        return fetch(`${this._baseUrl}`, {
            method: 'GET',
            headers: {
                ...this._headers
            },
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

const apiMovies = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default apiMovies;