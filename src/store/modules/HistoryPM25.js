const axios = require("axios");

const state = {
  historypm25: "",
};

const getters = {
    historypm25: (state) => state.historypm25,
};

const mutations = {
  setHistorypm25(state, historypm25) {
    state.historypm25 = historypm25;
  },
};

const actions = {
  getHistorypm25byCountry({ commit }, country){
    return new Promise((resolve, reject) => {
        axios.get( `${process.env.VUE_APP_SPDB_BACKEND_APP || "http://localhost:5000/"}airpollution/historypm25_country/${country}`)
        .then((res) => {
            commit("setHistorypm25", res.data);
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
