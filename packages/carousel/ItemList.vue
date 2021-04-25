<script>
export default {
  name: 'itemList',
  data () {
    return {}
  },
  props: {
    childItem: Object,
    styleCls: Object
  },
  components: {},
  methods: {},
  computed: {},
  mounted () {
  },
  render (h) {
    let cls = 'carousel-slide'
    if (this.childItem.className) {
      cls += ' ' + this.childItem.className
    }
    return (<div class={cls} style={this.styleCls}>
      {this.childItem.renderCell.call(this, h)}</div>)
  }
}
</script>
