import apiService from './api'
import config from '../config'

export default {
  name: 'farmersService',
  components: {
    apiService
  },
  getFarmers(query) {
    return apiService.get(config.FARMERS_URL, query)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getFarmer(id) {
    let url = config.FARMERS_URL + '/' + id
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  addFarmer(farmerData) {
    let url = config.FARMERS_URL
    return apiService.post(url, farmerData)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  updateFarmer(farmerData) {
    let url = config.FARMERS_URL + '/' + farmerData.id
    return apiService.update(url, farmerData)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getFarmersWithSupport() {
    let url = config.FARMERS_URL + "/support"
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  uploadFarmerFiles(img) {
    let url = config.FARMERS_URL + "/upload"
    return apiService.post(url, img)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  deleteFarmer(id) {
    let url = config.FARMERS_URL + '/' + id
    return apiService.delete(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}