import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import firebaseConfig from './firebase'
import fb from 'firebase'
import BuyModal from '@/components/shared/BuyModal'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken4
  }
})
Vue.component('app-buy-modal', BuyModal)

Vue.config.productionTip = false
fb.initializeApp(firebaseConfig)
/* eslint-disabled no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    fb.auth().onAuthStateChanged(autoUser => {
      if (autoUser) {
        this.$store.dispatch('autoLoginUser', autoUser)
      }
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
