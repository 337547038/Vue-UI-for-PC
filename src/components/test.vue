<template>
    <div class="radio-component">
        <label>
            <input type="radio"
                   :value="vValue"
                   @change="onChange" v-model="radioValue">{{radioValue}}

            <slot name="input-box">
                <span class="input-box">
                    <span class="input-box-circle"></span>
                </span>
            </slot>
            <slot></slot>
        </label>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                radioValue: '',
                vValue: this.value
            }
        },
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: ['value', 'modelValue'],
        watch: {},
        methods: {
            onChange(){
                let v = this.value ? this.value : true;
                this.$emit('change', v);
            },
            _radioValue(){
                //如果没有value时，v-model为true时选中
                if (this.value === undefined) {
                    if (this.modelValue) {
                        this.vValue = this.modelValue;
                        this.radioValue = this.modelValue
                    } else {
                        this.radioValue = false
                    }
                } else {
                    //value=v-model时选中
                    if (this.value == this.modelValue) {
                        this.radioValue = this.modelValue
                    } else {
                        this.radioValue = '';
                        this.$emit('change', '');//不等时将v-model置空
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