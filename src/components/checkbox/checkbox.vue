<!--Created by 337547038 on 2017/12/25.-->
<!--example
<Checkbox v-model="value">text</Checkbox> or
<Checkbox v-model="value" text='text'></Checkbox>
-->
<template>
    <label class="checkbox-box" :class="{'checked':checkboxValue,'disabled':disabled}">
        <input type="checkbox" :disabled="disabled" v-model="checkboxValue" :name="name">
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
                //val=true，有value返回value值，没value返回true
                //val=false，返回false
                let newValue;
                if (val) {
                    newValue = this.value ? this.value : true
                } else {
                    newValue = this.value ? '' : false
                }
                this.$emit('input', newValue);
                //回调时同时返回一个value时，不管有没选中，主要用在组里
                this.change ? this.change(newValue, this.value) : "";
            }
        },
        model: {
            prop: 'modelValue',
            event: 'input'
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            text: String,
            modelValue: {},
            value: String,
            name: String,
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