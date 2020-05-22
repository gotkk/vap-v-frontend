const state = {
  a_input: {
    classes: "fadeInUp",
    delay: 300,
  },
  a_result: {
    classes: "bounce",
    delay: 0,
  },
  a_note: {
    classes: "fadeInUp",
    delay: 1200,
  },
  a_mapsetting: {
    classes: "fadeInUp",
    delay: 3700,
  },
  a_mapresult: {
    classes: "fadeInUp",
    delay: 4000,
  }
};

const getters = {
  a_input: (state) => state.a_input,
  a_result: (state) => state.a_result,
  a_note: (state) => state.a_note,
  a_mapsetting: (state) => state.a_mapsetting,
  a_mapresult: (state) => state.a_mapresult,
};

const mutations = {};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
