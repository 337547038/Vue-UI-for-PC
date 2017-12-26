<!--Created by 337547038 on 2017/12/18.-->
<!--example
<Input placeholder="双向绑定" v-model="value"></Input>-->
<template>
    <div class="input-box">
        <input class="input-control" v-bind="$props" v-model="inputValue" :type="inputType" :name="name"
               :class="{'disabled':disabled}"
               @focus="_focus"
               @blur="_blur"
               @keyup="_keyup"
               @keydown="_keydown">
        <span class="close-icon icon-close" v-if="clearIcon&&inputValue" @click="inputValue=''"></span>
        <span :class="['eye-icon',{'icon-eye':eyeShow,'icon-eye-close':!eyeShow}]"
              v-if="inputValue&&showEye && type=='password'" @click="eyeShow=!eyeShow"></span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'input',
        data(){
            return {
                inputValue: this.value,
                inputType: this.type,//密码框时要改，所以...
                eyeShow: false//睁眼闭眼
            }
        },
        watch: {
            inputValue(v){
                this.$emit('input', v);
            },
            eyeShow(v){
                //显示或隐藏密码
                this.inputType = v ? 'text' : 'password';
            }
        },
        props: {
            type: {
                type: String,
                default: 'text'
            },
            placeholder: String,
            value: String,
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            maxLength: {
                type: Number,
                default: 50
            },
            clearIcon: {
                type: Boolean,
                default: false
            },
            showEye: {
                type: Boolean,
                default: true
            },
            name: String,
            focus: Function,
            change: Function,
            blur: Function,
            keyup: Function,
            keydown: Function
        },
        mounted(){
        },
        components: {},
        methods: {
            _focus(e){
                this.$emit('focus', e);
                this.focus ? this.focus(e) : "";
            },
            _blur(e){
                this.$emit('blur', e);
                this.blur ? this.blur(e) : "";
            },
            _keyup(e){
                this.$emit('keyup', e);
                this.keyup ? this.keyup(e) : "";
            },
            _keydown(e){
                this.$emit('keydown', e);
                this.keydown ? this.keydown(e) : "";
            }
        },
        computed: {}
    }
</script>