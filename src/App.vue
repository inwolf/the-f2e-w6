<template lang="pug">
  #app
    FormProgress(:step="progressStep")
</template>

<script>
import FormProgress from './components/FormProgress.vue'

export default {
  name: 'app',
  components: {
    FormProgress
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
