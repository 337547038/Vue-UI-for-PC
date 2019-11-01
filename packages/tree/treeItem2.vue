<!--Created by 337547038 on 2018/1/26.-->
<template>
  <li :class="{'active':data.show}">
    <i :class="{'has-child':data.children,'open-child':data.show}"
       @click.stop="_slideToggle(data)"></i>
    <Checkbox
      v-model="data.checked"
      :disabled="data.disabled"
      @change="_checkboxChange(data,$event)"
      :class="{'some-select':data.someSelect&&!data.checked}">
    </Checkbox>
    <a>{{data.name||data}}<span v-if="showValue">({{data.value}})</span></a>
    <transition name="tree-toggle">
      <ul v-show="data.show" v-if="data.children">
        <p class="tree-loading" v-if="data.children.length===0&&$parent.lazy"></p>
        <treeLi
          v-for="(item,index) in data.children"
          :data="item"
          :key="index"
          @toggle="_slideToggleChild"
          @checkboxChange="_checkboxChangeChild"></treeLi>
      </ul>
    </transition>
  </li>
</template>
<script>
import {Checkbox} from '../checkbox'

export default {
  name: 'treeLi',
  data () {
    return {
    }
  },
  props: ['data', 'showValue'],
  components: {Checkbox},
  methods: {
    _slideToggle (data) {
      if (data.children) {
        if (typeof data.show === 'undefined') {
          this.$set(data, 'show', true)
        } else {
          data.show = !data.show
        }
        this.$emit('toggle', data)
      }
    },
    _slideToggleChild (item) {
      this.$emit('toggle', item)
    },
    _checkboxChangeChild (data) {
      this.$emit('checkboxChange', data) // 父级处理
    },
    _checkboxChange (data, Boolean) {
      // 将所有子级勾选或取消
      this._checkedChild(data, Boolean)
      this._checkboxChangeChild(data)// 父级处理
    },
    _checkedChild (data, Boolean) {
      if (data.children) {
        data.children.forEach(item => {
          if (!item.disabled) {
            // 跳过禁用项
            if (typeof item.checked === 'undefined') {
              this.$set(item, 'checked', Boolean)
            } else {
              item.checked = Boolean
            }
            if (item.children) {
              // 循环
              this._checkedChild(item, Boolean)
            }
          }
        })
      }
    }
  },
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
<style>

</style>
