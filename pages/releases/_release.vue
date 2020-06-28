<template>
  <div class="content">
    <div class="content__title">
       {{ artist }} - {{ release.title }}
    </div>
    <div class="content__body">
      <div class="content__cover">
        <img id="cover" :src="url">
      </div>
      <div class="backdrop" v-if="loading">
        <div class="spinner"></div>
        <div class="logo">loading...</div>
      </div>
      <div class="content__listen" v-if="!loading">
        <a class="button" target="_blank" v-for="link in links" v-if="link.url" :href="link.url">{{ link.displayName }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import gsap from 'gsap';
  import { mapState } from 'vuex';

  export default {
    head () {
      return {
        title: 'Release | ' + this.artist + ' - ' + this.release.title,
        meta: [
          { hid: 'description', name: 'description', content: 'Stream the single "' + this.artist + ' - ' + this.release.title + '" here now!' },
          { hid: 'og:title', property: 'og:title', content: this.artist + ' - ' + this.release.title },
          { hid: 'og:image', property: 'og:image', content: this.url },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
          { hid: 'twitter:site', name: 'twitter:site', content: '@limelightvisions' },
          { hid: 'twitter:creator', name: 'twitter:creator', content: '@iambillybad' }
        ]
      }
    },
    data: () => ({
      timeline: gsap.timeline(),
      url: '',
      loading: true,
      artist: '',
      links: {
        'AUTOMATED_LINK::spotify': { url: '' }
      }
    }),
    updated() {
      this.timeline.staggerTo('.content__listen .button', 0.5, { opacity: 1 }, 0.2);
    },
    mounted() {
      let cover = document.getElementById('cover');
      cover.onload = () => {
        this.timeline.to('.content__title', 1, { opacity: 1}, 0.8);
        this.timeline.to('.content__subtitle', 1, { opacity: 1}, 0.8);
        this.timeline.to('.content__cover', 0.5, { opacity: 1, rotationY: 0 }, "-=1");
      };
      
      this.url = this.release.cover_url
      this.artist = this.release.artist[0].name;
      this.getStreamingLinks()
    },
    fetch({ store, params }) {
      store.commit('releases/get', params.release); 
    },
    computed: {
      ...mapState({ release: state => state.releases.release })
    },
    methods: {
      async getStreamingLinks() {
        const url = "https://cors-anywhere.herokuapp.com/https://api.song.link";
        await this.$axios({ url: '/page?url=' + encodeURIComponent(this.release.songlink), baseURL: url })
          .then(response => {
            this.loading = false;
            this.links = response.data.nodesByUniqueId;
          })
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
