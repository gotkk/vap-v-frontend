const axios = require("axios");
const FileDownload = require("js-file-download");

const state = {
  airpollutuionstatus: "",
};

const getters = {
  airPollutuionStatus: (state) => state.airpollutuionstatus,
};

const mutations = {
  setAirPollutuionStatus(state, airpollutuion) {
    state.airpollutuion = airpollutuion;
  },
};

const actions = {
  uploadExceltoInsert({ commit }, excelfile) {
    return new Promise((resolve, reject) => {
      var formData = new FormData();
      formData.append("excel", excelfile);
      axios
        .post(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
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
  updateColumGeom({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/update_geometry`
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
  getInsertTemplate() {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/download_template`,
          null,
          {
            headers: {
              "Content-Disposition": "attachment; filename=InsertTemplate.xlsx",
              "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          // const url = window.URL.createObjectURL(new Blob([res.data]));
          // const link = document.createElement("a");
          // link.href = url;
          // link.setAttribute("download", "InsertTemplate.xlsx");
          // document.body.appendChild(link);
          // link.click();
          FileDownload(res.data, "InsertTemplate.xlsx");
          resolve();
        })
        .catch((err) => reject(err));
    });
  },
  getCountryAndCityPMthan50() {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/download_country_city_pmthan50`,
          null,
          {
            headers: {
              "Content-Disposition":
                "attachment; filename=CountryAndCityPMthan50.xls",
              "Content-Type": "application/vnd.ms-excel",
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          FileDownload(res.data, "CountryAndCityPMthan50.xls");
          resolve();
        })
        .catch((err) => reject(err));
    });
  },
  getAvgPm25ByCountry() {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.VUE_APP_VAP_BACKEND_APP ||
            "http://localhost:5000/"}airpollution/download_avgpm25_country`,
          null,
          {
            headers: {
              "Content-Disposition":
                "attachment; filename=AvgPm25ByCountry.xls",
              "Content-Type": "application/vnd.ms-excel",
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          FileDownload(res.data, "AvgPm25ByCountry.xls");
          resolve();
        })
        .catch((err) => reject(err));
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
