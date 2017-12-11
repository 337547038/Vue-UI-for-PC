<!--Created by 337547038 on 2017/12/5.-->
<script type="text/ecmascript-6">
    import Icon from './t2'
    export default {
        /*render:function (createElement) {
         return createElement(
         'h' + this.level,    // tag name 标签名称
         this.$slots.default  // 组件的子元素
         )
         },*/
        render: (h, params)=> {
            /*return h('div', [
                h('Icon', {
                    props: {className: 'dddd'}
                })
            ]);*/
            return h('a',{attrs:{id:"ap0p"}},params)
        },
        name: '',
        data(){
            return {}
        },
        props: {
            level: {
                type: Number,
                default: 2
            }
        },
        mounted(){
        },
        components: {Icon},
        methods: {},
        computed: {}
    }
</script>