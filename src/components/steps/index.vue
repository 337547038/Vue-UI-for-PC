<!--Created by 337547038 on 2018/1/29.-->
<template>
    <div class="steps clearfix">
        <div class="steps-item" v-for="(item,index) in data" :class="{'active':active>=index+1}" @click="_click(index)">
            <i class="steps-icon" :class="['icon-'+item.icon]"><span v-text="index+1"></span></i>
            <span class="steps-title" v-text="item.title"></span>
            <span class="steps-intro" v-text="item.description"></span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'steps',
        data () {
            return {}
        },
        props: {
            data: Array,
            active: {
                type: Number,
                default: 0
            }
        },
        components: {},
        methods: {
            _click(index){
                this.$emit('click', index);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>