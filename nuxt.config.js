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
  	'nuxt-webfontloader',
  ],
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
    routes(callback) {
       axios.get('https://api.limelightvisions.com/artists').then((response) => {
        const items = response.data.map((a) => {
            return '/artists/' + a.slug;
        });

        response.data.forEach((a) => {
          if (a.releases.length) {
            a.releases.forEach((b) => {
              items.push('/releases/' + b.slug)
            });
          }
        })

        callback(null, items)
      })
     .catch(callback)
    }

  }
}
