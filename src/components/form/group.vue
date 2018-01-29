<!--Created by 337547038 on 2017/12/29.-->
<template>
    <FormItem v-bind="data.item" :showTip="showTip" :tipText="tipText" :tipType="tipType">
        <gInput v-model.trim="data.value" v-if="data.type=='input'||data.type=='btnCode'||data.type=='imgCode'"
                v-bind="data.control"
                :class="{'input-code':data.type=='btnCode'||data.type=='imgCode'}"
                @input="_input(data,$event)" @blur="_blur(data,$event)"></gInput>
        <RadioGroup v-else-if="data.type=='radio'" v-bind="data.control" v-model="data.value"
                    @input="_input(data,$event)"></RadioGroup>
        <CheckboxGroup v-bind="data.control" v-else-if="data.type=='checkbox'" v-model="data.value"
                       @input="_input(data,$event)"></CheckboxGroup>
        <SelectDropDown v-else-if="data.type=='select'" v-model="data.value" v-bind="data.control"
                        @input="_input(data,$event)"></SelectDropDown>
        <gTextArea v-model="data.value" v-else-if="data.type=='textarea'" v-bind="data.control"
                   @input="_input(data,$event)"></gTextArea>
        <div class="form-text" v-else-if="data.type=='text'" v-text="data.value" v-bind="data.control"></div>
        <DatePicker v-model="data.value" v-bind="data.control" v-else-if="data.type=='datePicker'"
                    @input="_input(data,$event)"></DatePicker>
        <gSwitch v-model="data.value" v-else-if="data.type=='switch'" v-bind="data.control"></gSwitch>
        <a v-if="data.type=='btnCode'" v-text="countdown||data.code.text" @click="_inputCodeClick(data,$event)"
           class="btn-code" :class="[data.code.class,{'disabled':codeDisabled}]"></a>
        <img v-if="data.type=='imgCode'" @click="_imgCodeClick(data,$event)"
             class="img-code" :src="data.code.src"/>
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
    import gSwitch from '../switch/index'
    import ValidateRules from './validateRules'
    export default {
        name: 'formGroup',
        data () {
            return {
                showTip: false,
                tipText: '',
                tipType: 'failure',
                countdown: '',//验证码倒计时显示
                codeDisabled: false//验证码添加不可点击样式
            }
        },
        props: ['data', 'inputBlur', 'verification', 'watch'],
        watch: {
            watch(){
                //form设置的一个方法，每次触发时改变一次。每改变一次去验证一次
                this._verification(this.data, this.data.value);
                //将验证结果和表单值返回去
                this.$parent.getValue ? this.$parent.getValue(this.data, this.tipText) : ''
            }
        },
        components: {
            gInput,
            Radio,
            RadioGroup,
            Checkbox,
            CheckboxGroup,
            SelectDropDown,
            FormItem,
            ValidateRules,
            gTextArea,
            DatePicker,
            gSwitch
        },
        methods: {
            _input(data, value){
                this._verification(data, value);
                this.$emit('input', data.name, value);
            },
            _blur(data, e){
                if (this.inputBlur) {
                    this._verification(data, e.target.value);
                    this.$emit('blur', data.name, e.target.value);
                }
            },
            _verification(data, value){
                if (data.validate && this.verification) {
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
            },
            _inputCodeClick(data, e){
                //验证码点击事件
                if (!this.codeDisabled) {
                    this.codeDisabled = true;
                    let th = this;
                    let time = data.code.time;
                    let setTime = setInterval(function () {
                        if (time > 0) {
                            th.countdown = data.code.text2.replace('x', time);
                            time--;
                        } else {
                            th.codeDisabled = false;
                            th.countdown = data.code.text3;
                            clearInterval(setTime);
                        }
                    }, 1000);
                    data.code.click ? data.code.click(e) : "";
                }
            },
            _imgCodeClick(data, e){
                data.code.click ? data.code.click(e) : "";
            }
        },
        computed: {},
        mounted(){

        },
        filters: {}
    }
</script>