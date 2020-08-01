<template>
  <div class="content">
    <div class="posts">
      <div class="post" v-for="post in posts">
        <div class="post__group">
          <div class="post__title">{{ post.title }}</div>
          <div class="post__subtitle">{{ post.subtitle }}</div>
        </div>
        <div class="post__group" v-if="post.embed">
          <div class="post__embed">
            <iframe :src='post.embed' frameborder='0' allowfullscreen></iframe>
          </div>
        </div>
        <div class="post__group" v-if="post.content">
          <div class="post__content" v-html="post.content"></div>
        </div>
        <div class="post__group" v-if="post.release">
          <div class="post__release">
            <nuxt-link :to="'/releases/' + post.release.slug"><button class="button">Stream "{{ post.release.title.toUpperCase() }}"</button></nuxt-link>
          </div>
        </div>
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
      title: "Limelight Visions",
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.list
    })
  },
  mounted() {
    const timeline = gsap.timeline({ paused: true });
    // timeline.to('.content img', 0.5, { opacity: 1, rotationY: 0 });
    timeline.staggerTo('.post__group', 0.5, { opacity: 1 }, 0.3);

    timeline.play();
  }
}
</script>

<style lang="scss" >
  .posts {
    .post {
      margin-bottom: 25px;
      &__group {
        margin-bottom: 20px;
        opacity: 0;
      }
      &__title {
        text-transform: uppercase;
      }
      &__embed {
        position: relative;
        overflow: hidden;
        padding-bottom: 350px;
        height: 0;
        max-width: 100%;
        iframe, embed, object {
          left: 0;
          top: 0;
          height: 100%;
          max-height: 350px;
          width: 100%;
          max-width: 500px;
          position: absolute;
        }
      }
    }
    img {
      opacity: 0;
      max-width: 500px;
      margin-bottom: 20px;
      width: 100%;
      transform: rotateY(-180deg);
    }
    .button {
      cursor: pointer;
      letter-spacing: 1px;
      max-width: 500px;
      width: 100%;
    }
  }
</style>

