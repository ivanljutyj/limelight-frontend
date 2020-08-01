const axios = require('axios');

export const state = () => ({
    artists: [],
    artist: {}
})
  
export const mutations = {
    set (state, payload) {
        state.artists = payload;
    },
    get (state, slug) {
        const artist = state.artists.filter(artist => artist.slug === slug);
        state.artist = artist[0] ? artist[0] : {};
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
        const { data } = await axios.get('http://api.limelightvisions.com/artists')
        commit('set', data);
    }
}