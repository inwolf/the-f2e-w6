<template lang="pug">
  header.form-progress
    .progress
      .progress-step(v-for="i in 4", :key="i", :class="{active:i<=step}")
        i.far.fa-circle(v-if="i > step")
        i.far.fa-dot-circle(v-else-if="i === step")
        i.fas.fa-check-circle(v-else)
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_variables.scss';
  .form-progress {
    margin: 52px auto 40px;
  }
  .progress {
    width: 240px;
    margin: 0 auto;
    color: $color-secondary;
    font-size: 16px;
    .progress-step {
      display: inline-block;
      margin-right: -1px;
      &.active {
        color: $color-primary;
      }
      &.active::before {
        border: 1px solid $color-primary;
      }
    }
    .progress-step::before {
      content: "";
      display: inline-block;
      width: 57.5px;
      border: 1px solid $color-secondary;
      position: relative;
      top: -5px;
      z-index: -1;
    }
    .progress-step:first-child::before {
      display: none;
    }
  }
</style>
