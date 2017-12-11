<!--Created by 337547038 on 2017/12/11.-->
<template>
    <div class="loading" v-if="active" :class="className" :style="{position:position?'fixed':''}">
        <div class="overlay" v-if="maskLayer"></div>
        <div class="loading-content">
            <span v-for="item in nodeNum"></span>
            <slot/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Loading',
        data () {
            return {
                position: false,
                active: this.show
            }
        },
        props: {
            show: {
                type: Boolean,
                default: true
            },
            maskLayer: {
                type: Boolean,
                default: false
            },
            nodeNum: {
                type: Number,
                default: 0
            },
            className: String
        },
        components: {},
        mounted(){
        },
        methods: {
            //提供给this.$loading的方法
            open(){
                this.position = true;
            },
            close(){
                this.active = false;
            }
        },
        computed: {},
        filters: {}
    }
</script>