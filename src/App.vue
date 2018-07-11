<template lang="pug">
  #app
    FormProgress(:step="progressStep")
    .content
      FormCreate(v-if="progressStep === 1")
      p(v-else) Else step: {{ progressStep }}
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
      progressStep: 1
    }
  }
}
</script>

<style src="normalize.css/normalize.css"></style>
<style lang="scss" src="@/assets/scss/all.scss"></style>
