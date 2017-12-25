<!--Created by 337547038 on 2017/12/25.-->
<template>
    <div class="demo">
        <h1>Checkbox Demo</h1>
        <h2>Use</h2>
        <h3>1、</h3>
        <div>
            <Checkbox v-model="v1">true</Checkbox>
            （{{v1}}）
        </div>
        <div>
            <Checkbox v-model="v2">false</Checkbox>
            （{{v2}}）
        </div>
        <div>
            <Checkbox text="数字字符" v-model="v3"></Checkbox>
            （{{v3}}）
        </div>
        <div>
            <Checkbox text="空值" v-model="v4"></Checkbox>
            （{{v4}}）
        </div>
        <div>
            <Checkbox text="禁用" :disabled='true' v-model="v5"></Checkbox>
            （{{v5}}）
        </div>
        <div>
            <Checkbox text="000" v-model="v6" value="50"></Checkbox>{{v6}}

        </div>
        <div>
            <CheckboxGroup :data="groupDate" v-model="group"></CheckboxGroup>{{group}}
        </div>
        <p>
            <input type="checkbox" v-model="vtest">{{vtest}}</p>
    </div>
</template>
<script>
    import {Checkbox, CheckboxGroup} from '../components/checkbox/index'
    export default {
        name: 'checkbox',
        path: '/checkbox',
        data () {
            return {
                v1: true,
                v2: false,
                v3: '1',
                v4: '',
                v5: '',
                v6: '5',
                vtest: '122',
                group: ['a1','a3'],
                groupDate: [
                    {text: '选项1', value: 'a1'},
                    {text: '选项2', value: 'a2'},
                    {text: '选项3', value: 'a3'},
                    {text: '选项4', value: 'a4'}
                ]
            }
        },
        props: {},
        components: {Checkbox, CheckboxGroup},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>