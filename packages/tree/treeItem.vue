<!--Created by 337547038 on 2018/1/26.-->
<template>
  <li :class="{'active':data.show,selected:data.name===selected}">
    <i :class="{'has-child':data.children,'open-child':data.show}"
       @click.stop="_slideToggle(data)"></i>
    <Checkbox
      v-if="showCheckbox"
      v-model="data.checked"
      :disabled="data.disabled"
      @change="_checkboxChange(data,$event)"
      :class="{'some-select':data.someSelect&&!data.checked}">
    </Checkbox>
    <a @click="_click(data)">{{data.name}}<span v-if="showValue">({{data.value}})</span></a>
    <slot :row="data"></slot>
    <!--<transition name="tree-toggle">-->
    <collapse-transition>
      <ul v-show="data.show" v-if="data.children">
        <p class="tree-loading" v-if="data.children.length===0&&$parent.lazy"></p>
        <treeLi
          v-for="(item,index) in data.children"
          :data="item"
          :key="index"
          :showCheckbox="showCheckbox"
          :showValue="showValue"
          @click="_click"
          @toggle="_slideToggleChild"
          @checkboxChange="_checkboxChangeChild">
          <slot :row="item" :index="index"></slot>
        </treeLi>
      </ul>
    </collapse-transition>
  </li>
</template>
<script>
import {Checkbox} from '../checkbox'
import CollapseTransition from '../transition'

export default {
  name: 'treeLi',
  data() {
    return {
      selected: '' // 当前点击项的值
    }
  },
  props: ['data', 'showValue', 'showCheckbox'],
  components: {Checkbox, CollapseTransition},
  methods: {
    _click(item) {
      this.selected = item.name
      this.$emit('click', item)
    },
    _slideToggle(data) {
      if (data.children) {
        if (typeof data.show === 'undefined') {
          this.$set(data, 'show', true)
        } else {
          data.show = !data.show
        }
        this.$emit('toggle', data)
      }
    },
    _slideToggleChild(item) {
      this.$emit('toggle', item)
    },
    _checkboxChangeChild(data) {
      this.$emit('checkboxChange', data) // 父级处理
    },
    _checkboxChange(data, Boolean) {
      // 将所有子级勾选或取消
      this._checkedChild(data, Boolean)
      this._checkboxChangeChild(data)// 父级处理
    },
    _checkedChild(data, Boolean) {
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
  mounted() {
  },
  filters: {}
}
</script>
<style>

</style>
