<template>
  <div :class="[prefixCls+'-table']"
       :style="{overflow: (width||height)?'auto':'',height:height,width:width}" ref="tableContainer">
    <slot/>
    <table
      :class="{'table-stripe':stripe,
      'table-border':border,
      'table-hover':hover,
      'table-ellipsis':ellipsis,
      [className]:className}">
      <colgroup>
        <col v-for="(col,index) in columnsFilter" :width="col.width" :key="index">
      </colgroup>
      <thead v-if="showHeader" ref="tableHead">
      <tr>
        <th v-for="(thead,index) in columnsFilter" :class="[thead.fixed,thead.className]" :key="index"
            :style="{textAlign:thead.align}" :title="title||thead.title?thead.label:null">
          <label @click="_handleSelectAll" :class="[selectChecked,prefixCls+'-checkbox']"
                 v-if="thead.type==='selection'">
            <span :class="`${prefixCls}-checkbox-inner`"></span>
          </label>
          <template v-else-if="thead.type==='index'">{{thead.label}}</template>
          <template v-else>{{thead.label}}
            <span class="caret-wrapper" v-if="thead.sortBy">
              <i class="sort-caret asc" @click="sortClick(thead.prop,'asc',$event)"></i>
              <i class="sort-caret desc" @click="sortClick(thead.prop,'desc',$event)"></i>
            </span>
          </template>
        </th>
      </tr>
      </thead>
      <tbody v-if="data.length===0">
      <tr>
        <td :colspan="columnsFilter.length" class="empty">
          {{emptyText}}
        </td>
      </tr>
      </tbody>
      <table-body :data="data" v-else></table-body>
    </table>
  </div>
</template>

<script>
import {prefixCls} from '../prefix'
import TableBody from './tableBody'

export default {
  name: `${prefixCls}Table`,
  data () {
    return {
      prefixCls: prefixCls,
      columns: [], // 表头
      columnsFilter: [], // 表头，过滤掉扩展列的
      selectChecked: 'un-select', // 全选状态 un-select为全不选，some-select选择了部分，checked全选
      selectedRows: [], // 已选择的行
      sortBy: {} // 存放所有排序信息
    }
  },
  watch: {
    data (oldData, newData) {
      // 当表格数据发生变化时，清空选择
      this.clearSelection()
    },
    updateChild () {
      /* console.log('updateChild watch')
      const that = this
      this.$nextTick(function () {
        that.getColumn()
      }) */
    }
  },
  components: {TableBody},
  props: {
    updateChild: String,
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
    selectClick: Function, // 勾选单列事件
    sortChange: Function, // 排序点击时{prop, order }
    selectAllClick: Function// 全选/返选
  },
  methods: {
    _fixedHead () {
      // 如果有高和表头，则固定表头
      // if (this.height && this.showHeader) {
      let tableContainer = this.$refs.tableContainer
      tableContainer.addEventListener(
        'scroll',
        this._scrollHandle.bind(this, tableContainer),
        false
      )
      // }
      this._fixedRight(tableContainer, 0)// 初始化时横向滚动条在0位置
    },
    _scrollHandle (el) {
      const scrollTop = el.scrollTop
      let head = this.$refs.tableHead
      if (scrollTop > 0) {
        head.className = 'transform'
        head.style.transform = `translateY(${scrollTop}px) translateZ(100px)`
        head.style.webkitTransform = `translateY(${scrollTop}px) translateZ(100px)`
      }
      if (scrollTop === 0) {
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
        /* this.selectedRows.splice(0, this.selectedRows.length)
        this.selectChecked = 'un-select' */
        this.clearSelection()
      } else {
        // 全选
        // Es6 [...arr]  克隆
        /* this.selectedRows = [...this.data]
         this.selectChecked = 'checked' */
        this.toggleAllSelection()
      }
      this.selectAllClick && this.selectAllClick(this.selectedRows)
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
      /* if (this.selectedRows.length === this.data.length) {
        this.selectChecked = 'checked'
      } else {
        if (this.selectedRows.length > 0) {
          this.selectChecked = 'some-select'
        } else {
          this.selectChecked = 'un-select'
        }
      } */
      this.selectClick && this.selectClick(row)
    },
    sortClick (prop, order, e) {
      const parentNode = e.target.parentNode
      parentNode.className = 'caret-wrapper ' + order
      // 将当前排序信息添加到sortBy
      this.sortBy[prop] = order
      this.sortChange && this.sortChange(this.sortBy)
    },
    getSelectAll () {
      return this.selectedRows
    },
    clearSelection () {
      // 用于多选表格，清空用户的选择
      this.selectedRows.splice(0, this.selectedRows.length)
      this.selectChecked = 'un-select'
    },
    toggleAllSelection () {
      // 用于多选表格，切换所有行的选中状态
      this.selectedRows = [...this.data]
      this.selectChecked = 'checked'
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
    resetColumn () {
      // 1.表格加载完成时用于获取table子组件，生成表头
      // 2.当存在动态切换Column时，用于重置表头
      // console.log('getColumn')
      this.$nextTick(() => {
        let child = this.$children
        // 遍历子组件，只返回column组件
        this.columns = child.filter(item => {
          return item.$options.componentName === 'Column'
        })
        // 返回过滤掉扩展列的
        this.columnsFilter = child.filter(item => {
          return item.$options.componentName === 'Column' && item.type !== 'extend'
        })
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._fixedHead()
    })
    // console.log('mounted')
    // console.log(this.columns)
    this.resetColumn()
  },
  updated () {
    // console.log('updated')
  },
  destroyed () {
    // console.log('destroyed')
    // this.columns = []
  },
  computed: {}
}
</script>
