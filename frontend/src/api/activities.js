import apiService from './api'
import config from '../config'

export default {
  name: 'activityService',

  getActivities(query) {
    return apiService.get(config.ACTIVITIES_URL, query)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  getActivity(id) {
    let url = config.ACTIVITIES_URL + '/' + id
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  getUserActivity(userId) {
    let url = config.USERS_URL + '/' + userId + '/activities'
    return apiService.get(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  addActivity(activity) {
    let url = config.ACTIVITIES_URL
    return apiService.post(url, activity)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  updateActivity(activity) {
    let url = config.ACTIVITIES_URL + '/' + activity.id
    return apiService.update(url, activity)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  deleteActivity(id) {
    let url = config.ACTIVITIES_URL + '/' + id
    return apiService.delete(url)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}