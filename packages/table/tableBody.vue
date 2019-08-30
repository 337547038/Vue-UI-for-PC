<template>
  <tbody>
  <template v-for="(row,rowIndex) in data">
    <tr :key="rowIndex"
        :class="{'warning':$parent.selectedRows.indexOf(row) !== -1,[`parent-tr-${rowIndex+1}`]:isExtend,[row.trClass]:row.trClass}">
      <TableTd
        v-for="(column,indexTd) in cols"
        :column="column"
        :row="row"
        :index="rowIndex"
        :columnIndex="indexTd"
        :title="$parent.title"
        :key="indexTd"
        v-if="column.type!=='extend'">
      </TableTd>
    </tr>
    <tr :key="'tr' + rowIndex" v-if="isExtend" class="extend"
        :class="{'warning':$parent.selectedRows.indexOf(row) !== -1,[`extend-tr-${rowIndex+1}`]:true}">
      <TableTd
        v-for="(column,indexTd) in cols"
        :column="column"
        :row="row"
        :index="rowIndex"
        :title="$parent.title"
        :key="indexTd"
        v-if="column.type==='extend'"
        :colspan="colsFilter.length">
      </TableTd>
    </tr>
  </template>
  </tbody>
</template>
<script>
import TableTd from './td'
export default {
  name: 'TableBody',
  props: {
    data: Array,
    rowColSpan: Function
  },
  components: {TableTd},
  data () {
    return {
      rowspanColspan: new Date() * 1 // 保存合并行列数据的key
    }
  },
  computed: {
    cols () {
      return this.$parent.columns
    },
    colsFilter () {
      return this.$parent.columnsFilter
    },
    isExtend () {
      // 返回有没存在type=extend的列
      let extend = false
      this.cols.forEach(item => {
        if (item.type === 'extend') {
          extend = true
        }
      })
      return extend
    }
  },
  watch: {},
  methods: {},
  created () {
  },
  mounted () {
  }
}
</script>
