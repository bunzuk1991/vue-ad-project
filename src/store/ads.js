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
  mutations: {},
  actions: {},
  getters: {
    ads: state => state.ads,
    promoAds: state => state.ads.filter(ad => ad.promo),
    myAds: state => state.ads
  }
}
