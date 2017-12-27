<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="demo">
        <comHeader name="cascader"/>
        <h1>Cascader Demo</h1>
        <Cascader tipsText="请选择新地址" v-model="value" :split="split"></Cascader>
        {{value}}
    </div>
</template>
<script>
    import Cascader from '../components/cascader/index'
    export default {
        name: 'cascader',
        path: '/cascader',
        data () {
            return {
                value: ['广东', '广州市', '天河区'],
                selectText: ['请选择1', '请选择2', '请选择3'],
                split: ['省', '', '']
            }
        },
        props: {},
        components: {Cascader},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>