import * as fb from 'firebase'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}
export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo
        )
        const fbValue = await fb.database().ref('ads').push(newAd)

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: fbValue.key
        })
      } catch (error) {
        commit('setError', error.mean)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const resaultAds = []
      try {
        commit('clearError')
        commit('setLoading', false)

        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resaultAds.push(ad)
        })
        commit('loadAds', resaultAds)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads: state => state.ads,
    promoAds: state => state.ads.filter(ad => ad.promo),
    myAds: state => state.ads,
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
