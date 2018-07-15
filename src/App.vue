<template lang="pug">
  #app
    FormProgress(:step="progressStep")
    .content
      FormCreate(v-if="progressStep === 1", :account-data="accountData", @submitted="accountSubmitted")
      FormGeneral(v-else-if="progressStep === 2", :general-data="generalData", @submitted="generalSubmitted")
      p(v-else) Step: {{ progressStep }}
        br
        br
        | In development...
        button.btn(@click="progressStep--") back
</template>

<script>
import FormProgress from './components/FormProgress.vue'
import FormCreate from './components/FormCreate.vue'
import FormGeneral from './components/FormGeneral.vue'

export default {
  name: 'app',
  components: {
    FormProgress,
    FormCreate,
    FormGeneral
  },
  data () {
    return {
      progressStep: 1,
      accountData: {
        account: '',
        password: ''
      },
      generalData: {
        name: '',
        phone: '',
        birth: {
          year: '',
          month: '',
          day: ''
        },
        address: {
          city: '',
          dist: '',
          detail: ''
        }
      }
    }
  },
  methods: {
    accountSubmitted (val) {
      this.accountData = val
      this.progressStep++
    },
    generalSubmitted (val) {
      this.generalData = val
      this.progressStep++
    }
  }
}
</script>

<style src="normalize.css/normalize.css"></style>
<style lang="scss" src="@/assets/scss/all.scss"></style>
