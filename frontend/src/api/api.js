import axios from 'axios'
import is from 'is_js'

export default {
  name: 'apiService',
  setToken () {
    let vuex = JSON.parse(localStorage.getItem('vuex'))
    if (is.not.null(vuex)) {
      let token = vuex.fppauth.token
      if (token !== '') {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      }
    }
  },
  handleError (response) {
    let r = Object.assign({}, response)
    let payload = r.response.data;
    console.log(payload);
    return payload
  },
  get (url, params = {}) {
    this.setToken()
    return axios.get(url, { params: params })
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(this.handleError(error)))
  },
  post (url, data) {
    this.setToken()
    return axios.post(url, data)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(this.handleError(error)))
  },
  update (url, data) {
    this.setToken()
    return axios.put(url, data)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(this.handleError(error)))
  },
  delete (url) {
    this.setToken()
    return axios.delete(url)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(this.handleError(error)))
  }
}
