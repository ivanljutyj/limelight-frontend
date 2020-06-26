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
  export default {
    head () {
      return {
        title: 'Release | ' + this.artist + ' - ' + this.release.title,
        meta: [
          { hid: 'description', name: 'description', content: 'Stream the single "' + this.artist + ' - ' + this.release.title + '" here now!' },
          { hid: 'og:title', property: 'og:title', content: this.artist + ' - ' + this.release.title },
          { hid: 'og:image', property: 'og:image', content: this.url },

          { hid: 'twitter:description', property: 'twitter:description', content: 'Stream the single "' + this.artist + ' - ' + this.release.title + '" here now!'},
          { hid: 'twitter:title', property: 'twitter:title', content: this.artist + ' - ' + this.release.title },
          { hid: 'twitter:image:src', property: 'twitter:image:src', content: this.url },
        ]
      }
    },
    data: () => ({
      release: {},
      timeline: gsap.timeline(),
      url: '',
      loading: true,
      artist: '',
      links: {
        'AUTOMATED_LINK::spotify': { url: '' }
      }
    }),
    watch: {
      release(value) {
        this.getStreamingLinks()
        this.url = value.cover_url
        this.artist = value.artist[0].name;
      },
    },
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
