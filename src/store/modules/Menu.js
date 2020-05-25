const state = {
  menuproject2: "",
  menufinal1: "",
  menufinal2: "",
  menufinal3: "",
  allmenu: "",
};

const getters = {
  menuproject2: (state) => state.menuproject2,
  menufinal1: (state) => state.menufinal1,
  menufinal2: (state) => state.menufinal2,
  menufinal3: (state) => state.menufinal3,
  allmenu: (state) => state.allmenu,
};

const mutations = {
  setMenu(state) {
    let project2 = [
      {
        path: "/country_area",
        title: "Country Area (Project2)",
        icon: "mdi-calculator",
        detail:
          "Given a country name as input from the user and calculate the country area and then show the result.",
      },
    ];
    let projectfianl1 = [
      {
        path: "/insert_airpollution",
        title: "[2,3] Insert AirPollutionPM25",
        icon: "mdi-database-plus",
        detail: `Given an input path to the input excel file for insert into AirPollutionPM25 
          table from the user and then will be update column Geom from null to point by using latitude and longitude.`,
      },
    ];
    let projectfianl2 = [
      {
        path: "/city_pm25_2015",
        title: "[4a] City PM25 > 50 in 2015",
        icon: "mdi-arrow-collapse-down",
        detail:
          "The result of country and city names whose PM 2.5 values are greater than 50 in 2015 as excel file.",
      },
      {
        path: "/avg_pm25_country",
        title: "[4b] Average PM25 by Country",
        icon: "mdi-arrow-collapse-down",
        detail:
          "The result of average PM 2.5 each country as excel file. It is decreasing order by average of PM 2.5.",
      },
      {
        path: "/history_pm25_country",
        title: "[4c] Historical PM25 by Country",
        icon: "mdi-file-document",
        detail:
          "Given a country name as input from the user and then show a historical PM 2.5 values order by year.",
      },
      {
        path: "/total_population",
        title: "[4d] Total of Population",
        icon: "mdi-account-multiple",
        detail: `Given a year and color of PM2.5 level of health concern as input from the user and 
        and calculate a total of the affected population and then show the result.`,
      },
    ];
    let projectfianl3 = [
      {
        path: "/all_point_all_country",
        title: "[5a] All City Point of All Country",
        icon: "mdi-radiobox-marked",
        detail: `Given a year as input from the user and visualize all the city points of all countries.`,
      },
      {
        path: "/closest_bangkok",
        title: "[5b] 50 Closest Bangkok",
        icon: "mdi-map-marker-radius",
        detail: `Visualize the 50 closest city points to Bangkok.`,
      },
      {
        path: "/neighbor_thailand",
        title: "[5c] Neighbor of Thailand",
        icon: "mdi-map-marker-multiple",
        detail:
          "Visualize all the city points of Thailand’s neighboring countries in 2018.",
      },
      {
        path: "/mbr_thailand",
        title: "[5d] MBR of Thailand",
        icon: "mdi-rhombus",
        detail:
          "Visualize the four points of MBR covering all city points in Thailand in 2009.",
      },
      {
        path: "/highest_city",
        title: "[5e] Highest No of City",
        icon: "mdi-chart-areaspline",
        detail:
          "Visualize all city points of countries having the highest no. of city points in 2011.",
      },
      {
        path: "/low_income",
        title: "[5f] Low Income by Year",
        icon: "mdi-chart-bar",
        detail: `Given a year as input from the user and then visualize all the city points which are
            considered as “low income” (as specified in column wbinc16_text ).`,
      },
    ];
    let home = [
      {
        path: "/",
        title: "Home",
        icon: "mdi-home-circle",
        deatil: "Home page",
      },
    ];
    state.menuproject2 = project2;
    state.menufinal1 = projectfianl1;
    state.menufinal2 = projectfianl2;
    state.menufinal3 = projectfianl3;
    state.allmenu = [
      ...home,
      ...project2,
      ...projectfianl1,
      ...projectfianl2,
      ...projectfianl3,
    ];
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
