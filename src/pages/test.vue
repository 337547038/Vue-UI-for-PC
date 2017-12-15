<!--Created by 337547038 on 2017/12/5.-->
<template>
    <div>
        000

        <p @click="click">click</p>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Test from '../components/test.vue'
    export default {
        name: 'test',
        path: '/test',
        data(){
            return {
                value: 2
            }
        },
        mounted(){

            /*let message = Vue.extend(Test);
            let component = new message().$mount();
            document.body.appendChild(component.$el)*/
            var message = Vue.extend(Test)
            let component = new message().$mount();
            document.body.appendChild(component.$el)
        },
        components: {Test},
        methods: {
            click(){
           this.value=5
            }
        }
    }
</script>