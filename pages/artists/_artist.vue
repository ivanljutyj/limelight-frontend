<template>
  <div class="content">
    <div class="content__title">{{ artist.name }}</div>
    <div class="content__subtitle">
      <ul>
        <li>Real name: {{ artist.real_name }}</li>
        <li>Location: {{ artist.location }}</li>
      </ul>
    </div>
    <div class="content__body">
      <div class="artist">
        <div class="artist__avatar">
          <img :src="artist.avatar_url"/>
        </div>
        <div class="artist__bio">
          {{ artist.bio }}
        </div>
      </div>
      <div class="artist__links">
        <a class="button" v-for="link in artist.buttons" :href="link.link" target="_blank">{{ link.title }}</a>
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
        title: 'Artist | ' + this.artist.name,
        meta: [
          { hid: 'description', name: 'description', content: '' },
          { hid: 'og:title', property: 'og:title', content: this.artist.name },
          { hid: 'og:image', property: 'og:image', content: this.avatar }
        ]
      }
    },
    data() {
      return {
        timeline: gsap.timeline()
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
    fetch({ store, params }) {
      store.commit('artists/get', params.artist);
    },
    computed: {
      ...mapState({
        artist: state => state.artists.artist
      })
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
