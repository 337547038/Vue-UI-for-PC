<template>
  <div :class="[prefixCls+'-table']"
       :style="{overflow: (width||height)?'auto':'',height:height,width:width}" ref="tableContainer">
    <div style="display: none">
      <slot/>
    </div>
    <table
      :class="{'table-stripe':stripe,
      'table-border':border,
      'table-hover':hover,
      'table-ellipsis':ellipsis,
      [className]:className}" ref="table">
      <colgroup>
        <col v-for="(col,index) in colWidth" :width="col" :key="index">
      </colgroup>
      <table-head
        :thead="theadOrder"
        :showHeader="showHeader"
        :selectChecked="selectChecked">
      </table-head>
      <tbody v-if="data.length===0">
      <tr>
        <td :colspan="columns.length" class="empty">
          {{emptyText}}
        </td>
      </tr>
      </tbody>
      <table-body
        :data="data"
        v-else
        :rowColSpan="rowColSpan"
        :hasChild="hasChild"
        :lazyLoad="lazyLoad"
        @trClick="_trClick">
      </table-body>
    </table>
    <Pagination
      v-if="pagination"
      :total="data&&data.length"
      v-bind="pagination">
    </Pagination>
  </div>
</template>

<script>
import {prefixCls} from '../prefix'
import TableBody from './tableBody'
import TableHead from './head'
import Pagination from '../pagination'

