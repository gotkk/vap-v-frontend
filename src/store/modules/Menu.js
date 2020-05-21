const state = {
  menuproject2: "",
  menufinal1: "",
  menufinal2: "",
  menufinal3: "",
};

const getters = {
  menuproject2: (state) => state.menuproject2,
  menufinal1: (state) => state.menufinal1,
  menufinal2: (state) => state.menufinal2,
  menufinal3: (state) => state.menufinal3,
};

const mutations = {
  setMenu(state) {
    let project2 = [
      {
        title: "Country Area",
        detail:
          "Given a country name as input from the user and calculate the country area and then show the result.",
      },
    ];
    let projectfianl1 = [
      {
        title: "Insert AirPollutionPM25",
        path: "/insert_airpollution",
        icon: "mdi-arrow-collapse-down",
        detail: `Given an input path to the input excel file for insert into AirPollutionPM25 
          table from the user and then will be update column Geom from null to point by using latitude and longitude.`,
      }
    ];
    let projectfianl2 = [
      {
        title: "Historical PM25 by Country",
        path: "/history_pm25_country",
        icon: "mdi-file-document",
        detail:
          "Given a country name as input from the user and then show a historical PM 2.5 values order by year.",
      },
      {
        title: "Total of Population",
        path: "/total_population",
        icon: "mdi-file-document",
        detail: `Given a year and color of PM2.5 level of health concern as input from the user and 
        and calculate a total of the affected population and then show the result.`,
      }
    ];
    let projectfianl3 = [
      {
        title: "All City Point of All Country",
        path: "/all_point_all_country",
        icon: "mdi-file-document",
        detail: `Given a year as input from the user and visualize all the city points of all countries.`,
      },
      {
        title: "50 Closest Bangkok",
        path: "/closest_bangkok",
        icon: "mdi-file-document",
        detail: `Visualize the 50 closest city points to Bangkok.`,
      },
      {
        title: "Neighbor of Thailand",
        path: "/neighbor_thailand",
        icon: "mdi-file-document",
        detail:
          "Visualize all the city points of Thailand’s neighboring countries in 2018.",
      },
      {
        title: "MBR of Thailand",
        path: "/mbr_thailand",
        icon: "mdi-file-document",
        detail:
          "Visualize the four points of MBR covering all city points in Thailand in 2009.",
      },
      {
        title: "MBR of Thailand",
        path: "/mbr_thailand",
        icon: "mdi-file-document",
        detail:
          "Visualize the four points of MBR covering all city points in Thailand in 2009.",
      },
      {
        title: "Highest No of City",
        path: "/highest_city",
        icon: "mdi-file-document",
        detail:
          "Visualize all city points of countries having the highest no. of city points in 2011.",
      },
      {
        title: "Low Income by Year",
        path: "/low_income",
        icon: "mdi-file-document",
        detail: `Given a year as input from the user and then visualize all the city points which are
            considered as “low income” (as specified in column wbinc16_text ).`,
      },
    ];
    state.menuproject2 = project2;
    state.menufinal1 = projectfianl1;
    state.menufinal2 = projectfianl2;
    state.menufinal3 = projectfianl3;
  },
};

const actions = {
  getMenu({ commit }) {
    commit("setMenu");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
