<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="form">
        <template v-for="(item,index) in data" v-if="array(item)">
            <div class="form-item-group">
                <template v-for="fg in item">
                    <slot :name="fg.name" v-if="fg.type=='slot'"></slot>
                    <Group :data="fg" @input="_input" v-else></Group>
                </template>
            </div>
        </template>
        <template v-else>
            <slot :name="item.name" v-if="item.type=='slot'"></slot>
            <Group :data="item" @input="_input" v-else></Group>
        </template>
        <slot></slot>
    </div>
</template>
<script>
    import Group from './group'
    export default {
        name: 'form',
        path: '',
        data(){
            return {}
        },
        props: {
            data: Array
        },
        mounted(){

        },
        components: {Group},
        methods: {
            _input(k, v){
                //表单控件改变回调，当前的name和value
                this.$emit('input', k, v);
            },
            array(item){
                return Object.prototype.toString.call(item) === '[object Array]'
            }
        },
        computed: {}
    }
</script>