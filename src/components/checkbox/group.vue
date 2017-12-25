<!--Created by 337547038 on 2017/12/25.-->
<template>
    <div class="checkbox-group">
        <Checkbox v-for="(item,index) in data" :key="index" :value="item.text" :text="item.text"
                  :modelValue="_selectValue(item)" @change="_change"></Checkbox>
    </div>
</template>
<script>
    import Checkbox from './checkbox'
    export default {
        name: 'checkboxGroup',
        data () {
            return {
                groupValue: this.value
            }
        },
        props: {
            data: Array,
            value: Array
        },
        components: {Checkbox},
        methods: {
            _selectValue(item){
                if (this.value.indexOf(item.value) != -1) {
                    return item.value
                } else {
                    return ''
                }
            },
            _change(v){
                console.log('ff');
                console.log(v);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>