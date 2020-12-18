<template>
  <div style="padding-top: 200px">
    <ak-dropdown>
      <p style="border: 1px solid #ddd">121312</p>
      <p><br></p>
      <div slot="trigger" style="border: 1px solid #ddd">下拉菜单</div>
      <ul slot="dropdown">
        <ak-dropdown-item :disabled="true">1</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item>
          <div>333<i class="icon"></i></div>
        </ak-dropdown-item>
      </ul>
    </ak-dropdown>
  </div>
</template>
<script>

export default {
  data () {
    return {}
  },
  components: {},
  methods: {},
  mounted () {

  },
  computed: {}
}
</script>
