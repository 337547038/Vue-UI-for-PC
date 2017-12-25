<!--Created by 337547038 on 2017/12/24.-->
<template>
    <textarea class="textarea-control" v-model="textValue" ref="text" @focus="_focus" @input="_change" @blur="_blur"
              @keyup="_keyup" @keydown="_keydown" :style="style"></textarea>
</template>
<script>
    export default {
        name: 'textarea',
        data(){
            return {
                textValue: this.value,
                border: 2
            }
        },
        watch: {
            textValue(v){
                this.$emit('input', v);
                if (this.autoHeight) {
                    let el = this.$refs.text;
                    el.style.height = 'auto';
                    el.style.height = (el.scrollHeight + this.border) + 'px';
                }
                /* console.log(el.scrollHeight)//不带边框，包括高和padding
                 console.log(el.offsetHeight)//带边框和padding
                 console.log(el.clientHeight);
                 console.log(el.scrollTop);*/
            }
        },
        props: {
            value: String,
            autoHeight: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '80px'
            },
            focus: Function,
            change: Function,
            blur: Function,
            keyup: Function,
            keydown: Function
        },
        mounted(){
            this._getBorder();
        },
        components: {},
        methods: {
            _focus(e){
                this.$emit('focus', e);
                this.focus ? this.focus(e) : ""
            },
            _change(e){
                this.$emit('change', e);
                this.change ? this.change(e) : ""
            },
            _blur(e){
                this.$emit('blur', e);
                this.blur ? this.blur(e) : ""
            },
            _keyup(e){
                this.$emit('keyup', e);
                this.keyup ? this.keyup(e) : ""
            },
            _keydown(e){
                this.$emit('keydown', e);
                this.keydown ? this.keydown(e) : ""
            },
            _getBorder(){
                //取下边框的高，计算会准确点
                let el = this.$refs.text;
                this.border = el.offsetHeight - el.clientHeight;
            }
        },
        computed: {
            style(){
                return {
                    width: this.width,
                    height: this.height,
                    minHeight: this.height,
                    overflow: this.autoHeight ? 'hidden' : '',
                    boxSizing: 'border-box'
                }
            }
        }
    }
</script>