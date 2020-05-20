const axios = require("axios");

const state = {
  airpollutuion: "",
  airpollutuionstatus: "",
  closestbangkok: "",
};

const getters = {
    airPollutuionStatus: (state) => state.airpollutuionstatus,
    airpollutuion: (state) => state.airpollutuion,
    closestBangkok: (state) => state.closestBangkok,
};

const mutations = {
  setAirPollutuion(state, airpollutuion) {
    state.airpollutuion = airpollutuion;
  },
  setAirPollutuionStatus(state, airpollutuion) {
    state.airpollutuion = airpollutuion;
  },
  setClosestBangkok(state, closestbangkok){
    state.closestbangkok = closestbangkok;
  }
};

const actions = {
  uploadExceltoInsert({ commit }, excelfile) {
    return new Promise((resolve, reject) => {
      var formData = new FormData();
      formData.append("excel", excelfile);
      axios
        .post(
          `${process.env.VUE_APP_SPDB_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          commit("setAirPollutuionStatus", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateColumGeom({ commit }){
    return new Promise((resolve, reject) => {
        axios.get( `${process.env.VUE_APP_SPDB_BACKEND_APP || "http://localhost:5000/"}airpollution/update_geometry`)
        .then((res) => {
            commit("setAirPollutuionStatus", res.data);
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
        })
    });
  },
  get50ClosestBangkok({commit}){
    return new Promise((resolve, reject) => {
      axios.get( `${process.env.VUE_APP_SPDB_BACKEND_APP || "http://localhost:5000/"}airpollution/50closest_bangkok`)
      .then((res) => {
          commit("setClosestBangkok", res.data);
          resolve(res.data);
      })
      .catch((err) => {
          reject(err);
      })
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
