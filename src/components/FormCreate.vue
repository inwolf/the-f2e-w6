<template lang="pug">
  .form-create
    .form-title.text-center
      h1.title Create Account
      h2.subtitle Glad to see you here!
    form.form(@submit.prevent="submit")
      .form-group(:class="{'validate-error': errors.first('account')}")
        label(for="account") Account
        input#account.form-control(type="text",
          name="account",
          placeholder="example@email.com",
          tabindex="1",
          v-model="account",
          v-validate="'required|email'")
        .error-tooltip.right(v-show="errors.first('account')") {{errors.first('account')}}
      .form-group(:class="{'validate-error': errors.first('password')}")
        label(for="password") Password
        input#password.form-control(type="password",
          name="password",
          placeholder="••••••••",
          tabindex="2",
          v-model="password",
          v-validate="'required|min:8'")
        .error-tooltip.right(v-show="errors.first('password')") {{errors.first('password')}}
      .form-group(:class="{'validate-error': errors.first('confirmPassword')}")
        label(for="confirm-password") Confirm Password
        input#confirm-password.form-control(type="password",
          name="confirmPassword",
          placeholder="••••••••",
          tabindex="3",
          v-model="confirmPassword",
          v-validate="{required:true,confirmed:password}")
        .error-tooltip.right(v-show="errors.first('confirmPassword')") {{errors.first('confirmPassword')}}
      button.btn(type="submit",
        tabindex="4",
        :disabled="errors.any()") SUBMIT & NEXT
</template>

<script>
export default {
  props: {
    accountData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      account: '',
      password: '',
      confirmPassword: ''
    }
  },
  created () {
    this.account = this.accountData.account
    this.password = this.accountData.password
  },
  methods: {
    async submit () {
      const pass = await this.$validator.validate()
      if (pass) {
        this.$emit('submitted', {
          account: this.account,
          password: this.password
        })
      }
    }
  }
}
</script>
