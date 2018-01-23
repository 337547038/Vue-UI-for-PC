<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="form">
        <template v-for="(item,index) in data" v-if="array(item)">
            <div class="form-item-group">
                <template v-for="fg in item">
                    <slot :name="fg.name" v-if="fg.type=='slot'"></slot>
                    <Group :data="fg" @input="_input" :inputBlur="inputBlur" :verification="verification" :watch="watch"
                           v-else></Group>
                </template>
            </div>
        </template>
        <template v-else>
            <slot :name="item.name" v-if="item.type=='slot'"></slot>
            <Group :data="item" @input="_input" :inputBlur="inputBlur" :verification="verification" :watch="watch"
                   v-else></Group>
        </template>
        <slot></slot>
    </div>
</template>
<script>
    import Group from './group'
    export default {
        name: 'form',
        path: '',
        data(){
            return {
                watch: '',
                len: '',//表单数组个数
                valueArray: [],//提交时存放表单值
                tipArray: []//提交时存放所有错误
            }
        },
        props: {
            data: Array,
            inputBlur: {
                type: Boolean,
                default: true
            },
            verification: {
                type: Boolean,
                default: true
            }
        },
        mounted(){
            this._getDataLength()
        },
        components: {Group},
        methods: {
            _input(k, v){
                //表单控件改变回调，当前的name和value
                //更新页面data的值，表单数据中的name要等于value值在data中的值
                this.$parent[k] ? this.$parent[k] = v : '';
                this.$emit('input', k, v);
            },
            array(item){
                return Object.prototype.toString.call(item) === '[object Array]'
            },
            submit(){
                //对外提供的依法，改变watch的值，让group去监听并响应
                this.valueArray.splice(0, this.valueArray.length);
                this.tipArray.splice(0, this.tipArray.length);
                this.watch = new Date();
            },
            getValue(data, tipText){
                //提供给子组件的方法
                if (data.name) {
                    this.valueArray.push({name: data.name, value: data.value});
                    tipText ? this.tipArray.push(tipText) : '';
                    if (this.valueArray.length == this.len) {
                        //只返回一次
                        this.$emit('getValue', this.valueArray, this.tipArray);
                    }
                }
            },
            _getDataLength(){
                //取formitem的个数，
                let len = 0;
                for (let i = 0; i < this.data.length; i++) {
                    if (this.array(this.data[i])) {
                        //为数组时还要再for一次
                        for (let j = 0; j < this.data[i].length; j++) {
                            if (this.data[i][j].type != 'slot' && this.data[i][j].name) {
                                len++;
                            }
                        }
                    } else {
                        if (this.data[i].type != 'slot' && this.data[i].name) {
                            len++;
                        }
                    }
                }
                this.len = len;
            }
        },
        computed: {}
    }
</script>