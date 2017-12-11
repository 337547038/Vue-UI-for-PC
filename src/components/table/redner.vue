<!--Created by 337547038 on 2017/12/11.-->
<script>
    export default {
        props: ['fn', 'item'],
        name: '',
        data () {
            return {}
        },
        components: {},
        mounted(){
        },
        methods: {},
        computed: {},
        filters: {},
        render(el){
            if (typeof this.fn == 'function') {
                return this.fn(el, this.item)
            }
        }
    }
</script>