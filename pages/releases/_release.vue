<template>
  <div class="content">
    <div class="content__title">
       {{ artist }} - {{ release.title }}
    </div>
    <div class="content__body">
      <div class="content__cover">
        <img :src="url">
      </div>
      <div class="content__listen">
        <a class="button" target="_blank" v-for="link in links" v-if="link.url" :href="link.url">{{ link.displayName }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { TimelineMax } from 'gsap';
  export default {
    data: () => ({
      release: {},
      timeline: new TimelineMax(),
      url: '',
      artist: '',
      links: {
        'AUTOMATED_LINK::spotify': { url: '' }
      }
    }),
    watch: {
      release(value) {
        this.getStreamingLinks()
        this.url = this.$axios.defaults.baseURL + value.cover.url
        this.artist = value.artist[0].name;
      },
    },
    updated() {
      this.timeline.staggerTo('.content__listen .button', 0.5, { opacity: 1 }, 0.2);
    },
    mounted() {
      this.timeline.staggerTo('.content__title', 1, {opacity: 1}, 0.8);
      this.timeline.staggerTo('.content__subtitle', 1, {opacity: 1}, 0.8);
      this.timeline.staggerTo('.content__cover', 0.5, { opacity: 1, rotationY: 0 });

      this.$axios.$get('releases').then(response => {
        response.filter((a) => {
          if (a.slug === this.$route.params.release) {
            this.release = a;
          }
        })
      });
    },
    methods: {
      async getStreamingLinks() {
        const url = "https://cors-anywhere.herokuapp.com/https://api.song.link";
        await this.$axios({ url: '/page?url=' + encodeURIComponent(this.release.songlink), baseURL: url })
          .then(response => this.links = response.data.nodesByUniqueId)
          .catch(error => console.log(error.response.data));
      }
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
