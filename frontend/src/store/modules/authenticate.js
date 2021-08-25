const state = {
  user: null,
  isAdmin: false,
  isEditor: false,
  userLoggedIn: false,
  token: '',
  expires_at: new Date()
}

const getters = {
  getUser: (state) => state.user,
  getAdmin: (state) => state.isAdmin,
  getEditor: (state) => state.isEditor,
  userLoggedIn: (state) => state.userLoggedIn,
  getToken: (state) => state.token,
  getTokenExpiryDate: (state) => state.expires_at
}

const actions = {
  login({ commit }, response) {
    commit('LOGIN_SUCCESS', response)
  },
  loginFailed({ commit }) {
    commit('LOGIN_FAILURE')
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  get_user({ commit }, response) {
    commit('USER_SUCCESS', response)
  },
  update_pic({ commit }, pic) {
    commit('UPDATE_PIC', pic)
  },
}

const mutations = {
  LOGIN_SUCCESS: (state, response) => {
    state.token = response.token
    state.expires_at = new Date()
  },
  LOGIN_FAILURE: (state) => {
    state.token = ''
    state.expires_at = new Date()
    state.user = null
    state.userLoggedIn = false
  },
  LOGOUT: (state) => {
    state.user = null
    state.token = ''
    state.expires_at = new Date()
    state.userLoggedIn = false
    state.isAdmin = false
    state.isEditor = false
  },
  USER_SUCCESS: (state, user) => {
    switch (user.role) {
      case 'admin':
        state.isAdmin = true
        break;
      case 'editor':
        state.isEditor = true
        break;
    }
    state.user = user
    state.userLoggedIn = true
  },
  UPDATE_PIC: (state, pic) => {
    state.user.profile_pic = pic
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}