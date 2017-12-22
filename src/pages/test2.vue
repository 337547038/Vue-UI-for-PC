<!--Created by 337547038 on 2017/12/5.-->
<template>
    <div>
        000
        <textarea id="tValue" style="overflow-y:hidden; height:20px;"
                  onpropertychange="this.style.height=this.scrollHeight + 'px'"
                  oninput="this.style.height=this.scrollHeight + 'px'"></textarea>
        <p @click="click">click</p>
        <textarea v-model="value" ref="text"></textarea>
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
        watch: {
            value(){
                let el = this.$refs.text;
                el.style.height = el.scrollHeight + 'px';
                //console.log(el.style.height='100px')
                console.log(el.scrollHeight)
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
                this.value = 5
            }
        },
        directives: {
            textarea(el){
                el.style.height = '50px';
                el.onchange = function () {
                    console.log('chagen')
                }
                console.log(el.style.scrollHeight)
            }
        }
    }
</script>