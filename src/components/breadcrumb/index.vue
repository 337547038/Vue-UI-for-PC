<!--Created by 337547038 on 2018/1/30.-->
<template>
    <div class="breadcrumb clearfix">
      <template v-for="(item,index) in data">
          <router-link v-text="item.title" :class="{'last-child':data.length==index+1}" :to="item.href"></router-link><span v-text="separator" v-if="data.length>index+1"></span>
      </template>
    </div>
</template>
<script>
    export default {
        name: 'breadcrumb',
        data () {
            return {}
        },
        props: {
            data:Array,
            separator:String
        },
        components: {},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>