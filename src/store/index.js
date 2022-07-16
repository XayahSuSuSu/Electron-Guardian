import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    deviceCode: ''
  },
  mutations: {
    setDeviceCode(state, code) {
      state.deviceCode = code
    }
  }
})

export default store
