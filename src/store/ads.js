import * as fb from 'firebase'
import uploadImage from '../plugins'

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
    },
    updateAd (state, { title, description, id }) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        const fbValue = await fb.database().ref('ads').push(newAd)
        const imageSrc = await uploadImage(image, fbValue.key)
        await fb.database().ref('ads').child(fbValue.key).update({ imageSrc })
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: fbValue.key,
          imageSrc
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
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resaultAds.push(
            new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key)
          )
        })
        commit('loadAds', resaultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({ commit }, { title, description, id }) {
      commit('clearError')
      commit('setLoading', true)
      console.log(title)
      console.log(description)
      console.log(id)
      try {
        await fb.database().ref('ads').child(id).update({ title: title, description: description })
        commit('updateAd', {
          title, description, id
        })
        commit('setLoading', false)
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
