const axios = require('axios');

export const state = () => ({
    list: [],
    post: {}
})

export const mutations = {
    set (state, payload) {
        state.list = payload;
    },
    get (state, slug) {
        const post = state.posts.filter(post => post.slug === slug);
        state.post = post[0] ? post[0] : {};
    },
    add (state, payload) {
        state.list.push({ payload })
    },
    remove (state, { post }) {
        state.list.splice(state.list.indexOf(post), 1)
    }
}

export const actions = {
    async nuxtServerInit({ commit }) {
        const { data } = await axios.get('http://api.limelightvisions.com/posts')
        commit('set', data);
    }
}
