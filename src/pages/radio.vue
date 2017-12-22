<!--Created by 337547038 on 2017/12/20.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Radio Demo</h1>
        <Radio v-model="radio">Radio</Radio>
        {{radio}}
        <Radio v-model="radio2">Radio</Radio>
        {{radio2}}
        <Radio>Radio</Radio>
    </div>
</template>
<script>
    import {Radio, RadioGroup} from '../components/radio/index'
    export default {
        name: 'radio',
        path: '/radio',
        data(){
            return {
                radio: true,
                radio2: false,
                radioGroup: 'a2',
                options: [
                    {text: '选项1', value: 'a1'},
                    {text: '选项2', value: 'a2'},
                    {text: '选项3', value: 'a3', disabled: true},
                    {text: '选项4', value: 'a4'}
                ],
                gender:''
            }
        },
        props: [],
        mounted(){
        },
        components: {Radio, RadioGroup},
        methods: {
            radioGroupChange(v){
                console.log('-----------')
                console.log(v)
            }
        },
        computed: {}
    }
</script>