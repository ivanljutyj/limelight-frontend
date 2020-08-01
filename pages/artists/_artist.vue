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

  export default {
    asyncData(context) {
      const artist = context.payload;
      context.app.head.title = 'Artist | ' + artist.name;
      context.app.head.meta = [
          { hid: 'description', name: 'description', content: 'Learn more about ' + artist.name + '.' },
          { hid: 'og:title', property: 'og:title', content: artist.name },
          { hid: 'og:description', property: 'og:description', content: 'Learn more about ' + artist.name + '.' },
          { hid: 'og:image', property: 'og:image', content: artist.avatar_url },
          { hid: 'og:url', property: 'og:url', content: 'https://limelightvisions.com' + context.route.path },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
          { hid: 'twitter:site', name: 'twitter:site', content: '@limelightvisions' },
          { hid: 'twitter:creator', name: 'twitter:creator', content: '@iambillybad' }
      ]

      return { artist: artist }
    },
    head() {
      return {
        title: 'Artist | ' + this.artist.name,
        meta: [
          { hid: 'description', name: 'description', content: 'Learn more about ' + this.artist.name + '.' },
          { hid: 'og:title', property: 'og:title', content: this.artist.name },
          { hid: 'og:description', property: 'og:description', content: 'Learn more about ' + this.artist.name + '.' },
          { hid: 'og:image', property: 'og:image', content: this.artist.avatar_url },
          { hid: 'og:url', property: 'og:url', content: 'https://limelightvisions.com/' + this.$route.path },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
          { hid: 'twitter:site', name: 'twitter:site', content: '@limelightvisions' },
          { hid: 'twitter:creator', name: 'twitter:creator', content: '@iambillybad' }
        ]
      }
    },
    mounted() {
      const timeline = gsap.timeline();
      timeline.to('.content__title', 0.5, { opacity: 1 });
      timeline.to('.content__subtitle', 0.5, { opacity: 1 });
      timeline.to('.artist__bio', 0.5, { opacity: 1 });
      timeline.to('.artist__avatar', 0.5, { opacity: 1, rotationY: 0 } );
      timeline.staggerTo('.artist__links .button', 0.5, { opacity: 1 }, 0.5);
    },
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
