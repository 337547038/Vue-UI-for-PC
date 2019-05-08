<script>
export default {
  name: 'tableTd',
  data () {
    return {}
  },
  props: ['column', 'row', 'index', 'title'],
  components: {},
  methods: {},
  computed: {},
  mounted () {
  },
  render (h) {
    const row = this.row // 传进来的表格行数数据
    const column = this.column // column组件数据
    const $index = this.index
    const title = this.title
    let classNameTd = column.fixed
    if (column.className && column.fixed) {
      classNameTd += ' ' + column.className
    } else if (column.className) {
      classNameTd = column.className
    }
    return (<td class={classNameTd} style={'text-align:' + column.align} title={title || column.title ? row[column.prop] : null}>
      {
        this.column.renderCell.call(this, h, {
          row,
          column,
          $index
        })
      }
    </td>)
  }
}
</script>
