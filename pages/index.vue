<template>
  <div class="content">
    <nuxt-link :to="url">
      <img id="cover" :src="cover"/>
      <nuxt-link :to="url" class="button">View Release</nuxt-link>
    </nuxt-link>
  </div>
</template>

<script>
import { TimelineMax } from 'gsap';

export default {
  asyncData(ctx) {
    ctx.seo({
      name: 'Limelight Visions',
      title: 'Home',
      templateTitle: '%name% - %title%',
      description: 'An independent music label based out of Atlanta, GA'
    })
  },
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
      let cover = document.getElementById('cover');
      cover.onload =  () => {
        this.timeline.to('.content img', 0.5, { opacity: 1, rotationY: 0 })
        this.timeline.staggerTo('.content .button', 0.5, { opacity: 1 }, 0.3)
      }
    })
  },
}
</script>

<style lang="scss" scoped>
  .content {
    img {
      opacity: 0;
      max-width: 500px;
      margin-bottom: 20px;
      width: 100%;
      transform: rotateY(-180deg);
    }
    .button {
      max-width: 500px;
      opacity: 0;
      width: 100%;
    }
  }
</style>

