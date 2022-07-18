import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    deviceCode: '',
    rtmpAddressCourt: '',
    rtmpAddressCar: '',
  },
  mutations: {
    setDevice(state, data) {
      state.deviceCode = data['device_code']
      state.rtmpAddressCourt = data['rtmp_address_court']
      state.rtmpAddressCar = data['rtmp_address_car']
    }
  }
})

export default store
