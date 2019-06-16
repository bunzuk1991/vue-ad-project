<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-card-media
            :src="ad.imageSrc"
            height="300px">
          </v-card-media>
          <v-card-text>
            <h1 class="text--primary">{{ ad.title }}</h1>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-modal :ad="ad" v-if="isOwner"></app-edit-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="pt-5">
          <v-layout row>
            <v-flex xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                :size="120"
                :width="10"
                color="purple"
              >
              </v-progress-circular>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAd from './EditAdModal'
export default {
  props: ['id'],
  components: {
    appEditModal: EditAd
  },
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.ad.ownerId === this.$store.getters.user.id
    }
  }
}
</script>

<style scoped>

</style>
