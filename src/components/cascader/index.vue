<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="cascader-box">
        <div class="input-control" :class="{'focus':show,'placeholder':showPlaceholder,'disabled':disabled}"
             v-text="showValue">
        </div>
        <span class="mask" v-show="show"></span>
        <transition name="slide-toggle">
            <div class="cascader-down" v-show="show" @click="_stopPropagation">
                <p class="tips" v-text="tipsText" v-if="tipsText"></p>
                <div class="cascader-tab">
                    <ul class="clearfix">
                        <li :class="{'active':index==activeLayer}" v-for="(item,index) in selectValue"
                            v-text="item.name"
                            @click="activeLayer=index"></li>
                    </ul>
                </div>
                <div class="cascader-area">
                    <ul class="clearfix">
                        <li v-for="item in children" @click="_childrenClick(item)" :title="item.name"><a
                                v-text="item.name"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import jsAddress from './jsAddress'
    export default {
        name: 'cascader',
        data () {
            return {
                show: false,
                selectValue: [],//暂存的值，加工后的数组，同时保存了当前值所在数组的位置
                activeLayer: 0,//当前第几级
                showValue: this.placeholder,//用于展示的值，格式化后显示于输入框的值
                showPlaceholder: this.placeholder ? true : false
            }
        },
        watch: {
            showValue(){
                this.$emit('input', this._formatValue(true));
                this.change ? this.change(this._formatValue(true)) : ""
            }
        },
        props: {
            value: Array,
            placeholder: String,
            disabled: {
                type: Boolean,
                default: false
            },
            tipsText: String,//下拉框下面的提示文字
            selectText: {
                type: Array,
                default: function () {
                    return ['请选择省', '请选择市', '请选择区']
                }
            },
            split: Array,//分隔符
            data: {//下拉选项数据
                type: Array,
                default: function () {
                    return jsAddress
                }
            },
            change: Function
        },
        components: {jsAddress},
        methods: {
            _showHide(e){
                if (this.$el.contains(e.target)) {
                    this.disabled == false ? this.show = !this.show : "";
                } else {
                    this.show = false;
                }
            },
            __init(){
                let length = this.value.length;
                //有值
                if (this.value && length > 0 && length <= 3) {
                    //有值时要默认在最后一级，根据当前和取当前位置拼成数组
                    let data;
                    for (let i = 0; i < length; i++) {
                        if (i == 0) {
                            data = this.data;
                        } else if (i == 1) {
                            const index = this.selectValue[0].i;
                            data = this.data[index].children;
                        } else if (i == 2) {
                            const index = this.selectValue[0].i;
                            const data1 = this.data[index].children;
                            const index2 = this.selectValue[1].i;
                            data = data1[index2].children;
                        }
                        this._setDefaultValue(data, i);
                    }
                    this.activeLayer = length - 1;
                    this.showValue = this._formatValue();
                } else {
                    this.selectValue.push({
                        name: this.selectText[0],
                        i: 0
                    });
                }
            },
            _setDefaultValue(data, index){
                for (let i in data) {
                    if (index == 2) {//最后一个比较特别，是数组不是对象，没有name
                        if (data[i] == this.value[index]) {
                            this.selectValue.push({
                                name: data[i],
                                i: i
                            });
                            break;
                        }
                    } else {
                        if (data[i].name == this.value[index]) {
                            this.selectValue.push({
                                name: data[i].name,
                                i: i
                            });
                            break;
                        }
                    }
                }
            },
            _childrenClick(item){
                if (item.hasChild) {
                    if (this.activeLayer == 0) {
                        this.selectValue.splice(0, this.selectValue.length);//清空
                        //写入当前项
                        this.selectValue.push({
                            name: item.name,
                            i: item.i//当前值在数据组中的位置，for时就可以直接找到当前项
                        });
                        //写入第二项
                        this.selectValue.push({
                            name: this.selectText[1]
                        });
                    } else if (this.activeLayer == 1) {
                        //将请选择修改为当前选择
                        this.selectValue[1] = {
                            name: item.name,
                            i: item.i
                        };
                        //将第三级设为请选择
                        this.selectValue[2] = {name: this.selectText[2]}
                    }
                    this.activeLayer++;//跳到下一级
                } else {
                    //关闭下拉，将值给输入框，这里有可能是第二级
                    this.selectValue[this.activeLayer] = {
                        name: item.name,
                        i: item.i
                    };
                    //如果只有二级时，这里清除下第三级，保证不出错
                    if (this.activeLayer == 1) {
                        this.selectValue.splice(2, 1);
                    }
                    this.showValue = this._formatValue();
                    this.show = false;
                    this.showPlaceholder = false;
                }
            },
            _formatValue(type){
                //将数组转为文本显示出来
                let val = '', array = [];
                for (let i in this.selectValue) {
                    if (type) {
                        //为真返回数组
                        array.push(this.selectValue[i].name)
                    } else {
                        //这里返回显示的值，即文本
                        let split = '';
                        if (this.split && this.split.length == 3) {
                            split = this.split[i];
                        }
                        val += this.selectValue[i].name + split
                    }
                }
                return type ? array : val
            },
            _stopPropagation(e){
                e.stopPropagation();
            }
        },
        computed: {
            children(){
                //根据selectValue和当前的级数
                let array = [];
                let data = this.data;
                if (this.activeLayer == 0) {

                } else if (this.activeLayer == 1) {
                    //根据索引直接找到当前的子级，省去一级级的遍历
                    const index = this.selectValue[0].i;
                    data = this.data[index].children;
                } else if (this.activeLayer == 2) {
                    const index = this.selectValue[0].i;
                    const data1 = this.data[index].children;
                    const index2 = this.selectValue[1].i;
                    data = data1[index2].children;
                }
                for (let i in data) {
                    if (this.activeLayer == 2) {
                        //最后一级没有name，一个数组
                        array.push({
                            name: data[i],
                            i: i,
                            hasChild: false
                        });
                    } else {
                        array.push({
                            name: data[i].name,
                            i: i,
                            hasChild: data[i].children ? true : false
                        });
                    }
                }
                return array;
            }
        },
        mounted(){
            document.addEventListener('click', this._showHide);
            this.__init();
        },
        filters: {}
    }
</script>