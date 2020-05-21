const axios = require("axios");

const state = {
  airpollutuion: "",
  airpollutuionstatus: "",
  closestbangkok: "",
  neighborbangkok: "",
  pointMBR: "",
  highestpoint: "",
  lowincome: ""
};

const getters = {
    airPollutuionStatus: (state) => state.airpollutuionstatus,
    airpollutuion: (state) => state.airpollutuion,
    closestBangkok: (state) => state.closestbangkok,
    neighborBangkok: (state) => state.neighborbangkok,
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
  },
  setNeighborBangkok(state, neighborbangkok){
    state.neighborbangkok = neighborbangkok;
  },
  setPointMBR(state, pointMBR){
    state.pointMBR = pointMBR
  },
  setHighestPoint(state, highestpoint){
    state.highestpoint = highestpoint
  },
  low_income(state, lowincome){
    state.lowincome = lowincome
  },
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
  getNeighborBangkok({commit}){
    return new Promise((resolve, reject) => {
      axios.get( `${process.env.VUE_APP_SPDB_BACKEND_APP || "http://localhost:5000/"}airpollution/neighbor_bangkok`)
      .then((res) => {
          commit("setNeighborBangkok", res.data);
          resolve(res.data);
      })
      .catch((err) => {
          reject(err);
      })
    });
  },
  getMinMaxLatLnThaiForMBR({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_SPDB_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/maxmin_latln_mbr`
        )
        .then((res) => {
          commit("setPointMBR", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  getHighestPoint({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_SPDB_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/highest_no_city`
        )
        .then((res) => {
          commit("setHigjestPoint", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  getLowIncome({ commit }, year) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_SPDB_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/low_income/${year}`
        )
        .then((res) => {
          commit("setLowIncome", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
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
