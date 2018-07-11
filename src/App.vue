<template lang="pug">
  #app
    FormProgress(:step="progressStep")
    .content
      FormCreate(v-if="progressStep === 1", :account-data="accountData", @submitted="accountSubmitted")
      p(v-else) Step: {{ progressStep }}
        button.btn(@click="progressStep--") back
</template>

<script>
import FormProgress from './components/FormProgress.vue'
import FormCreate from './components/FormCreate.vue'

export default {
  name: 'app',
  components: {
    FormProgress,
    FormCreate
  },
  data () {
    return {
      progressStep: 1,
      accountData: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    accountSubmitted (val) {
      this.accountData = val
      this.progressStep++
    }
  }
}
</script>

<style src="normalize.css/normalize.css"></style>
<style lang="scss" src="@/assets/scss/all.scss"></style>