export default {
  name: `${prefixCls}Table`,
  componentName: 'table',
  data () {
    return {
      prefixCls: prefixCls,
      thead: [], // 表头信息及包含关系
      columns: [], // 表头，tableBody使用
      colWidth: [], // 所有列宽
      selectChecked: 'un-select', // 全选状态 un-select为全不选，some-select选择了部分，checked全选
      selectedRows: [], // 已选择的行
      sortBy: {}, // 存放所有排序信息
      dragHead: {}, // 临时存放表头拖动信息
      isSetThWidth: false // 用于记录是否已经重新设置过表头的实际宽
    }
  },
  created () {
    // console.time('timer')
  },
  watch: {
    data (oldData, newData) {
      // 当表格数据发生变化时，清空选择
      this.toggleSelection(false)
    },
    theadOrder (val) {
      val.forEach(item => {
        this.colWidth.push(item.width)
      })
    }
  },
  components: {TableBody, TableHead, Pagination},
  props: {
    drag: Boolean,
    dragWidth: {
      // 拖动时的最小宽和最大宽限制，0为不限
      type: Array,
      default: () => {
        return [60, 0]
      }
    },
    data: {
      type: Array,
      default: () => {
        return {}
      }
    },
    showHeader: {
      // 是否显示表头
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: null
    },
    hover: {
      // 鼠标悬停时的高亮
      type: Boolean,
      default: true
    },
    border: {
      // 表格纵向边框
      type: Boolean,
      default: true
    },
    stripe: {
      // 是否显示间隔斑马纹
      type: Boolean,
      default: true
    },
    height: String, // table的高，溢出显示滚动条，且表头固定
    width: String,
    ellipsis: {
      // 文字不换行
      type: Boolean,
      default: true
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    title: {
      // 鼠标滑过单元格时显示title提示
      type: Boolean,
      default: true
    },
    rowColSpan: Function,
    extendToggle: { // 默认展开扩展
      type: Boolean,
      default: false
    },
    hasChild: { // 有没子级
      type: Boolean,
      default: false
    },
    lazyLoad: Function,
    pagination: Object // 分页相关参数
  },
  methods: {
    _fixedHead () {
      // 如果有高和表头，则固定表头
      // if (this.height && this.showHeader) {
      let tableContainer = this.$refs.tableContainer
      tableContainer.addEventListener('scroll', this._scrollHandle.bind(this, tableContainer), false)
      // }
      this._fixedRight(tableContainer, 0)// 初始化时横向滚动条在0位置
    },
    _scrollHandle (el) {
      const scrollTop = el.scrollTop
      let head = this.$el.querySelector('thead')
      if (scrollTop > 0 && head) {
        head.className = 'transform'
        head.style.transform = `translateY(${scrollTop}px) translateZ(100px)`
        head.style.webkitTransform = `translateY(${scrollTop}px) translateZ(100px)`
      }
      if (scrollTop === 0 && head) {
        head.style = ''
        head.className = ''
      }
      // 左右滚动
      const scrollLeft = el.scrollLeft
      const fixedLeft = el.querySelectorAll('.left')
      if (fixedLeft.length > 0) {
        // left
        for (let i = 0, len = fixedLeft.length; i < len; i++) {
          fixedLeft[i].style.transform = `translateX(${scrollLeft}px) translateZ(90px)`
          fixedLeft[i].style.webkitTransform = `translateX(${scrollLeft}px) translateZ(90px)`
        }
      }
      this._fixedRight(el, scrollLeft)
    },
    _fixedRight (el, scrollLeft) {
      // 初始化时有横向滚动条，则先将右则固定的移到可见区
      const fixedRight = el.querySelectorAll('.right')
      const tableWidth = el.querySelector('table').offsetWidth
      // 可移动的最大宽
      let moveMaxWidth = tableWidth - el.clientWidth // div可见宽
      moveMaxWidth = scrollLeft - moveMaxWidth
      if (fixedRight.length > 0) {
        for (let i = 0, len = fixedRight.length; i < len; i++) {
          fixedRight[i].style.transform = `translateX(${moveMaxWidth}px)translateZ(90px)`
          fixedRight[i].style.webkitTransform = `translateX(${moveMaxWidth}px)translateZ(90px)`
        }
      }
    },
    _handleSelectAll () {
      if (this.selectChecked === 'checked') {
        // 取消所有选择
        this.toggleSelection(false)
      } else {
        // 全选
        this.toggleSelection(true)
      }
      this.$emit('selectClick', this.selectedRows)
    },
    _selectStatus () {
      // 全选或返选状态
      if (this.selectedRows.length === this.data.length) {
        this.selectChecked = 'checked'
      } else {
        if (this.selectedRows.length > 0) {
          this.selectChecked = 'some-select'
        } else {
          this.selectChecked = 'un-select'
        }
      }
    },
    _headMouseDown (event, index) {
      if (!this.drag) {
        return
      }
      if (!this.isSetThWidth) {
        // 重新设置表头的实际宽，仅在第一次点击时重置
        this.setTHWidth()
        this.isSetThWidth = true
      }
      this.dragHead = {
        mouseDown: true,
        oldX: event.x,
        // oldWidth: event.target.offsetWidth,
        oldWidth: parseInt(this.colWidth[index].replace('px', '')) || 0, // 拖动前的单元格宽
        index: index
      }
      // 不让选择
      event.preventDefault()
    },
    _headMouseMove (event, index) {
      if (!this.drag) {
        return
      }
      // const offsetWidth = event.target.offsetWidth
      let newWidth = this.dragHead.oldWidth + (event.x - this.dragHead.oldX) // 移动鼠标实现宽
      console.log(newWidth)
      // 如果设置了最小宽或最大
      if (this.dragWidth[0] > 0 && (newWidth < this.dragWidth[0])) {
        return
      }
      if (this.dragWidth[1] > 0 && (newWidth > this.dragWidth[1])) {
        return
      }
      if (this.dragHead.mouseDown) {
        // 拖动时有可能会存在意外，这里也限制一下
        if (this.dragWidth[0] > 0 && newWidth < this.dragWidth[0]) {
          newWidth = this.dragWidth[0] // 过小时使用最小值
        }
        if (this.dragWidth[1] > 0 && newWidth > this.dragWidth[1]) {
          newWidth = this.dragWidth[1] // 超出限制时使用最大值
        }
        this.$set(this.colWidth, this.dragHead.index, newWidth + 'px')
      }
    },
    _headMouseUp () {
      console.log('_headMouseUp')
      this.dragHead = {
        mouseDown: false,
        oldX: '',
        oldWidth: '',
        index: ''
      }
    },
    handleChange (row) {
      // 提供给column引用 ，单选行时
      // 单选checkbox，选中时将当前行信息存入selectedRows，没勾选时删除
      const index = this.selectedRows.indexOf(row)
      if (index !== -1) {
        this.selectedRows.splice(index, 1)
      } else {
        this.selectedRows.push(row)
      }
      // 全选时将selectAll也选上
      this._selectStatus()
      this.$emit('selectClick', this.selectedRows, row)
    },
    _sortClick (prop, order, e) {
      const parentNode = e.target.parentNode
      parentNode.className = 'caret-wrapper ' + order
      // 将当前排序信息添加到sortBy
      this.sortBy[prop] = order
      // this.sortChange && this.sortChange(this.sortBy)
      this.$emit('sortChange', this.sortBy)
    },
    getSelectAll () {
      return this.selectedRows
    },
    toggleSelection (boolean) {
      // boolean=true全选，false全不选
      if (boolean) {
        // 用于多选表格，切换所有行的选中状态
        this.selectedRows = [...this.data]
        this.selectChecked = 'checked'
      } else {
        // 用于多选表格，清空用户的选择
        this.selectedRows.splice(0, this.selectedRows.length)
        this.selectChecked = 'un-select'
      }
    },
    toggleRowSelection (row, selected) {
      // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）row, selected
      const index = this.selectedRows.indexOf(row)
      if (selected === false) {
        // 取消勾选当前行
        if (index !== -1) {
          this.selectedRows.splice(index, 1)
        }
      } else {
        // 勾选当前行，没有时添加。有时不重复添加
        if (index === -1) {
          this.selectedRows.push(row)
        }
      }
    },
    clearSort () {
      // 用于清空排序条件
      this.sortBy = {}
    },
    // 获取表头信息
    _getAllHead (thead, child, tid, layer) {
      // tid父级id,layer为当前层级
      if (!tid) {
        tid = 0
      }
      if (!layer) {
        layer = 0
      }
      child.forEach(item => {
        let item2 = item
        if (item.child) {
          item2 = item.child
        }
        if (item2.$options.componentName === 'Column') {
          const children = Object.assign({}, item2._props, {_id: item2._uid, _tid: tid, _layer: layer})
          if (item2.$slots.default) {
            layer++
            if (item2.type !== 'extend') {
              thead.push(Object.assign(children, {_child: true}))
              // this.colWidth.push(item2.width)
            }
            this._getAllHead(thead, item2.$slots.default, item2._uid, layer)
            layer = 0
          } else {
            if (item2.type !== 'extend') {
              thead.push(children)
            }
            this.columns.push(item2)
          }
        }
      })
      this.columns.sort((a, b) => parseInt(a.order) - parseInt(b.order))
    },
    resetColumn () {
      // 1.表格加载完成时用于获取table子组件，生成表头
      // 2.当存在动态切换Column时，用于重置表头
      // console.log('getColumn')
      this.$nextTick(() => {
        let child = this.$children
        this.thead = []
        this.columns = []
        this.colWidth = []
        this._getAllHead(this.thead, child)
        this.setTHWidth()
      })
    },
    _trClick (row, index) {
      this.$emit('trClick', row, index)
    },
    // 表格可以拖动时，重新设置表格的实际宽度。否则点击拖动时会先发生宽度变化，也可通过外部调用来改变宽
    setTHWidth () {
      if (!this.drag) {
        return
      }
      const th = this.$el.querySelectorAll('th')
      console.log(th)
      this.colWidth = []
      th.forEach(item => {
        this.colWidth.push(item.offsetWidth + 'px')
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._fixedHead()
      if (this.drag) {
        this.$refs.tableContainer.style.overflowX = 'auto'
        document.addEventListener('mouseup', this._headMouseUp)
      }
      // console.timeEnd('timer')
    })
    this.resetColumn()
  },
  destroyed () {
    if (this.drag) {
      document.removeEventListener('mouseup', this._headMouseUp)
    }
  },
  computed: {
    theadOrder () {
      const hasOrder = this.thead.length > 1 && this.thead[0].order
      let temp = this.thead
      if (parseInt(hasOrder) > -1) {
        // 需排序
        // eslint-disable-next-line
        temp = this.thead.sort((a, b) => parseInt(a.order) - parseInt(b.order))
      }
      return temp
    }
  }
}
</script>
