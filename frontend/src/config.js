// function getApiUrl () {
//   let hn = window.location.hostname
//   if (hn === 'localhost') {
//     return 'http://127.0.0.1:5000/api/v1/'
//   } else if (hn == 'fppghana.com') {
//     return 'https://api.fppghana.com/api/v1/'
//   } else {
//     return 'https://api.fppghana.com/api/v1/'
//   }
// }

const API_URL = '/api/';

export default {
  LOGIN_URL: API_URL + 'auth/login',
  REGISTER_URL: API_URL + 'auth/register',
  LOGGED_IN_USER_URL: API_URL + 'auth/current-user',
  LOGOUT_USER_URL: API_URL + 'auth/logout',
  FARMERS_URL: API_URL + 'farmers',
  USERS_URL: API_URL + 'users',
  REPORTS_URL: API_URL + 'dashboard-reports',
  ACTIVITIES_URL: API_URL + 'activities',
  SUPPORTS_URL: API_URL + 'supports',
  FSPS_URL: API_URL + 'fsps',
  ISSUES_URL: API_URL + 'issues'
}