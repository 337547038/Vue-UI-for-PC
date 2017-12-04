<template>
    <div class="a"><p>000</p>
{{num}}
    </div>
</template>

<script>

    import Vue from 'vue'
    import plugin from '../plugins/first'
    Vue.use(plugin)

    export default {
        data(){
            return {
                num: 1
            }
        },
        mounted(){
            this.num = this.$doubleNumber(this.num);
            Vue.test()
            /* test.show({
             txt: 'abc13',
             ok: function () {
             console.log('ok');
             }
             });*/
            //this.$refs.a.open();
            //this.$alert({})
            //console.log(alert());
            //this.$message("121313123")
        },
        name: 'alert',

        components: {},
        methods: {
            /* a(){
             console.log('aaa');
             },
             ab(){
             console.log('aaabbb');
             }*/
        }

    }
</script>
