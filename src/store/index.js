import Vue from "vue";
import Vuex from "vuex";
import country from "./modules/Country";
import menu from "./modules/Menu";
import animated from "./modules/Animated";
import mapStyle from './modules/MapStyle';
import downloadUpload from "./modules/DownloadUpload";
import calculateResult from "./modules/CalculateResult";
import visualize from "./modules/Visualize";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    country,
    menu,
    animated,
    mapStyle,
    downloadUpload,
    calculateResult,
    visualize,
  },
});
