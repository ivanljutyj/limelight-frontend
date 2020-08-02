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
        <a class="button" target="_blank" v-for="link in links" v-if="link.url" :href="link.url">{{ link.provider }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import gsap from 'gsap';

  export default {
    async asyncData(context) {
      let release = context.payload ?
        context.payload :
        await context.app.$axios.$get('https://api.limelightvisions.com/releases?slug=' + context.params.release);

      release = release[0];
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

      return { artist: artist, release: release, links: release.providers }
    },
    head() {
      return {
        title: 'Release | ' + this.artist + ' - ' + this.release.title,
        meta: [
          { hid: 'description', name: 'description', content: 'Stream the single: ' + this.artist + ' - ' + this.release.title },
          { hid: 'og:description', property: 'og:description', content: 'Listen to "' + this.artist + ' - ' + this.release.title + '" now on your favorite streaming service.' },
          { hid: 'og:title', property: 'og:title', content: this.artist + ' - ' + this.release.title },
          { hid: 'og:image', property: 'og:image', content: this.release.cover_url },
          { hid: 'og:url', property: 'og:url', content: 'https://limelightvisions.com' + this.$route.path },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
          { hid: 'twitter:site', name: 'twitter:site', content: '@limelightvisions' },
          { hid: 'twitter:creator', name: 'twitter:creator', content: '@iambillybad' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
      }
    },
    data: () => ({
      timeline: gsap.timeline({ paused: true }),
      url: '',
    }),
    updated() {
      this.timeline.staggerTo('.content__listen .button', 0.5, { opacity: 1 }, 0.2);
      this.timeline.play();
    },
    mounted() {
      this.timeline.to('.content__title', 1, { opacity: 1}, 0.8);
      this.timeline.to('.content__cover', 0.5, { opacity: 1, rotationY: 0 }, "-=1");

      this.url = this.release.cover_url
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
