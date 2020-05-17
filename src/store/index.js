import Vue from 'vue'
import Vuex from 'vuex'
import country from './modules/Country';
import airpollution from './modules/AirPollution';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    country,
    airpollution
  }
})
