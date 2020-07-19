<template>
  <div class="content">
    <nuxt-link :to="url">
      <img id="cover" :src="release.cover_url"/>
      <nuxt-link :to="url" class="button">View Release</nuxt-link>
    </nuxt-link>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapState } from 'vuex';

export default {
  head () {
    return {
      title: "Limelight Visions",
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data: () => ({
    release: {},
    url: ''
  }),
  computed: {
    ...mapState({
      releases: state => state.releases.releases
    })
  },
  mounted() {
    const timeline = gsap.timeline({ paused: true });
    timeline.to('.content img', 0.5, { opacity: 1, rotationY: 0 });
    timeline.staggerTo('.content .button', 0.5, { opacity: 1 }, 0.3);

    this.release = this.releases[this.releases.length - 1];
    this.url = '/releases/' + this.release.slug;

    document.getElementById('cover').onload = () => timeline.play();
  }
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

