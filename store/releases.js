const axios = require('axios');

export const state = () => ({
    releases: [],
    release: {},
    links: {}
})

export const mutations = {
    set (state, payload) {
        state.releases = payload;
    },
    get (state, slug) {
        const release = state.releases.filter(release => release.slug === slug);
        state.release = release[0] ? release[0] : {};
    },
    add (state, payload) {
        state.list.push({ payload })
    },
    remove (state, { item }) {
        state.releases.splice(state.releases.indexOf(item), 1)
    },
    setLinks (state, payload) {
        state.links = payload;
    }
}

export const actions = {
    async getLinks({ commit }, payload) {
        const url = "https://cors-anywhere.herokuapp.com/https://api.song.link";
        const response = await this.$axios({ url: '/page?url=' + encodeURIComponent(payload.songlink), baseURL: url });
        commit('setLinks', response.data.nodesByUniqueId)
    },
    async nuxtServerInit({ commit }) {
        const { data } = await axios.get('https://api.limelightvisions.com/releases')
        commit('set', data);
    }
}