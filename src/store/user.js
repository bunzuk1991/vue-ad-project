import * as fb from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}
export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      console.log(payload)
      state.user = payload
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const fbUser = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(fbUser.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      console.log('loginuser')
      try {
        const fbUser = await fb.auth().signInWithEmailAndPassword(email, password)
        console.log(fbUser, 'login')
        commit('setUser', new User(fbUser.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({ commit }, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({ commit }) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
