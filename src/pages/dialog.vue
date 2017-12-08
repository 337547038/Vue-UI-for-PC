<template>
    <div class="demo">
        <h1>Dialog Demo</h1>
        <p>&nbsp;</p>
        <h3>用法：</h3>
        <p>在main.js中引入</p>
        <pre>
            import dialog from '../src/components/plugins/dialog'
            Vue.use(dialog);
        </pre>
        <p>在script任意位置</p>
        <pre>
            this.$dialog({title:"this is title"})
        </pre>
        <h3>示例：</h3>
        <ul class="list">
            <li><a href="javascript:;" @click="openAlert">1、open alert</a></li>
            <li><a href="javascript:;" @click="openAlert2">2、not title</a></li>
            <li><a href="javascript:;" @click="openAlert3">3、callBack</a></li>
            <li><a href="javascript:;" @click="openAlert4(1)">4、success</a></li>
            <li><a href="javascript:;" @click="openAlert4(2)">5、failure</a></li>
        </ul>
        <p>其它所有参数的用法跟layer是一致的</p>
        <p>go to
            <router-link to="/layer">layer</router-link>
        </p>
    </div>
</template>
<script>
    export default {
        name: 'dialog',
        path: '/dialog',
        data () {
            return {}
        },
        components: {},
        mounted(){
            /*this.$dialog({
             title:'alert',
             content:'content'
             })*/
        },
        methods: {
            openAlert(){
                this.$dialog({
                    title: 'alert',
                    content: 'this is content'
                })
            },
            openAlert2(){
                this.$dialog({
                    content: 'this is content',
                    animation: '5'
                })
            },
            openAlert3(){
                this.$dialog({
                    title: "callBack",
                    content: 'this is content',
                    animation: '6',
                    confirm: 'confirm',
                    cancel: 'cancel',
                    confirmBack(){
                        this.close();
                        this.$dialog({
                            content: 'You clicked confirm,this is new dialog',
                            confirm: 'ok'
                        })
                    },
                    cancelBack(){
                        this.close()
                    }
                })
            },
            openAlert4(t){
                this.$dialog({
                    title: t ? "success" : "failure",
                    content: 'this is content',
                    width:'300',
                    animation: '6',
                    confirm: 'confirm',
                    cancel: 'cancel',
                    type: t
                })
            }
        },
        filters: {}
    }
</script>