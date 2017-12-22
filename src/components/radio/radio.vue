<!--Created by 337547038 on 2017/12/20.-->
<template>
    <label class="radio-box" :for="randomId">
        <input type="radio" @change="_change" :id="randomId" :disabled="disabled" v-model="radioValue" :value="value">
        <span class="radio-text"><slot/></span>
    </label>
</template>
<script>
    export default {
        name: 'radio',
        data(){
            return {
                radioValue: this.value?this.value:'',
                randomId: Math.random().toString(36).substr(2, 10)
            }
        },
        props: {
            value: Boolean,
            name: String,//对于组合时有用
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        mounted(){
        },
        components: {},
        methods: {
            _change(){
                console.log('radioValue')
                this.$emit('input', true);
            }
        },
        computed: {}
    }
</script>