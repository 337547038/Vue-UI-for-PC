<!--Created by 337547038 on 2017/12/15.-->
<!--example
<Collapse value="1">
    <Panel name="1">
        标题
        <div slot="content">内容</div>
    </Panel>
    <Panel name="2">
        标题2
        <div slot="content">内容2</div>
    </Panel>
    <Panel name="3">
        标题3
        <div slot="content">内容3</div>
    </Panel>
</Collapse>-->
<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'collapse',
        data () {
            return {
                active: this.value
            }
        },
        props: {
            value: String,
            accordion: {//风琴模式
                type: Boolean,
                default: false
            },
            change: Function
        },
        components: {},
        methods: {
        },
        computed: {},
        mounted(){

        },
        filters: {}
    }
</script>