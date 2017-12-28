<!--Created by 337547038 on 2017/12/20.-->
<!--example
<DatePicker v-model="value"></DatePicker>-->
<template>
    <div class="date-picker-input" :class="{'date-picker-clear':value&&showClear}">
        <input type="text" :placeholder="placeholder" class="input-control" :class="{'disabled':disabled}"
               ref="input" :value="value"
               readonly="readonly" :disabled="disabled">
        <i class="icon-date" v-if="!disabled"></i>
        <i class="icon-close" @click="_close" v-if="showClear&&!disabled"></i>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue'
    import DatePicker from './datePicker'
    const picker = Vue.extend(DatePicker);
    export default {
        name: 'dateIndex',
        data () {
            return {
                component: '',//挂载的组件
                offset: {},//当前input位置坐标
                status: false//防止多次挂裁
            }
        },
        watch: {},
        props: {
            value: [String, Number],
            placeholder: String,
            showClear: {//显示清空
                type: Boolean,
                default: true
            },
            disabledDate: {
                type: Function,
                default: function () {
                    return false
                }
            },
            format: {
                type: String,
                default: 'yMD'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'normal'
            },
            split: {
                type: String,
                default: '至'
            },
            innerHTML: Function
        },
        components: {DatePicker},
        methods: {
            _open(e){
                //判断当前点击元素在组件里即展开，即属于组件子节点，不在关闭
                if (this.$el.contains(e.target) && !this.disabled && !this.status) {
                    this.offset = this.getOffset(this.$refs.input);
                    const propsData = Object.assign({}, this._propsData());
                    this.component = new picker({propsData}).$mount();
                    document.body.appendChild(this.component.$el);
                    this.status = true;
                } else {
                    if (this.component) {
                        this.component.close();
                        this.status = false
                    }
                }
            },
            _close(e){
                //清空并关闭
                this.$emit('input', '');
                this.component ? this.component.close() : "";
            },
            _propsData(){
                //参数
                return {
                    offset: this.offset,
                    value: this.value,
                    input: (time)=> {
                        this.$emit('input', time);//返回父组件更新
                        this.status = false
                    },
                    disabledDate: (time)=> {//不能选的日期
                        return this.disabledDate ? this.disabledDate(time) : ""
                    },
                    format: this.format,
                    type: this.type,
                    split: this.split,
                    innerHTML: (time)=> {
                        return this.innerHTML ? this.innerHTML(time) : ""
                    }
                }
            }
        },
        computed: {},
        mounted(){
            document.addEventListener('click', this._open);
        },
        beforeDestroy () {
            document.removeEventListener('click', this._open)
        },
        filters: {}
    }
</script>