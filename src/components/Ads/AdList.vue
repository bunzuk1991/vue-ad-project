<template>
  <v-container grid-list-md>
    <h1 class="text--secondary mb-3">Ad list component</h1>
    <v-layout row wrap v-if="!loading && myAds.length !== 0">
      <v-flex
        xs12
        sm6
        md6
        v-for="ad in myAds"
        :key="ad.id"
      >
        <v-card
          class="elevation-10 mb-5"
        >
          <v-layout row>
            <v-flex xs4>
              <v-card-media
                :src="ad.imageSrc"
                height="165px"
              ></v-card-media>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="`/ad/${ad.id}`">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else-if="!loading && myAds.length === 0">
      <v-flex
        xs12
        class="text-xs-center"
      >
        <h1 class="text--primary">You have no ads</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
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
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'myAds',
      'loading'
    ])
  }
}
</script>

<style scoped>

</style>
