<template>
  <v-dialog
    width="400px"
    v-model="modal"
  >
    <v-btn class="primary mr-3" flat slot="activator">Buy</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Do you want to buy?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout role="">
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                label="Your name"
                type="text"
                :rules="[v => !v]"
                v-model="name"
              ></v-text-field>
              <v-text-field
                name="phone"
                label="Your phone"
                type="text"
                :rules="[v => !v]"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="info"
                flat
                @click="onCancel"
                :desabled="localLoading"
              >Close</v-btn>
              <v-btn
                class="success"
                flat
                @click="onSave"
                :desabled="localLoading"
                :loading="localLoading"
              >Buy it!</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  name: 'BuyModal',
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.modal = false
      this.name = ''
      this.phone = ''
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        }).finally(() => {
          this.name = ''
          this.phone = ''
          this.localLoading = false
          this.modal = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
