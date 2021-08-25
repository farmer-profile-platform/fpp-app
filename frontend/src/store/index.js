// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import fppauth from './modules/authenticate'
import farmers from './modules/farmers'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    fppauth,
    farmers
  },
  plugins: [
    createPersistedState()
  ]
})
