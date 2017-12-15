<!--Created by 337547038 on 2017/12/15.-->
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