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
  }
};

const getters = {
  a_input: (state) => state.a_input,
  a_result: (state) => state.a_result,
  a_note: (state) => state.a_note,
};

const mutations = {};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
