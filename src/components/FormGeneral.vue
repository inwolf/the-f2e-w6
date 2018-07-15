<template lang="pug">
  .form-create
    .form-title.text-center
      h1.title General Infomation
      h2.subtitle Tell us who you are!
    form.form(@submit.prevent="submit")
      .form-row
        .form-group(:class="{'validate-error': errors.first('name')}")
          label(for="name") Name
            small  (optional)
          input#name.form-control(type="text",
            name="name",
            placeholder="Example Name",
            tabindex="1",
            v-model="name",
            v-validate="'alpha_spaces'")
          .error-tooltip.left(v-show="errors.first('name')") {{errors.first('name')}}
        .form-group(:class="{'validate-error': errors.first('phone')}")
          label(for="phone") Phone*
          input#phone.form-control(type="text",
            name="phone",
            placeholder="0912 345 678",
            tabindex="2",
            v-model="phone",
            v-validate="'required|numeric|digits:10'")
          .error-tooltip.right(v-show="errors.first('phone')") {{errors.first('phone')}}
      .form-group
        label(for="birth-year") Date of Birth
          small  (optional)
        .form-row
          select#birth-year.form-control(
            name="year",
            tabindex="3",
            v-model="birth.year",
            :class="{'text-placeholder':!birth.year}")
            option(value="", disabled, selected) YYYY
            option(v-for="i in 100",
              :value="(now.year - i + 1).toString()",
              :key="i") {{ now.year - i + 1}}
          select#birth-month.form-control(
            name="month",
            tabindex="4",
            v-model="birth.month",
            :class="{'text-placeholder':!birth.month}")
            option(value="", disabled, selected) MM
            option(v-for="i in 12",
              :value="fillZero(i)",
              :key="i") {{ fillZero(i) }}
          select#birth-day.form-control(
            name="day",
            tabindex="5",
            v-model="birth.day",
            :class="{'text-placeholder':!birth.day}")
            option(value="", disabled, selected) DD
            option(v-for="i in daysInMonth",
              :value="fillZero(i)",
              :key="i") {{ fillZero(i) }}
      .form-group
        label(for="ddress-city") Address*
        .form-row(v-if="cities && cities.length > 0")
          select#address-city.form-control(
            name="city",
            tabindex="6",
            v-model="address.city",
            :class="{'text-placeholder':!address.city}")
            option(value="", disabled, selected) City
            option(v-for="city in cities",
              :value="city.name",
              :key="city.name") {{ city.name }}
          select#address-dist.form-control(
            name="dist",
            tabindex="7",
            v-model="address.dist",
            :class="{'text-placeholder':!address.dist}")
            option(value="", disabled, selected) Dist
            option(v-for="dist in districts",
              :value="dist",
              :key="dist") {{ dist }}
      .form-group(:class="{'validate-error': errors.first('addressDetail')}")
        input#address-detail.form-control(type="text",
          name="addressDetail",
          placeholder="Address Detail",
          tabindex="8",
          v-model="address.detail",
          v-validate="'required'")
        .error-tooltip.right(v-show="errors.first('addressDetail')") {{errors.first('addressDetail')}}
      button.btn(type="submit",
        tabindex="9",
        :disabled="errors.any()") SUBMIT & NEXT
</template>

<script>
import { cities } from '@/cities'

export default {
  props: {
    generalData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
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
  },
  mounted () {
    this.name = this.generalData.name
    this.phone = this.generalData.phone
    this.birth.year = this.generalData.birth.year
    this.birth.month = this.generalData.birth.month
    this.birth.day = this.generalData.birth.day
    this.address.city = this.generalData.address.city
    this.address.dist = this.generalData.address.dist
    this.address.detail = this.generalData.address.detail

    if (!this.address.city) {
      this.address.city = this.cities[0].name
    }
  },
  computed: {
    now () {
      var now = new Date()
      return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
      }
    },
    daysInMonth () {
      return new Date(this.birth.year, this.birth.month, 0).getDate()
    },
    cities () {
      return cities
    },
    districts () {
      if (this.cities && this.cities.length && this.address.city) {
        return this.cities.filter(obj => obj.name === this.address.city)[0]
          .districts
      } else {
        return []
      }
    }
  },
  watch: {
    'birth.year' () {
      this.adjustDay()
    },
    'birth.month' () {
      this.adjustDay()
    },
    'address.city' (val) {
      var city = this.cities.filter(obj => obj.name === this.address.city)[0]
      if (!city.districts.includes(this.address.dist)) {
        this.address.dist = this.cities.filter(obj => obj.name === this.address.city)[0]
          .districts[0]
      }
    }
  },
  methods: {
    async submit () {
      const pass = await this.$validator.validate()
      if (pass) {
        this.$emit('submitted', {
          name: this.name,
          phone: this.phone,
          birth: {
            year: this.birth.year,
            month: this.birth.month,
            day: this.birth.day
          },
          address: {
            city: this.address.city,
            dist: this.address.dist,
            detail: this.address.detail
          }
        })
      }
    },
    fillZero (val) {
      var temp = val.toString()
      return temp.length === 1 ? `0${temp}` : temp
    },
    adjustDay () {
      if (parseInt(this.birth.day) > this.daysInMonth) {
        this.birth.day = ''
      }
    }
  }
}
</script>
