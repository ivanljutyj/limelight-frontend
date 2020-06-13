<template>
  <div class="container">
    <header-component />
    <nuxt class="app"/>
    <div class="black-bg"></div>
    <div class="white-bg"></div>
  </div>
</template>

<script>
  import HeaderComponent from '~/components/Header.vue';
  import { TimelineMax } from 'gsap';

  export default {
    data: () => ({
      timeline: new TimelineMax()
    }),
    components: {
      HeaderComponent
    },
    mounted() {
      this.timeline.to('.white-bg', 0.8, { height: "100%" })
      this.timeline.staggerTo('.white-bg', 0.3, { width: "calc(100% - 300px)" }, 0.3)
      this.timeline.fromTo('.sidebar', { opacity: 0 }, { opacity: 1, ease: Linear.easeInOut })
      this.timeline.fromTo('.app', { opacity: 0 }, { opacity: 1, ease: Linear.easeInOut })
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
</style>
