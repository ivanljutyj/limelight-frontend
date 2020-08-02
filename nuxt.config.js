require('dotenv').config()
import axios from 'axios'

export default {
  mode: 'universal',
  loading: {
    color: 'red',
    height: '5px'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Limelight Visions',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Limelight Visions is an independent music label based out of Atlanta, GA' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://js.stripe.com/v3' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/main.scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
	  // { src: '~plugins/vue-scrollmagic.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
  	'nuxt-webfontloader',
  ],
  /*
  ** Google analytics tracking
  */
  googleAnalytics: {
    id: 'UA-169274818-1'
  },
  /*
  ** Web font loader
  */
  webfontloader: {
    google: {
		families: [
			"Muli:400,800"
		],
    },
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://api.limelightvisions.com'
  },
  /*
  ** Style resources
  */
  styleResources: {
    scss: [
      '~/assets/scss/*/*.scss',
    ],
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    routes() {
      Object.defineProperty(Array.prototype, 'flat', {
        value: function(depth = 1) {
          return this.reduce(function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
          }, []);
        }
      });

      let releases = axios.get('https://api.limelightvisions.com/releases').then((res) => {
        return res.data.map((release) => {
           return { route: '/releases/' + release.slug, payload: release }
        })
      })
      let artists = axios.get('https://api.limelightvisions.com/artists').then((res) => {
        return res.data.map((artist) => {
           return { route: '/artist/' + artist.slug, payload: artist }
        })
      })
      let posts = axios.get('https://api.limelightvisions.com/posts').then((res) => {
          return { route: '/', payload: res.data }
      })
      return Promise.all([releases, artists, posts]).then(values => {
        return values.flat(1).map(value => {
          return value;
        });
      })
    }
  }
}
