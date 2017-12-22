<!--Created by 337547038 on 2017/12/20.-->
<!--
 example
 <RadioGroup v-model="1" data=[
     {text:"选项1",value="1"},
     {text:"选项2",value="2"},
     {text:"选项3",value="3",disabled:true}
 ]/>
-->
<template>
    <div class="radio-group">
        <Radio v-for="item in data" :value="item.value" @change="_change" :key="item.value" :name="randomName"
               :checked="value==item.value" :disabled="item.disabled">{{item.text}}
        </Radio>
    </div>
</template>
<script>
    import Radio from './radio'
    export default {
        name: 'radioGroup',
        data(){
            return {
                randomName: Math.random().toString(36).substr(2, 6)
            }
        },
        props: {
            value: String,
            data: Array,
            change: Function
        },
        mounted(){
        },
        components: {Radio},
        methods: {
            _change(v){
                this.$emit('input', v);
                this.change ? this.change(v) : "";
            }
        },
        computed: {}
    }
</script>