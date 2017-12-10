<!--Created by 337547038 on 2017/12/8.-->
<template>
    <div class="tab-pane" :class="{'active':name==$parent.active}" v-show="name==$parent.active"><slot></slot></div>
</template>
<script>
    export default {
        name: 'tabsPane',
        data(){
            return {}
        },
        props: ['label','tip','disabled','name'],
        mounted(){
        },
        components: {},
        methods: {},
        computed: {}
    }
</script>