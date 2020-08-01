const axios = require('axios');

export const state = () => ({
    list: [],
    post: {}
})

export const mutations = {
    set (state, payload) {
        state.post = post;
    },
    get (state) {
    },
    add (state, payload) {
        state.list.push({ payload })
    },
    remove (state, { post }) {
        state.list.splice(state.list.indexOf(post), 1)
    }
}

export const actions = {
    async getPosts({ commit }) {
        const { data } = await axios.get('https://api.limelightvisions.com/posts')
        commit('set', data);
    }
}
