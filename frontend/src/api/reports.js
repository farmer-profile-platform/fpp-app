import apiService from './api'
import config from '../config'

export default {
  name: 'dashboardService',

  getReports() {
    return apiService.get(config.REPORTS_URL)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getFarmerReports(farmerId) {
    let url = config.REPORTS_URL + '/farmer/' + farmerId
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  getUserReports(userId) {
    let url = config.REPORTS_URL + '/user/' + userId
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}