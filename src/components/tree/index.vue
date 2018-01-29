<!--Created by 337547038 on 2018/1/26.-->
<template>
    <div class="tree">
        <ul>
            <treeItem v-for="(item,index) in data" :data="item" :len="data.length" :num="index" :key="index"
                      @click="_click" :active="active"></treeItem>
        </ul>
    </div>
</template>
<script>
    import treeItem from './treeItem'
    export default {
        name: 'tree',
        data () {
            return {
                active: ''
            }
        },
        props: {
            data: Array
        },
        components: {treeItem},
        methods: {
            _click(name){
                this.active = name;
                this.$emit('click', name);
                //console.log(e);
                //this.$emit('click', name);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>