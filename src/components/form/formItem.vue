<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="form-group">
        <label class="label" :class="labelClass" v-text="label"></label>
        <div class="form-box">
            <slot></slot>
        </div>
        <div class="form-explain" :class="tipType" v-if="showTip" v-text="tipText"></div>
    </div>
</template>
<script>
    export default {
        name: 'formItem',
        data(){
            return {}
        },
        props: {
            label: String,
            labelClass: String,
            showTip: {//显示验证提示
                type: Boolean,
                default: false
            },
            tipType: {//提示类型，成功success或失败failure
                type: String,
                default: 'failure'
            },
            tipText: String//提示语
        },
        mounted(){
            //console.log(this.$children)
        },
        components: {},
        methods: {
            _input(v){
                /* console.log('++++++++++');
                 console.log(v);*/
            }
        },
        computed: {}
    }
</script>