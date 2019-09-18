<template>
  <tbody>
  <template v-for="(row,rowIndex) in data">
    <tr :key="rowIndex"
        :class="{'warning':$parent.selectedRows.indexOf(row) !== -1,[`parent-tr-${rowIndex+1}`]:colsExtend.length,[row.trClass]:row.trClass}">
      <TableTd
        v-for="(column,indexTd) in colsNoExtend"
        :column="column"
        :row="row"
        :index="rowIndex"
        :columnIndex="indexTd"
        :title="$parent.title"
        :key="indexTd"
        :showHideExtend="showHideExtend">
      </TableTd>
    </tr>
    <tr :key="'tr' + rowIndex" v-if="colsExtend.length>0" class="extend"
        :class="{'warning':$parent.selectedRows.indexOf(row) !== -1,[`extend-tr-${rowIndex+1}`]:true}"
        v-showHide="{index:extendIndex,toggle:extendToggle,rowIndex:rowIndex}">
      <TableTd
        v-for="(column,indexTd) in colsExtend"
        :column="column"
        :row="row"
        :index="rowIndex"
        :title="$parent.title"
        :key="indexTd"
        :colspan="colsNoExtend.length">
      </TableTd>
    </tr>
  </template>
  </tbody>
</template>
<script>
import TableTd from './td'

window.rowspanColspan = ''
export default {
  name: 'TableBody',
  props: {
    data: Array,
    rowColSpan: Function
  },
  components: {TableTd},
  data () {
    return {
      extendToggle: this.$parent.extendToggle, // 默认展开
      extendIndex: ''
    }
  },
  computed: {
    colsExtend () {
      return this.$parent.columns.filter(item => {
        return item.type === 'extend'
      })
    },
    colsNoExtend () {
      // 不带扩展的
      return this.$parent.columns.filter(item => {
        return item.type !== 'extend'
      })
    }
  },
  watch: {},
  methods: {
    // 展开或收起扩展行
    showHideExtend (index) {
      // 存在扩展时
      if (this.colsExtend.length > 0) {
        this.extendIndex = index
        this.extendToggle = !this.extendToggle
        return !this.extendToggle
      }
    }
  },
  created () {
  },
  mounted () {
  },
  directives: {
    showHide: {
      bind (el, binding) {
        const value = binding.value
        if (value.toggle) {
          el.style.display = ''
        } else {
          el.style.display = 'none'
        }
      },
      update (el, binding) {
        const value = binding.value
        const display = el.style.display
        if (display === 'none' && value.index === value.rowIndex) {
          el.style.display = ''
        } else if (value.index === value.rowIndex) {
          el.style.display = 'none'
        }
      }
    }
  }
}
</script>
