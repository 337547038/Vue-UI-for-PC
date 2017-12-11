<!--Created by 337547038 on 2017/12/5.-->
<template>
    <div>
000
        <Test :render="render">132</Test>
    </div>
</template>
<script>
    import Test from '../components/test'
    export default {
        name: 'test',
        path: '/test',
        data(){
            return {}
        },
        mounted(){
        },
        components: {Test},
        methods: {

                 render:function (h,params) {
                    return h('div','render ok')

            }
        }
    }
</script>