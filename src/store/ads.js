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
    ads: [
      {
        title: 'First add',
        description: 'Hello i am description',
        promo: false,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        id: '1'
      },
      {
        title: 'Second add',
        description: 'Hello i am description',
        promo: true,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id: '2'
      },
      {
        title: 'Third add',
        description: 'Hello i am description',
        promo: true,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        id: '3'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
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
        console.log(fbValue)
      } catch (error) {
        commit('setError', error.mean)
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
