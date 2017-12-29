<!--Created by 337547038 on 2017/12/29.-->
<template>
    <FormItem v-bind="data.item" :showTip="showTip" :tipText="tipText" :tipType="tipType">
        <gInput v-model.trim="data.value" v-if="data.type=='input'||data.type=='btnCode'||data.type=='imgCode'"
                v-bind="data.control"
                :class="{'input-code':data.type=='btnCode'||data.type=='imgCode'}"
                @input="_input(data,$event)"></gInput>
        <RadioGroup v-else-if="data.type=='radio'" v-bind="data.control" v-model="data.value" @input="_input(data,$event)"></RadioGroup>
        <CheckboxGroup v-bind="data.control" v-else-if="data.type=='checkbox'" v-model="data.value" @input="_input(data,$event)"></CheckboxGroup>
        <SelectDropDown v-else-if="data.type=='select'" v-model="data.value" v-bind="data.control" @input="_input(data,$event)"></SelectDropDown>
        <gTextArea v-model="data.value" v-else-if="data.type=='textarea'" v-bind="data.control" @input="_input(data,$event)"></gTextArea>
        <div class="form-text" v-else-if="data.type=='text'" v-text="data.value" v-bind="data.control"></div>
        <DatePicker v-model="data.value" v-bind="data.control" v-else-if="data.type=='datePicker'" @input="_input(data,$event)"></DatePicker>
        <a v-if="data.type=='btnCode'" v-text="data.code.text" @click="_inputCodeClick(data,$event)" class="btn-code"
           v-bind="data.code" click=""></a>
        <img v-if="data.type=='imgCode'" v-bind="data.code" click="" @click="_inputCodeClick(data,$event)" class="img-code"/>
        <div class="form-other" v-if="data.other" v-text="data.other"></div>
    </FormItem>
</template>
<script>
    import gInput from '../input/index'
    import {Radio, RadioGroup} from '../radio/index'
    import {Checkbox, CheckboxGroup} from '../checkbox/index'
    import SelectDropDown from '../select/index'
    import gTextArea from '../textarea/index'
    import FormItem from './formItem'
    import DatePicker from '../datePicker/index'
    import ValidateRules from './validateRules'
    export default {
        name: 'formGroup',
        data () {
            return {
                showTip: false,
                tipText: '',
                tipType: 'failure'
            }
        },
        props: ['data'],
        components: {gInput, Radio, RadioGroup, Checkbox, CheckboxGroup, SelectDropDown, FormItem, ValidateRules,gTextArea,DatePicker},
        methods: {
            _input(data, value){
                if (data.validate) {
                    let result = ValidateRules(value, data.validate);
                    //通过时返回空，不通过返回错误提示
                    if (result) {
                        this.showTip = true;
                        this.tipText = result;
                        this.tipType = 'failure'
                    } else {
                        this.showTip = true;
                        this.tipText = '';
                        this.tipType = 'success'
                    }
                }
               /* console.log('input');
                console.log(value);*/
                this.$emit('input', data.name, value);
            },
            _inputCodeClick(data, e){
                //验证码点击事件
                data.code.click ? data.code.click(e) : "";
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>