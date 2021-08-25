import apiService from './api'
import config from '../config'

export default {
  name: 'supportService',
  components: {
    apiService
  },

  getAllSupports() {
    return apiService.get(config.SUPPORTS_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getSupport(id) {
    let url = config.SUPPORTS_URL + '/' + id
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  addInputSupport(support) {
    let url = config.SUPPORTS_URL
    return apiService.post(url, support)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  updateSupport(support) {
    let url = config.SUPPORTS_URL + '/' + support._id
    return apiService.update(url, support)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  deleteSupport(id) {
    let url = config.SUPPORTS_URL + '/' + id
    return apiService.delete(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}