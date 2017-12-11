<!--Created by 337547038 on 2017/12/11.-->
<template>
    <table class="v-table" :class="{'table-stripe':stripe,'table-border':border,'table-hover':hover}">
        <colgroup>
            <col v-for="item in columns" :width="item.width">
        </colgroup>
        <tbody>
        <tr v-if="showHeader">
            <th v-for="item in columns" :class="{[item.className]:item.className}">
                <div class="table-cell" :style="{width:item.width}" :class="{[item.align]:item.align}"
                     v-text="item.title"></div>
            </th>
        </tr>
        <tr v-for="d in data" :class="{'hover':hover}">
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
        },
        computed: {},
        filters: {}
    }
</script>