<template>
  <div>
    <div class="sidebar">
      <div class="sidebar__logo">
        <nuxt-link to="/">
          <img src="/logo.png"/>
        </nuxt-link>
      </div>
      <div class="sidebar__menu">
        <ul>
          <li @mouseenter="releaseMenuOpen = true" @mouseleave="releaseMenuOpen = false" class="sidebar__item">
            Releases
            <ul>
              <li v-for="release in releases" class="release sidebar__submenu">
                <nuxt-link :to="'/releases/' + release.slug">{{ release.title }}</nuxt-link>
              </li>
            </ul>
          </li>
          <li @mouseenter="artistMenuOpen = true" @mouseleave="artistMenuOpen = false" class="sidebar__item">
            Artists
            <ul>
              <li v-for="artist in artists" class="artist sidebar__submenu">
                <nuxt-link :to="'/artists/' + artist.slug">{{ artist.name }}</nuxt-link>
              </li>
            </ul>
          </li>
          <li><nuxt-link to="/contact">Contact</nuxt-link></li>
        </ul>
      </div>
    </div>
    <div class="header">
      <div class="top">
        <nuxt-link to="/">
          <div class="header__logo">
            <img src="/logo.png"/>
          </div>
        </nuxt-link>
        <div class="header__hamburger">
          <button class="menu" type="button" v-bind:class="{ active: menuOpen }" @click="menuOpen = !menuOpen">
            <span class="bar"></span>
          </button>
        </div>
      </div>
      <div class="bottom">
        <div class="header__menu">
          <ul>
            <li>Releases</li>
            <li v-for="release in releases" class="header__submenu">
              <nuxt-link :to="'/releases/' + release.slug">{{ release.title }}</nuxt-link>
            </li>
            <li>Artists</li>
            <li v-for="artist in artists" class="header__submenu">
              <nuxt-link :to="'/artists/' + artist.slug">{{ artist.name }}</nuxt-link>
            </li>
            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import gsap from 'gsap';
  import { mapState } from 'vuex';

  export default {
    data: () => ({
      menuOpen: false,
      releaseMenuOpen: false,
      releaseMenu: gsap.timeline({ paused: true }),
      artistMenuOpen: false,
      artistMenu: gsap.timeline({ paused: true }),
      timeline: gsap.timeline({ paused: true }),
      sidebar: gsap.timeline(),
      artists: [
        { slug: 'beat-burner', name: 'beat burner'},
        { slug: 'billy-bad', name: 'billy bad'}
      ],
      releases: [
        { slug: 'born-star', title: 'born star'},
        { slug: 'ffmd', title: 'ffmd'},
        { slug: 'still-alive', title: 'still alive'}
      ]
    }),
    mounted() {
      this.timeline.to('.header', 0.8, { height: '100vh' });

      this.sidebar.to('.sidebar__logo img', 1, { opacity: 1, top: "20px" })
      this.sidebar.staggerTo('.sidebar ul li', 0.2, { opacity: 1 }, 0.2, "-=0.5")
    },
    updated() {
      this.timeline.staggerTo('.header__menu ul li:not(.header__submenu)', 0.3, { opacity: 1 }, 0.1, '-=0.8');
      this.timeline.staggerTo('.header__menu ul .header__submenu', 0.3, { opacity: 1, display: 'block' }, 0.2, '-=0.5');

      this.sidebar.staggerTo('.sidebar__menu ul li:not(.sidebar__submenu)', 0.3, { opacity: 1 }, 0.1, '-=0.8');
    },
    watch: {
      $route() {
        if (this.menuOpen) {
          this.menuOpen = !this.menuOpen;
        }
      },
      menuOpen(opened) {
        if (opened) {
          this.timeline.timeScale(1).play();
        } else {
          this.timeline.timeScale(6).reverse(0);
        }
      },
      artistMenuOpen(opened) {
        this.artistMenu.staggerTo('.artist.sidebar__submenu', 0.3, { opacity: 1, display: 'block' }, 0.2, '-=0.5');
        if (opened) {
          this.artistMenu.play(0);
        } else {
          this.artistMenu.reverse(0);
        }
      },
      releaseMenuOpen(opened) {
        this.releaseMenu.staggerTo('.release.sidebar__submenu', 0.3, { opacity: 1, display: 'block' }, 0.2, '-=0.5');
        if (opened) {
          this.releaseMenu.play(0);
        } else {
          this.releaseMenu.reverse(0);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    position: absolute;
    font-size: 12px;
    text-transform: uppercase;
    padding: 20px;
    letter-spacing: 1px;
    color: #fff;
    @include mq($until: desktop) {
      display: none;
    }
    &__item {
      cursor: not-allowed;
      &:hover {
        color: $text-color;
      }
    }
    &__logo {
      img {
        position: absolute;
        left: 20px;
        top: 0;
        opacity: 0;
        width: 250px;
      }
    }
    &__menu {
      margin-top: 150px;
      ul li {
        opacity: 0;
      }
    }
    &__submenu {
      text-transform: lowercase;
      display: none;
      opacity: 0;
    }
    ul {
      ul {
        margin-left: 0;
        margin-top: 15px;
        padding: 0;
      }
      li {
        /*opacity: 0;*/
        padding: 10px 0;
      }
      list-style: none;
      margin-left: 20px;
      padding: 0;
    }
  }
  .header {
    @include mq($from: desktop) {
      display: none;
    }
    .top {
      display: flex;
      align-items: center;
      align-content: center;
      min-height: 175px;
    }
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    min-width: 100%;
    z-index: 1;
    overflow: hidden;
    height: 175px;
    background-color: #2F2F2F;
    padding: 0 20px;
    -webkit-box-shadow: 0px 10px 25px 0px rgba(47,47,47,0.5);
    -moz-box-shadow: 0px 10px 25px 0px rgba(47,47,47,0.5);
    box-shadow: 0px 10px 25px 0px rgba(47,47,47,0.5);
    img {
      width: 275px;
    }
    &__hamburger {
      position: absolute;
      right: 20px;
      top: 20px;
    }
    &__menu {
      color: #fff;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 11px;
      margin-top: 20px;

      .header__submenu {
        opacity: 0;
        margin-left: 20px;
        display: none;
        a {
          text-transform: lowercase;
        }
      }
      ul {
        li {
          opacity: 0;
          padding: 10px 0;
        }
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
  }
  .menu {
    transition: 0.1s transform linear;
    position: relative;
    background: 0;
    float: left;
    height: 2.7rem;
    width: 2rem;
    z-index: 1;
    outline: 0;
    padding: 0;
    border: 0;
    cursor: pointer;
  }
  .bar {
    &, &::before, &::after {
      transition: 0.2s background linear 0.1s, 0.2s top linear 0.2s, 0.2s transform linear;
      position: absolute;
      background: #fff;
      margin: auto;
      width: 100%;
      height: 2px;
      content: '';
      top: 50%;
      left: 0;
    }
    & {
      margin-top: -0.1rem
    }

    &::before {
      top: -0.6rem;
    }

    &::after {
      top: 0.6rem;
    }

    &::before,
    &::after {
      transform: rotate(0deg);
    }
    .active & {
      background: 0;

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }

      &::before,
      &::after {
        top: 0;
      }

      &,
      &::before,
      &::after {
        transition: 0.2s background linear 0.1s, 0.2s top linear, 0.2s transform linear 0.2s;
      }
    }
  }
</style>

