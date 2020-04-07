const axios = require('axios');

const state = {
    country: ""
}

const getters = {
    country: state => state.country
}

const mutations = {
    setCountry(state, country) {
        state.country = country;
    },
}

const actions = {
    getAreaFromName({ commit }, country) {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP || 'http://localhost:5000/'}world/${country}`)
                .then((res) => {
                    commit("setCountry", res.data);
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}