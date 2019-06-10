export default {
  state: {
    loading: false,
    error: null,
    links: [
      { title: 'Login', icon: 'lock', url: '/login', auth: false },
      { title: 'Registration', icon: 'face', url: '/registration', auth: false },
      { title: 'Orders', icon: 'bookmark_border', url: '/orders', auth: true },
      { title: 'New ad', icon: 'note_add', url: '/new', auth: true },
      { title: 'My ads', icon: 'list', url: '/list', auth: true }
    ]
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    links (state) {
      return Auth => state.links.filter(link => link.auth === Auth)
    }
  }
}
