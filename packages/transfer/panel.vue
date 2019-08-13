<!-- Created by 337547038 on 2019/8/7 0007. -->
<template>
  <div class="transfer-panel">
    <div class="transfer-head">
      <Checkbox v-model="checkboxChecked" @change="_changeCheckbox">{{titles}}</Checkbox>
      <span class="num" v-text="total"></span>
    </div>
    <div class="transfer-content">
      <CheckboxGroup v-model="selected" :data="data" ref="checkboxGroupRef"></CheckboxGroup>
    </div>
  </div>
</template>

<script>
import {Checkbox, CheckboxGroup} from '../checkbox'

export default {
  name: 'panel',
  data () {
    return {
      checkboxChecked: false,
      selected: []
    }
  },
  props: {
    titles: String,
    data: Array,
    arrow: String
  },
  components: {Checkbox, CheckboxGroup},
  watch: {
    selected (v) {
      // 相等时勾上全选
      if (v.length === this.selectDataLength && v.length > 0) {
        this.checkboxChecked = true
      } else {
        this.checkboxChecked = false
      }
      this._emit()
    }
  },
  methods: {
    _emit () {
      this.$emit('change', this.selected, this.arrow)
    },
    _changeCheckbox (v) {
      if (v) {
        this.$refs.checkboxGroupRef.select() // 全选
      } else {
        this.$refs.checkboxGroupRef.clear()
      }
      // this._emit()
    }
  },
  computed: {
    total () {
      return this.selected.length + '/' + this.data.length
    },
    selectDataLength () {
      // 返回可勾选的个数
      let i = 0
      this.data.forEach(item => {
        if (item.disabled) {

        } else {
          i++
        }
      })
      return i
    }
  },
  mounted () {
  }
}
</script>
