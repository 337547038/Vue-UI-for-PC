<template>
    <div class="a"><p>000</p>
{{num}}
    </div>
</template>

<script>

    export default {
        name:'test',
        data(){
            return {
                num: 1
            }
        },
        mounted(){
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
