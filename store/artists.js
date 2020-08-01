const axios = require('axios');

export const state = () => ({
    artists: [],
    artist: {}
})
  
export const mutations = {
    set (state, payload) {
        state.artist = payload;
    },
    get (state) {
        return state.artist;
    },
    add (state, payload) {
        state.artists.push({ payload })
    },
    remove (state, { artist }) {
        state.artists.splice(state.artists.indexOf(artist), 1)
    },
    toggle (state, todo) {
        todo.done = !todo.done
    }
}

export const actions = {
    async getArtists({ commit }) {
        const { data } = await axios.get('https://api.limelightvisions.com/artists')
        commit('set', data);
    }
}