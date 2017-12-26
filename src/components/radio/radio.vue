<!--Created by 337547038 on 2017/12/21.-->
<!--
example
<radio v-model="true"></radio>
-->
<template>
    <label class="radio-box" :class="{'checked':vValue==modelValue,'disabled':disabled}">
        <input type="radio" :value="vValue" @change="onChange" :disabled="disabled" :checked="vValue==modelValue">
        <span class="radio-inner"></span>
        <span class="radio-text"><slot/></span>
    </label>
</template>
<script>
    export default {
        name: 'radio',
        data(){
            return {
                radioValue: this.modelValue,
                vValue: this.value
                //randomId: 'id' + Math.random().toString(36).substr(2, 3)
            }
        },
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: {
            modelValue: {},
            disabled: {
                type: Boolean,
                default: false
            },
            value: {},
            change: Function
        },
        watch: {},
        methods: {
            onChange(){
                let v;
                if (this.value) {
                    v = this.value;
                } else {
                    v = this.modelValue ? this.modelValue : true;
                }
                this.$emit('change', v);
                this.vValue = v;
                this.change ? this.change(v) : ""
            },
            _radioValue(){
                if (this.value) {
                } else {
                    if (this.modelValue) {
                        this.vValue = this.modelValue;
                    } else {
                        this.$emit('change', false);
                    }
                }
            }
        },
        mounted(){
            this._radioValue();
        },
        computed: {}
    }
</script>