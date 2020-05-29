const axios = require("axios");

const state = {
  allpointallcountry: "",
  closestbangkok: "",
  neighborbangkok: "",
  pointMBR: "",
  highestpoint: "",
  lowincome: "",
};

const getters = {
  allpointallcountry: (state) => state.allpointallcountry,
  closestBangkok: (state) => state.closestbangkok,
  neighborBangkok: (state) => state.neighborbangkok,
  pointMBR: (state) => state.pointMBR,
  highestpoint: (state) => state.highestpoint,
  lowincome: (state) => state.lowincome,
};

const mutations = {
  setAllPointAllCountry(state, allpointallcountry) {
    state.allpointallcountry = allpointallcountry;
  },
  setClosestBangkok(state, closestbangkok) {
    state.closestbangkok = closestbangkok;
  },
  setNeighborBangkok(state, neighborbangkok) {
    state.neighborbangkok = neighborbangkok;
  },
  setPointMBR(state, pointMBR) {
    state.pointMBR = pointMBR;
  },
  setHighestPoint(state, highestpoint) {
    state.highestpoint = highestpoint;
  },
  setLowIncome(state, lowincome) {
    state.lowincome = lowincome;
  },
};

const actions = {
  getAllCityPointAllCountrybyYear({ commit }, year) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/visual_all_point/${year}`
        )
        .then((res) => {
          commit("setAllPointAllCountry", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  get50ClosestBangkok({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/50closest_bangkok`
        )
        .then((res) => {
          commit("setClosestBangkok", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getNeighborBangkok({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/neighbor_bangkok`
        )
        .then((res) => {
          commit("setNeighborBangkok", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getMinMaxLatLnThaiForMBR({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/maxmin_latln_mbr`
        )
        .then((res) => {
          commit("setPointMBR", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getHighestPoint({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/highest_no_city`
        )
        .then((res) => {
          commit("setHighestPoint", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getLowIncome({ commit }, year) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/low_income/${year}`
        )
        .then((res) => {
          commit("setLowIncome", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
