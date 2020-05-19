const axios = require("axios");

const state = {
  totalpopulation: "",
};

const getters = {
  totalpopulation: (state) => state.totalpopulation,
};

const mutations = {
  setTotalPopulation(state, totalpopulation) {
    state.totalpopulation = totalpopulation;
  },
};

const actions = {
  getTotalPopulationbyYearandColorPM25({ commit }, input){
    return new Promise((resolve, reject) => {
        axios.post( `${process.env.VUE_APP_SPDB_BACKEND_APP || "http://localhost:5000/"}airpollution/total_population`, input)
        .then((res) => {
            commit("setTotalPopulation", res.data);
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
        })
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
