<!--Created by 337547038 on 2017/12/7.-->
<template>
    <div class="select-drop-down" :class="{'open':show,[className]:className}" ref="select">
        <div class="select-control" @click="_showHide">
            <div class="input-control" :class="{'focus':show,'placeholder':placeholder,'disabled':disabled}"
                 v-text="text">
            </div>
        </div>
        <div class="drop-down" v-show="show">
            <div class="drop-down-border" :style="showLiNum">
                <div class="select-search-box" v-if="showSearch" @click="_searchBoxClick">
                    <input type="text" class="input-control" :placeholder="searchPlaceholder" v-model="keyWord">
                </div>
                <ul>
                    <li v-for="item in filterOptionArray" :data-value="item.value" @click="_itemClick(item,$event)"
                        :class="{'disabled':item.disabled,'active':value==item.value}" ref="li">{{item.text}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios';
    export default {
        name: 'select',
        data () {
            return {
                show: false,
                optionArray: this.option,//下拉数据列表
                placeholder: true,
                text: this.defaultText,//默认显示的项
                keyWord: '',
                liHeight: ''//li高度
            }
        },
        props: {
            value: String,//通过v-model传进来
            defaultText: String,//默认显示的文本
            className: String,
            showNum: String,//显示下拉个数，超出显示滚动条
            option: Array,//下拉选顶
            optionUrl: String,//请求数据地址，同时传了option，请求成功后会更新option
            onChange: Function,//下拉选择后回调
            disabled: {//是否禁用
                type: Boolean,
                default: false
            },
            showSearch: {//显示搜索输入框
                type: Boolean,
                default: false
            },
            searchPlaceholder: String//仅对搜索有效，搜索输入框placeholder提示语
        },
        components: {},
        mounted(){
            this._setFirstText();
            //注册body点击事件
            document.body.addEventListener('click', this._bodyClick, false);
            //加载数据
            this._ajaxUrl();
        },
        methods: {
            _showHide(e){
                this.disabled == false ? this.show = !this.show : "";
                //e.preventDefault();
                //e.stopPropagation();
                //清空已有搜索内容
                this.keyWord = '';
                this.$nextTick(()=> {
                    this.liHeight = this.getHeight(this.$refs.li[0]);
                });
            },
            _itemClick(item, e){
                if (!item.disabled) {
                    //利用 $emit 触发 input 事件
                    this.$emit('input', item.value);
                    this.text = item.text;
                    this.show = false;
                    this.onChange ? this.onChange(item) : "";
                }
                e.stopPropagation();
            },
            _setFirstText(){
                //设置第一项选项；如果有值则选中对应项，如果没值显示默认，没默认显示选第一项
                if (this.value) {
                    for (let i in this.optionArray) {
                        if (this.optionArray[i].value == this.value) {
                            this.text = this.optionArray[i].text;
                            //有值时去掉placeholder样式
                            this.placeholder = false;
                            break;
                        }
                    }
                } else {
                    if (!this.defaultText) {
                        this.text = this.optionArray[0].text;
                        //有值时去掉placeholder样式
                        this.placeholder = false;
                    }
                }
            },
            _bodyClick(e){
                //this.show ? this.show = false : "";
                //有多个的时候点击时也要让另外已下拉的收起来
                //这里采用判断父元素的方法
                var a = this._findParentNode(e.target, 'select-drop-down');
                if (a !== this.$refs.select) {
                    this.show = false;
                }
            },
            _findParentNode(el, cls){
                if (el.nodeName.toUpperCase() === "BODY") {
                    return false
                } else if (el.className.search(cls) > -1) {
                    return el
                } else {
                    return this._findParentNode(el.parentNode, cls);
                }
            },
            _searchBoxClick(e){
                e.stopPropagation();
            },
            _ajaxUrl(){
                if (this.optionUrl) {
                    axios.get(this.optionUrl).then((res)=> {
                        this.optionArray = res.data.result;
                        this._setFirstText();
                    }, res=> {
                        console.log('error');
                    });
                }
            }
        },
        computed: {
            filterOptionArray(){
                if (this.showSearch) {
                    //带搜索时
                    let newArray = [];
                    for (let i in this.optionArray) {
                        if (this.optionArray[i].text.indexOf(this.keyWord) > -1) {
                            newArray.push(this.optionArray[i]);
                        }
                    }
                    return newArray;
                } else {
                    return this.optionArray
                }
            },
            showLiNum(){
                if (this.showNum && this.optionArray.length > this.showNum) {
                    return {
                        height: this.liHeight * this.showNum + 'px'
                    }
                }
            }
        },
        filters: {}
    }
</script>