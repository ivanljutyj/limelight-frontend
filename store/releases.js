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
        const url = "https://api.song.link/page?url=" + encodeURIComponent(payload.songlink);
        let { data } = await axios.get(url);
        console.log(data);
        commit('setLinks', data.nodesByUniqueId)
    },
    async nuxtServerInit({ commit }) {
        const { data } = await axios.get('https://api.limelightvisions.com/releases')
        commit('set', data);
    }
}
