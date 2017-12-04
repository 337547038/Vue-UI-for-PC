<template>
    <div class="st-dialog">
        {{txt}}
        <div class="" v-if="show">if</div>
        <div class="" v-if="show2">if2</div>
        <button @click="click">btn</button>
    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'dialog',
        data () {
            return {
                show2: false
            }
        },
        props: ['txt', 'show', 'ok'],
        methods: {
            open(){
                this.show2 = true;
            },
            click: function () {
                //console.log('cli');
               // this.ok();
               // this.$emit('ok')
            }
        }
    }
</script>

