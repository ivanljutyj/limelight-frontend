<template>
  <div class="content">
    <div class="content__title">
      {{ content.title }}
    </div>
    <div class="content__body">
      {{ content.body }}
    </div>
    <div class="content__buttons">
      <a class="button" :href="button.link" target="_blank" v-for="button in buttons">{{ button.title }}</a>
    </div>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";

export default {
  head () {
    return {
      title: "Limelight Visions - Contact",
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data: () => ({
    contact: {},
    content: {},
    buttons: [],
    timeline: new TimelineMax()
  }),
  beforeMount() {
    this.$axios.$get('/contact').then(result => this.contact = result.contact);
  },
  watch: {
    contact() {
      this.content = this.getContent();
      this.getButtons();
    }
  },
  mounted() {
    this.timeline.staggerTo('.content__title', 1, { opacity: 1 }, 0.8);
    this.timeline.staggerTo('.content__subtitle', 1, { opacity: 1 }, 0.8);
  },
  updated() {
    this.timeline.staggerTo('.content .button', 0.3, { opacity: 1, ease: Linear.easeInOut }, 0.3, "-=1");
  },
  methods: {
    getContent() {
      for (let component in this.contact) {
        if (this.contact[component]['__component'] === 'page.content') {
          return this.contact[component];
        }
      }
    },
    getButtons() {
      for (let component in this.contact) {
        if (this.contact[component]['__component'] === 'page.button') {
          this.buttons.push(this.contact[component]);
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .button {
    opacity: 0;
  }
</style>
