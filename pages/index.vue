<template>
  <div class="content">
    <nuxt-link :to="url">
      <img :src="cover"/>
    </nuxt-link>
  </div>
</template>

<script>
import { TimelineMax } from 'gsap';

export default {
  data: () => ({
    release: {},
    url: '',
    cover: '',
    timeline: new TimelineMax()
  }),
  mounted() {
    this.$axios.$get('/releases').then(response => {
      this.release = response[response.length - 1];
      this.url = '/releases/' + this.release.slug
      this.cover = this.$axios.defaults.baseURL + this.release.cover.url;
      this.timeline.to('.content img', 0.5, { opacity: 1, rotationY: 0 })
    })
  },
}
</script>

<style lang="scss" scoped>
  .content {
    img {
      opacity: 0;
      max-width: 500px;
      width: 100%;
      transform: rotateY(-180deg);
    }
  }
</style>

