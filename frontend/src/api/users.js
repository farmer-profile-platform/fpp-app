import apiService from './api'
import config from '../config'

export default {
  name: 'userService',
  components: {
    apiService
  },
  getUsers() {
    return apiService.get(config.USERS_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getUser(id) {
    let url = config.USERS_URL + '/' + id
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  addUser(userData) {
    let url = config.USERS_URL
    return apiService.post(url, userData)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  updateUser(userData) {
    let url = config.USERS_URL + '/' + userData.id
    return apiService.update(url, userData)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  uploadUserPhoto(id, img) {
    let url = config.USERS_URL + '/' + id + '/photo'
    return apiService.update(url, img)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  deleteUser(id) {
    let url = config.USERS_URL + '/' + id
    return apiService.delete(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}