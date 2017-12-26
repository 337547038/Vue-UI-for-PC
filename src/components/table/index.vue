<!--Created by 337547038 on 2017/12/11.-->
<!--example
<dateTable :columns="columns1" :data="data1"></dateTable>-->
<template>
    <div class="table-container" :style="containerStyle" ref="tableContainer">
        <table class="table" :class="{'table-stripe':stripe,'table-border':border,'table-hover':hover}" :style="{width:innerWidth}">
            <colgroup>
                <col v-for="item in columns" :width="item.width">
            </colgroup>
            <thead class="table-head" ref="tableHead" v-if="showHeader">
            <tr>
                <th v-for="item in columns" :class="{[item.className]:item.className}">
                    <div class="table-cell" :style="{width:item.width}" :class="{[item.align]:item.align}">
                        <span v-text="item.title"></span>
                        <i v-if="item.sortable" @click="_orderBy(item,$event)" class="sort"></i>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="d in tableData" :class="{'hover':hover}">
                <td v-for="item in columns" :class="{[item.className]:item.className}">
                    <div class="table-cell" :style="{width:item.width}"
                         :class="{'ellipsis':item.ellipsis,[item.align]:item.align}">
                        <template v-if="item.render">
                            <render :fn="item.render" :item="d[item.key]"></render>
                        </template>
                        <template v-else>
                            {{d[item.key]}}
                        </template>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import render from './redner'
    export default {
        name: 'table',
        data () {
            return {
                tableData: this.data.slice(0),
                sortType: false
            }
        },
        props: {
            columns: Array,
            data: Array,
            height: String,//table的高，溢出显示滚动条，表头固定
            width:String,//最外层div的宽，
            innerWidth:String,//里外table的宽，主要是用来显示横向滚动条，除此外一般都不需要设置
            align: String,
            hover: {//鼠标悬停时的高亮
                type: Boolean,
                default: true
            },
            showHeader: {//是否显示表头
                type: Boolean,
                default: true
            },
            stripe: {//是否显示间隔斑马纹
                type: Boolean,
                default: true
            },
            border: {//是否显示纵向边框
                type: Boolean,
                default: true
            }
        },
        components: {render},
        mounted(){
            this._fixedHead();
        },
        methods: {
            _orderBy(item, el){
                if (item.sortable) {
                    this.sortType = !this.sortType;
                    this.tableData.sort(this._sortBy(item.key, this.sortType));
                    let style = el.target.className;
                    if (style == 'sort asc') {
                        el.target.className = 'sort desc'
                    } else {
                        el.target.className = 'sort asc'
                    }
                }
            },
            _sortBy(sortValue, sortType){
                //第一点击sortType为true即顺序，第二次点击为倒序
                return function (a, b) {
                    var val1 = a[sortValue];
                    var val2 = b[sortValue];
                    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                        val1 = Number(val1);
                        val2 = Number(val2);
                    }
                    if (val1 < val2) {
                        // return -1;//顺序，倒序1
                        return sortType ? -1 : 1
                    } else if (val1 > val2) {
                        //return 1;
                        return sortType ? 1 : -1
                    } else {
                        return 0;
                    }
                };
            },
            _fixedHead(){
                //如果有高和表头，则固定表头
                if (this.height && this.showHeader) {
                    let tableContainer = this.$refs.tableContainer;
                    tableContainer.addEventListener('scroll', this._scrollHandle.bind(this, tableContainer), false)
                }
            },
            _scrollHandle(el){
                let scrollTop = el.scrollTop;
                let head = this.$refs.tableHead.style;
                head.transform = `translateY(${scrollTop}px)`;
                head.webkitTransform = `translateY(${scrollTop}px)`;
            }
        },
        computed: {
            containerStyle(){
                return {
                    overflow: 'auto',
                    height: parseInt(this.height) + 'px',
                    width:this.width
                }
            }
        },
        filters: {},
        directives: {}
    }
</script>