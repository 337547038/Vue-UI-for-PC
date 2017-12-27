<!--Created by 337547038 on 2017/12/27.-->
<template>
    <div class="form-group" @input="input">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'formItem',
        data () {
            return {}
        },
        props: {},
        components: {},
        methods: {
            input(){
                console.log('input');
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>