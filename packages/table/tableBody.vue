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
        :key="indexTd">
      </TableTd>
    </tr>
    <tr :key="'tr' + rowIndex" v-if="colsExtend.length>0" class="extend"
        :class="{'warning':$parent.selectedRows.indexOf(row) !== -1,[`extend-tr-${rowIndex+1}`]:true}">
      <TableTd
        v-for="(column,indexTd) in colsExtend"
        :column="column"
        :row="row"
        :index="rowIndex"
        :title="$parent.title"
        :key="indexTd"
        :colspan="colsFilter.length">
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
  data() {
    return {}
  },
  computed: {
    colsExtend() {
      return this.$parent.columns.filter(item => {
        return item.type === 'extend'
      })
    },
    colsNoExtend() {
      // 不带扩展的
      return this.$parent.columns.filter(item => {
        return item.type !== 'extend'
      })
    },
    colsFilter() {
      return this.$parent.columnsFilter
    }
  },
  watch: {},
  methods: {},
  created() {
  },
  mounted() {
  }
}
</script>
