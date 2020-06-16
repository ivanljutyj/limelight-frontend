<template>
  <div class="container">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-169274818-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-169274818-1');
    </script>

    <header-component v-if="loaded" />
    <nuxt v-if="loaded"/>

    <div class="black-bg"></div>
    <div class="white-bg"></div>
    <div class="watermark">
      <img src="https://ivanon.io/logo.png">
      <div class="watermark__content">
        Designed and developed by <a href="https://ivanon.io">ivanon.io</a>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderComponent from '~/components/Header.vue';
  import gsap from 'gsap';

  export default {
    data: () => ({
      timeline: gsap.timeline(),
      loaded: false
    }),
    components: {
      HeaderComponent
    },
    mounted() {
      this.timeline.to('.white-bg', 0.8, { height: "100%" })
      this.timeline.to('.white-bg', 0.5, { width: "calc(100% - 300px)" })
      this.timeline.add(() => { this.loaded = !this.loaded })


      const watermark = document.querySelector('.watermark');
      const watermarkTimeline = gsap.timeline({ paused: true });
      watermarkTimeline.to('.watermark__content', 1, { opacity: 1 });
      watermarkTimeline.to('.watermark img', 1, { filter: "grayscale(0%)"}, "-=1");
      watermark.addEventListener('mouseover', function() {
        watermarkTimeline.play();
      });
      watermark.addEventListener('mouseout', function() {
        watermarkTimeline.timeScale(2).reverse(0);
      });
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    opacity: 0;
  }
  .black-bg {
    @include mq($until: desktop) {
      display: none;
    }
    position: fixed;
    top: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    background-color: #000;
  }
  .white-bg {
    @include mq($until: desktop) {
      display: none;
    }
    z-index: -1;
    width: 300px;
    height: 0;
    position: fixed;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
  .watermark {
    display: flex;
    cursor: pointer;
    position: absolute;
    bottom: 15px;
    left: 20px;
    &__content {
      opacity: 0;
      flex: 1;
      color: #505050;
      line-height: 25px;
      margin-left: 8px;
      font-size: 11px;
    }
    img {
      opacity: 0.5;
      filter: grayscale(100%);
      width: 25px;
    }
  }
</style>
