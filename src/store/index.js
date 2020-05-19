import Vue from 'vue'
import Vuex from 'vuex'
import country from './modules/Country';
import airpollution from './modules/AirPollution';
import histotypm25 from './modules/HistoryPM25';
import TotalPopulation from './modules/TotalPopulation';
import VisualAllPointAllCountry from './modules/VisualAllPointAllCountry';

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
    airpollution,
    histotypm25,
    TotalPopulation,
    VisualAllPointAllCountry
  }
})
