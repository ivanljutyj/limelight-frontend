<template>
  <div class="content">
    <div class="content__title">{{ currentArtist.name }}</div>
    <div class="content__subtitle">
      <ul>
        <li>Real name: {{ currentArtist.real_name }}</li>
        <li>Location: {{ currentArtist.location }}</li>
      </ul>
    </div>
    <div class="content__body">
      <div class="artist">
        <div class="artist__avatar">
          <img :src="avatar"/>
        </div>
        <div class="artist__bio">
          {{ currentArtist.bio }}
        </div>
      </div>
      <div class="artist__links">
        <a class="button" v-for="link in currentArtist.buttons" :href="link.link" target="_blank">{{ link.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { TimelineMax, TweenMax } from 'gsap';
  export default {
    head () {
      return {
        title: 'Artist | ' + this.currentArtist.name,
        meta: [
          { hid: 'description', name: 'description', content: '' },
          { hid: 'og:title', property: 'og:title', content: this.currentArtist.name },
          { hid: 'og:image', property: 'og:image', content: this.avatar }
        ]
      }
    },
    data() {
      return {
        currentArtist: [],
        avatar: "",
        links: "",
        timeline: new TimelineMax()
      }
    },
    mounted() {
      this.timeline.to('.content__title', 0.5, { opacity: 1 });
      this.timeline.to('.content__subtitle', 0.5, { opacity: 1 });

      this.timeline.to('.artist__bio', 0.5, { opacity: 1 });
      this.timeline.to('.artist__avatar', 0.5, { opacity: 1, rotationY: 0 } );
    },
    updated() {
      this.timeline.staggerTo('.artist__links .button', 0.5, { opacity: 1 }, 0.5);
    },
    beforeMount() {
      this.getArtists();
    },
    methods: {
      async getArtists() {
        let result = await this.$axios.$get('/artists');
        let artists = result || [];
        for (let i in artists) {
          if (artists[i].slug === this.$route.params.artist) {
            this.currentArtist = artists[i];
            this.avatar = this.currentArtist.avatar_url;
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .artist__links {
    .button {
      max-width: 500px;
      opacity: 0;
    }
  }
  .artist {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &__bio {
      opacity: 0;
      flex: 1;
      margin-bottom: 20px;
    }
    &__avatar {
      margin-right: 20px;
      margin-bottom: 20px;
      opacity: 0;
      transform: rotateY(-180deg);
      img {
        max-width: 500px;
        width: 100%;
        filter: grayscale(100%)
      }
    }
  }
</style>
