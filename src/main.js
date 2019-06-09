import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disabled no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
