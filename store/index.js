export const actions = {
    async nuxtServerInit({ dispatch }) {
      await dispatch('releases/nuxtServerInit')
      await dispatch('artists/nuxtServerInit')
      await dispatch('posts/nuxtServerInit')
    }
  }
