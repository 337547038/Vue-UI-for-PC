<script>
export default {
  name: 'itemList',
  data () {
    return {}
  },
  props: {
    childItem: Object,
    styleCls: Object,
    className: String
  },
  components: {},
  methods: {},
  computed: {},
  mounted () {
  },
  render (h) {
    let cls = ['carousel-slide']
    const itemCls = this.childItem.className
    itemCls && cls.push(itemCls)
    this.className && cls.push(this.className)
    return (<div class={cls.join(' ')} style={this.styleCls}>
      {this.childItem.renderCell.call(this, h)}</div>)
  }
}
</script>
