<!--Created by 337547038 on 2017/12/20.-->
<template>
    <div class="date-picker-input">
        <input type="text" :placeholder="placeholder" v-model="dateValue" class="input-control" @click="_open">
        <i class="icon-date" @click="_open" v-show="!showIconType"></i>
        <i class="icon-close" @click="_close" v-show="showIconType"></i>
    </div>
</template>
<script>
    import Vue from 'vue'
    import DatePicker from './datePicker'
    export default {
        name: 'dateIndex',
        data () {
            return {
                dateValue: this.value,//输入框值
                component: '',//挂载的组件
                showIconType: false//显示icon图片，清空跟日期图标只显示一个
            }
        },
        watch: {
            dateValue(v){
                this.$emit('input', v);
                this.showIconType = v ? true : false;
            }
        },
        props: {
            value: String,
            placeholder: String
        },
        components: {DatePicker},
        methods: {
            _open(){
                document.body.appendChild(this.component.$el);
                this.component.open();
                //如果有值就显示清空
                if (this.dateValue) {
                    this.showIconType = true
                }
            },
            _close(e){
                //清空并关闭
                this.component.close();
                this.dateValue = '';
            },
            _propsData(){
                return {
                    title: '1',
                    back() {
                        console.log('back');
                    },
                    show: true
                }
            }
        },
        computed: {},
        mounted(){
            const picker = Vue.extend(DatePicker);
            const propsData = Object.assign({}, this._propsData());
            this.component = new picker({propsData}).$mount();
        },
        filters: {}
    }
</script>