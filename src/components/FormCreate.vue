<template lang="pug">
  .form-create
    .form-title.text-center
      h1.title Create Account
      h2.subtitle Glad to see you here!
    form.form(@submit.prevent="submit")
      .form-group
        label Account
        input.form-control(type="email", placeholder="example@email.com", tabindex="1")
      .form-group
        label Password
        input.form-control(type="password", placeholder="••••••••", tabindex="2")
      .form-group
        label Confirm Password
        input.form-control(type="password", placeholder="••••••••", tabindex="3")
      button.btn(type="submit", tabindex="4") SUBMIT & NEXT
</template>

<script>
export default {
  methods: {
    submit () {
      alert('submitted')
    }
  }
}
</script>
