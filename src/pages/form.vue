<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="demo">
        <comHeader name="form"/>
        <FormItem label="名称" labelClass="icon-user" class="auto-height">
            <gInput v-model="v1"></gInput>
        </FormItem>

    </div>
</template>
<script>
    import gForm from '../components/form/form'
    import FormItem from '../components/form/formItem'
    import gInput from '../components/input/index'
    export default {
        name: 'form',
        path: "/form",
        data () {
            return {
                v1: ""
            }
        },
        props: {},
        components: {gForm, FormItem, gInput},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>