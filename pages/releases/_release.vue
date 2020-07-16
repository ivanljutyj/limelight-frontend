<template>
  <div class="content">
    <div class="content__title">
       {{ artist }} - {{ release.title }}
    </div>
    <div class="content__body">
      <div class="content__cover">
        <img id="cover" :src="url">
      </div>
      <div class="content__listen">
        <a class="button" target="_blank" v-for="link in links" v-if="link.url" :href="link.url">{{ link.displayName }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import gsap from 'gsap';
  import { mapState } from 'vuex';

  export default {
    asyncData(context) {
      context.store.commit('releases/get', context.params.release);
      const release = context.store.state.releases.release;
      const artist = release.artist[0].name;
      context.app.head.title = 'Release | ' + artist + ' - ' + release.title;
      context.app.head.meta = [
          { hid: 'description', name: 'description', content: 'Stream the single: ' + artist + ' - ' + release.title },
          { hid: 'og:description', property: 'og:description', content: 'Listen to "' + artist + ' - ' + release.title + '" now on your favorite streaming service.' },
          { hid: 'og:title', property: 'og:title', content: artist + ' - ' + release.title },
          { hid: 'og:image', property: 'og:image', content: release.cover_url },
          { hid: 'og:url', property: 'og:url', content: 'https://limelightvisions.com' + context.route.path },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
          { hid: 'twitter:site', name: 'twitter:site', content: '@limelightvisions' },
          { hid: 'twitter:creator', name: 'twitter:creator', content: '@iambillybad' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    data: () => ({
      timeline: gsap.timeline({ paused: true }),
      url: '',
      artist: ''
    }),
    updated() {
      this.timeline.staggerTo('.content__listen .button', 0.5, { opacity: 1 }, 0.2);
      this.timeline.play();
    },
    mounted() {
      this.timeline.to('.content__title', 1, { opacity: 1}, 0.8);
      this.timeline.to('.content__cover', 0.5, { opacity: 1, rotationY: 0 }, "-=1");

      this.url = this.release.cover_url
      this.artist = this.release.artist[0].name;
    },
    fetch({ store, params }) {
      store.commit('releases/get', params.release);

      const release = store.state.releases.release;
      store.dispatch('releases/getLinks', release);
    },
    computed: {
      ...mapState({ release: state => state.releases.release, links: state => state.releases.links })
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    &__listen {
      overflow: auto;
      a {
        opacity: 0;
      }
    }
    &__listen {
      max-width: 500px;
      width: 100%;
    }
    &__cover {
      opacity: 0;
      transform: rotateY(-180deg);
      margin-bottom: 20px;

      img {
        max-width: 500px;
        width: 100%;
      }
    }
  }
</style>
