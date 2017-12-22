<!--Created by 337547038 on 2017/12/18.-->
<template>
    <div class="input-box">
        <input class="input-control" v-bind="$props" v-model="inputValue" :type="inputType" :class="{'disabled':disabled}"
               @focus="focus"
               @blur="blur"
               @keyup="keyup"
               @keydown="keydown">
        <span class="icon icon-close" v-if="icon && type=='text'" @click="inputValue=''" v-show="clearBtn"></span>
        <span :class="['icon',{'icon-eye-open':eyeShow,'icon-eye-close':!eyeShow}]" v-if="icon && type=='password'"
              v-show="clearBtn" @click="eyeShow=!eyeShow"></span>
    </div>
</template>
<script>
    export default {
        name: 'input',
        data(){
            return {
                inputValue: this.value,
                clearBtn: false,
                inputType: this.type,//密码框时要改，所以...
                eyeShow: false//睁眼闭眼
            }
        },
        watch: {
            inputValue(v){
                if (this.icon && v) {
                    this.clearBtn = true;
                } else {
                    this.clearBtn = false;
                }
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
            icon: {
                type: Boolean,
                default: false
            }
            //onkeyup:Function
        },
        mounted(){
        },
        components: {},
        methods: {
            focus(e){
                if (this.icon && this.inputValue) {
                    this.clearBtn = true;
                }
                this.$emit('focus', e);
            },
            blur(e){
                //密码时失去焦点不隐藏，只要有值就不隐藏
                if (this.type != 'password') {
                    this.clearBtn = false;
                }
                this.$emit('blur', e);
            },
            keyup(e){
                this.$emit('keyup', e);
            },
            keydown(e){
                this.$emit('keydown', e);
            }
        },
        computed: {}
    }
</script>