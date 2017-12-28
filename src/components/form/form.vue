<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div>
        <FormItem v-for="(item,index) in data" :key="index" v-bind="item.item">
            <gInput v-model.trim="item.control.value" v-if="item.control.control=='input'" v-bind="item.control" @input="_input(item,$event)"></gInput>
        </FormItem>

        <slot></slot>
    </div>
</template>
<script>
    import gInput from '../input/index'
    import {Radio, RadioGroup} from '../radio/index'
    import {Checkbox, CheckboxGroup} from '../checkbox/index'
    import SelectDropDown from '../select/index'
    import FormItem from './formItem'
    export default {
        name: 'form',
        path: '',
        data(){
            return {}
        },
        props: {
            data: Array
        },
        mounted(){

        },
        components: {gInput, Radio, RadioGroup, Checkbox, CheckboxGroup, SelectDropDown, FormItem},
        methods: {
            _input(v,vv){
                console.log(v);
                console.log(vv);
            }
        },
        computed: {}
    }
</script>