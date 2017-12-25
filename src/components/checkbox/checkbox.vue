<!--Created by 337547038 on 2017/12/25.-->
<template>
    <label class="checkbox-box">{{checkboxValue}}
        <input type="checkbox" :disabled="disabled" v-model="checkboxValue">
        <span class="checkbox-inner"></span>
        <span class="checkbox-text" v-if="text" v-text="text"></span>
        <span class="checkbox-text" v-else><slot></slot></span>
    </label>
</template>
<script>
    export default {
        name: 'checkbox',
        data () {
            return {
                checkboxValue: this.modelValue
            }
        },
        watch: {
            checkboxValue(val){
                //val只有true和false，
                //修改为选中时返回value的值，value没值时返回v-model的值
                //没选中时v-model为布尔值是返回false，为字符中返回空
                let newValue;
                if (val) {

                } else {

                }
                //有值时，选中状态返回设定的值
                /*if (this.value) {
                 v = v ? this.value : ''
                 }*/
                this.$emit('change', newValue);
                //this.change ? this.change(v) : "";
            }
        },
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            text: String,
            modelValue: {},
            value: String,
            change: Function
        },
        components: {},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>