<!--Created by 337547038 on 2017/12/21.-->
<!--
example
<RadioGroup v-model="a" data=[
  {text:'选项1',value:'1',disabled:true}
]></RadioGroup>
-->
<template>
    <div class="radio-group">
        <Radio v-for="(item,index) in data" :key="index" v-model="groupValue" :value="item.value"
               :disabled="item.disabled">{{item.text}}
        </Radio>
    </div>
</template>
<script>
    import Radio from './radio'
    export default {
        name: 'radioGroup',
        data(){
            return {
                groupValue: this.value
            }
        },
        watch: {
            groupValue(v){
                this.$emit('input', v);
                this.change ? this.change(v) : ''
            }
        },
        props: {
            value: {},
            modelValue: {},
            data: Array,
            change: Function
        },
        components: {Radio},
        methods: {},
        mounted(){

        },
        computed: {}
    }
</script>