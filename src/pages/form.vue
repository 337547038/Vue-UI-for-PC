<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="demo">
        开发中。。
        <!--<comHeader name="form"/>-->
        <!--<FormItem labelClass="icon-user" class="auto-height">
            <gInput v-model="v1"></gInput>
        </FormItem>

        <FormItem label="密码：" labelClass="icon-user">
            <gInput v-model="v1"></gInput>
        </FormItem>
        <hr>
        <gForm :data="formData"></gForm>-->
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
                v1: "",
                validate: [
                    {type: "required", msg: "用户名不能为空"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ],
                formData: [
                    {
                        item: {label: "name",class:'auto-height'},
                        control: {control: 'input', value: 'user', placeholder: 'please input name'},
                        validate: [
                            {type: "required", msg: "用户名不能为空"},
                            {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                            {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                        ]
                    },
                    {
                        item: {label: 'password'},
                        control: {control: 'input', type: 'password', value: '', placeholder: 'please input password'}
                    }
                ]
            }
        },
        props: {},
        components: {gForm, FormItem, gInput},
        methods: {

        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>