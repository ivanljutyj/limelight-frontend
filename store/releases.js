const axios = require('axios');

export const state = () => ({
    releases: [],
    release: {},
    links: [],
    currentLinks: {}
})

export const mutations = {
    set (state, payload) {
        state.release = payload;
    },
    get (state) {
        return state.release;
    },
    add (state, payload) {
        state.list.push({ payload })
    },
    remove (state, { item }) {
        state.releases.splice(state.releases.indexOf(item), 1)
    },
    setLink (state, payload) {
        state.links.push(payload);
    },
    getLinks (state, slug) {
        let release = state.links.filter(release => release.slug === slug);
        state.currentLinks = release[0] ? release[0].data : {};
    }
}

export const actions = {
    async getReleases({ commit }) {
        const { data } = await axios.get('https://api.limelightvisions.com/releases')
        commit('set', data);

        for (const release of data) {
            let url = "https://api.song.link/page?url=" + encodeURIComponent(release.songlink);
            let { data } = await axios.get(url);
            commit('setLink', { slug: release.slug, data: data.nodesByUniqueId });
        }
    }
}
