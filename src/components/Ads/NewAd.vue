<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary">Create new ad</h1>
        <v-form v-model="valid" ref="form" validation>
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            required
            :rules="[v => !!v || 'Item is required']"
            v-model="title"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            :rules="[v => !!v || 'Item is required']"
            v-model="description"
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn class="error ml-0">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img src="" height="100px">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
              label="Add to promo"
              v-model="promo"
            >
            </v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              class="success ml-0"
              @click="createAdd"
            >
              Create ad
            </v-btn>
            <v-btn
              flat
              depressed
              color="error"
              @click="reset"
            >
              Reset Form
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false
    }
  },
  methods: {
    createAdd () {
      if (this.$refs.form.validate()) {
        let ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imageSrc: 'https://cdn-images-1.medium.com/max/1200/1*-PlqbnwqjqJi_EVmrhmuDQ.jpeg'
        }
        this.$store.dispatch('createAd', ad)
      } else {
        console.log('validation error')
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

</style>
