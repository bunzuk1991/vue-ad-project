import store from '../store'

console.log(store.getters.user)

export default function (to, from, next) {
  if (store.getters.user) {
    next()
  } else {
    next('login?loginError=true')
  }
}
