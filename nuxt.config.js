require('dotenv').config()
import axios from 'axios'

export default {
  mode: 'universal',
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
  loading: true,
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
      let releases = axios.get('https://api.limelightvisions.com/releases', {params: {size: 10}}).then((res) => {
        return res.data.releases.map((post) => {
          return '/releases/' + release.id
        })
      })
      let artists = axios.get('https://api.limelightvisions.com/artists', {params: {size: 10}}).then((res) => {
        return res.data.content.map((artist) => {
          return '/artists/' + artist.id
        })
      })
      return Promise.all([releases, artists]).then(values => {
        return values.join().split(',');
      })
    }
  }
}
