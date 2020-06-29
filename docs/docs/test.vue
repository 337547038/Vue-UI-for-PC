<template>
  <div>
    <ak-form ref="backForm">
      <ak-form-item prop="password1" label="密码" verify="required,digits">
        <ak-input v-model="form.name"></ak-input>
      </ak-form-item>

      <ak-form-item prop="password2" label="确认密码" verify="digits">
        <ak-input v-model="form.password"></ak-input>
      </ak-form-item>
    </ak-form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  components: {},
  methods: {
  },
  mounted() {

  }
}
</script>
