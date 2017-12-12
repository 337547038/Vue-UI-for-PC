<!--Created by 337547038 on 2017/12/11.-->
<template>
    <table class="v-table" :class="{'table-stripe':stripe,'table-border':border,'table-hover':hover}" ref="table">
        <colgroup>
            <col v-for="item in columns" :width="item.width">
        </colgroup>
        <tbody>
        <tr v-if="showHeader">
            <th v-for="item in columns" :class="{[item.className]:item.className}">
                <div class="table-cell" :style="{width:item.width}" :class="{[item.align]:item.align}">
                    <span v-text="item.title"></span>
                    <i v-if="item.sortable" @click="_orderBy(item,$event)" class="sort"></i>
                </div>
            </th>
        </tr>
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
            /*let table = this.$refs.table.rows[0];
             let cells = table.cells.length;//有多少列
             for (let i = 0; i < cells; i++) {
             console.log(table.cells[i].offsetWidth);//每列的宽
             }*/
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
            }
        },
        computed: {},
        filters: {},
        directives: {}
    }
</script>