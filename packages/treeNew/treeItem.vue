<!--Created by 337547038 on 2018/1/26.-->
<template>
  <!--<li :class="{'active':data.show,'selected':data.key===value&&value}">
    <i :class="{'has-child':data.children,'open-child':data.show}"
       @click.stop="_slideToggle(data)"></i>
    <Checkbox
      v-if="showCheckbox"
      v-model="data.checked"
      :disabled="data.disabled"
      @change="_checkboxChange(data,$event)"
      :class="{'some-select':data.someSelect&&!data.checked}">
    </Checkbox>
    <a @click="_click(data)">{{data.name}}</a>
    <slot :row="data"></slot>
    &lt;!&ndash;<transition name="tree-toggle">&ndash;&gt;
    <collapse-transition>
      <ul v-show="data.show" v-if="data.children">
        <p class="tree-loading" v-if="data.children.length===0&&$parent.lazy"></p>
        <treeLi
          v-for="(item,index) in data.children"
          :data="item"
          :key="index"
          :showCheckbox="showCheckbox"
          :value="value"
          @click="_click"
          @toggle="_slideToggleChild"
          @checkboxChange="_checkboxChangeChild">
          <slot :row="item" :index="index"></slot>
        </treeLi>
      </ul>
    </collapse-transition>
  </li>-->
  <ul v-show="show">
    <li class="tree-loading" v-if="data.length===0&&lazy"></li>
    <li
      v-for="(item,index) in data"
      :key="index"
      :class="[item.disabled]">
      <i
        :class="{'has-child':item.children,'open-child':item.show,['icon-'+(item.icon||'arrow')]:true}"
        @click.stop="_slideToggle(item)"></i>
      <Checkbox
        v-if="showCheckbox"
        v-model="item._checked"
        :disabled="item.disabled"
        @change="_checkboxChange(item,pId,$event)">
      </Checkbox>
      <span @click.stop="_textClick(item)" :class="_getTextClass(item)">{{item.name}}</span>
      <slot :row="item" :index="index"></slot>
      <treeLi
        v-if="item.children"
        :data="item.children"
        :show="item.show"
        :lazy="lazy"
        :showCheckbox="showCheckbox"
        :pId="_getFirstId(index,pId)"
        @click="_click"
        @toggle="_toggle"
        @change="_change">
        <template slot-scope="node">
          <slot :row="node.row" :index="node.index"></slot>
        </template>
      </treeLi>
    </li>
  </ul>
</template>
<script>
import {Checkbox} from '../checkbox'
// import CollapseTransition from '../transition'

export default {
  name: 'treeLi',
  data() {
    return {}
  },
  props: ['data', 'show', 'value', 'lazy', 'showCheckbox', 'pId'],
  components: {Checkbox},
  methods: {
    // icon图标事件
    _slideToggle(data) {
      console.log('_slideToggle')
      if (data.disabled) {
        return
      }
      if (data.children) {
        if (typeof data.show === 'undefined') {
          this.$set(data, 'show', true)
        } else {
          data.show = !data.show
        }
        this.$emit('toggle', data)
      }
    },
    // 文字点击
    _textClick(item) {
      const key = item.key || item.name
      if (!this.value || item.disabled) {
        return
      }
      if (typeof this.value === 'string') {
        this.$emit('click', key)
      } else {
        // 数组时，有就删除，没有就添加
        let val = this.value
        if (this.value.indexOf(key) === -1) {
          val.push(key)
        } else {
          for (let i = 0; i < val.length; i++) {
            if (val[i] === key) {
              val.splice(i, 1)
              break
            }
          }
        }
        this.$emit('click', val)
      }
    },
    // 返回文字样式，当前选中状态
    _getTextClass(item) {
      const key = item.key || item.name
      if (typeof this.value === 'string') {
        // 字符串时，
        return this.value === key ? 'checked' : ''
      } else if (typeof this.value === 'object') {
        // 可以是多个
        if (this.value.indexOf(key) !== -1) {
          return 'checked'
        }
      }
    },
    _toggle(item) {
      this.$emit('toggle', item)
    },
    _click(item) {
      this.$emit('click', item)
    },
    _change(item, tid, checked) {
      this.$emit('change', item, tid, checked)
    },
    // 返回所有父级下标，用于checkbox遍历全选
    _getFirstId(index, tid) {
      if (tid === undefined) {
        return index
      } else {
        return tid + ',' + index
      }
    },
    // checkbox选择或取消时
    _checkboxChange(item, tid, checked) {
      this.$emit('change', item, tid, checked)
    }
    /*
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
        } */
  },
  computed: {},
  mounted() {
  },
  filters: {}
}
</script>
<style>

</style>
