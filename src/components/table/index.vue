<!--Created by 337547038 on 2017/12/11.-->
<template>
    <table class="v-table" :class="{'table-stripe':stripe,'table-border':border,'table-hover':hover}">
        <colgroup>
            <col width="200">
        </colgroup>
        <tbody>
        <tr v-if="showHeader">
            <th v-for="item in columns" :class="{[item.className]:item.className}">
                <div class="table-cell" :style="{width:item.width}" :class="{[item.align]:item.align}"
                     v-text="item.title"></div>
            </th>
        </tr>
        <tr v-for="d in data" :class="{'hover':hover}">
            <td v-for="item in columns" :style="{width:item.width}" :class="{[item.className]:item.className}">
                <!--<div class="table-cell" :style="{width:item.width}"
                     :class="{'ellipsis':item.ellipsis,[item.align]:item.align}">
                    {{d[item.key]}}
                </div>-->
                <!--<div v-html="_getContent(item.render)"></div>-->
                <render :fn="item.render" :item="d"></render>
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
            return {}
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

        },
        methods: {
            _getContent(c){
                if (typeof c === 'function') {

                }
            }
        },
        computed: {},
        filters: {}
    }
</script>