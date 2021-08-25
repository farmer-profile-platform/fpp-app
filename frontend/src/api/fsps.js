import apiService from './api'
import config from '../config'

export default {
  name: "fspService",
  components: {
    apiService
  },
  getFsps(query) {
    return apiService.get(config.FSPS_URL, query)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  addFsp(fsp) {
    return apiService.post(config.FSPS_URL, fsp)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  removeFsp(id) {
    let url = config.FSPS_URL + '/' + id
    return apiService.delete(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}