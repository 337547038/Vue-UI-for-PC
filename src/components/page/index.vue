<!--Created by 337547038 on 2017/12/13.-->
<!--example
<Page :total="100"></Page>-->
<template>
    <div class="page">
        <slot/>
        <a href="javascript:;" title="上一页" class="prev" :class="{'disabled':active==1}" @click="_goTo(-1)"></a>
        <a href="javascript:;" title="1" @click="_goTo(1)" :class="{'active':active==1}" v-if="active>=showNum">1</a>
        <a href="javascript:;" :title="titleTipP" class="jump-prev" @click="_jumpTo(-1)" v-if="active>=showNum"></a>
        <a href="javascript:;" :title="item" v-for="item in lists" v-text="item" :class="{'active':item==active}"
           @click="_goTo(item)"></a>
        <a href="javascript:;" :title="titleTipN" class="jump-next" @click="_jumpTo(1)" v-if="jumpNext"></a>
        <a href="javascript:;" :title="pageCount" @click="_goTo(pageCount)" :class="{'active':active==pageCount}"
           v-if="pageCount>=1">{{pageCount}}</a>
        <a href="javascript:;" title="下一页" class="next" :class="{'disabled':pageCount<=active}" @click="_goTo(0)"></a>
        <span class="show-elevator" v-if="showElevator">
            跳至<input type="text" v-model="goToPage" class="page-input" maxlength="5">页
        </span>
    </div>
</template>
<script>
    export default {
        name: '',
        data () {
            return {
                active: this.value,//当前页
                pageCount: Math.ceil(this.total / this.pageSize),//一共分多少页
                goToPage: 1//快速跳到第几页
            }
        },
        created(){

        },
        props: {
            value: {//当前面码
                type: Number,
                default: 1
            },
            total: {//数据总数
                type: Number,
                default: 0
            },
            pageSize: {//每页条数
                type: Number,
                default: 10
            },
            showElevator: {//显示快速切换到某一页
                type: Boolean,
                default: true
            },
            showNum: {//点击折叠向前或向后跳多少页
                type: Number,
                default: 5
            },
            change: Function//页码改变的回调，返回改变后的页码
        },
        components: {},
        mounted(){
        },
        watch: {
            goToPage(){
                if (parseInt(this.goToPage)) {
                    let page = parseInt(this.goToPage);
                    if (page > this.pageCount) {
                        page = this.pageCount;
                    } else if (page < 1) {
                        page = 1
                    }
                    this._goTo(page);
                }
            }
        },
        methods: {
            _goTo(page){
                //跳到第几页，-1表示上一页，0表示下一页，大于0表示所指页
                if (page === -1 && this.active > 1) {
                    this.active--;
                } else if (page === 0 && this.active < this.pageCount) {
                    this.active++;
                } else if (page > 0 && page <= this.pageCount) {
                    this.active = page;
                }
                this.$emit('input', this.active);
                this.change ? this.change(this.active) : "";
            },
            _jumpTo(type){
                //向前或向后N页
                let page;
                if (type > 0) {
                    //向后，如果当前页+后面页大于最后一页，则显示最后页
                    if (this.active + this.showNum > this.pageCount) {
                        page = this.pageCount
                    } else {
                        page = this.active + this.showNum
                    }
                } else {
                    //向前
                    if (this.active - this.showNum < 1) {
                        page = 1
                    } else {
                        page = this.active - this.showNum
                    }
                }
                this._goTo(page);
            }
        },
        computed: {
            titleTipP(){
                return `向前${this.showNum}页`
            },
            titleTipN(){
                //鼠标经过提示
                return `向后${this.showNum}页`
            },
            jumpNext(){
                //向前时要大于this.showNum才显示，即当第this.showNum+1页时显示
                //向后时当前页this.active+this.showNum/2<this.pageCount时显示,
                //也就是最多的时候会连着显示this.showNum个，如showNum为单数，以当前页为中心，两边对称
                if (this.active + Math.round(this.showNum / 2) < this.pageCount) {
                    return true
                } else {
                    return false
                }
            },
            lists(){
                let start = 1;
                let end = this.pageCount - 1;//最后页一直显示的，这里减1
                //默认下end=active+
                if (this.active + parseInt(this.showNum / 2) < this.pageCount) {
                    end = this.active + parseInt(this.showNum / 2)
                }
                if (this.active >= this.showNum) {
                    start = this.active - parseInt(this.showNum / 2)
                }
                //如果只有一页时
                let array = [];
                while (start <= end) {
                    array.push(start);
                    start++;
                }
                return array;
            }
        },
        filters: {}
    }
</script>