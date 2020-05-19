const axios = require("axios");

const state = {
  allpointallcountry: "",
};

const getters = {
    allpointallcountry: (state) => state.allpointallcountry,
};

const mutations = {
  setAllPointAllCountry(state, allpointallcountry) {
    state.allpointallcountry = allpointallcountry;
  },
};

const actions = {
    getAllCityPointAllCountrybyYear({ commit }, year){
    return new Promise((resolve, reject) => {
        axios.get( `${process.env.VUE_APP_SPDB_BACKEND_APP || "http://localhost:5000/"}airpollution/visual_all_point/${year}`)
        .then((res) => {
            commit("setAllPointAllCountry", res.data);
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
