import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import firebaseConfig from './firebase'
import fb from 'firebase'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disabled no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp(firebaseConfig)
    fb.auth().onAuthStateChanged(autoUser => {
      if (autoUser) {
        this.$store.dispatch('autoLoginUser', autoUser)
      }
    })
  }
}).$mount('#app')
