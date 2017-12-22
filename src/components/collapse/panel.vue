<!--Created by 337547038 on 2017/12/15.-->
<template>
    <div class="collapse-panel" :class="{'active':$parent.active==name || visibility==name}">
        <div class="collapse-title" @click="_control">
            <slot/>
        </div>
        <div class="collapse-content" v-show="$parent.active==name || visibility==name"
             :class="{'active':$parent.active==name || visibility==name}">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'panel',
        data () {
            return {
                visibility: this.$parent.accordion ? "" : this.$parent.active//父元素改时visibility还是原来的值，包括执行this.$parent.value=''
            }
        },
        props: ['name'],
        components: {},
        methods: {
            _control(){
                if (this.$parent.accordion) {
                    if (this.$parent.active == this.name) {
                        //已经展开时，再点一次关闭，（这里可以直接修改$parent.value）
                        this.$parent.active = '1=1';//随便设置个不存在的值
                    } else {
                        this.$parent.active = this.name;
                        this.$parent.change ? this.$parent.change(this.name) : "";//执行父元素方法
                    }
                } else {
                    if (this.visibility == this.name) {
                        this.visibility = '';
                        this.$parent.active = '1=1';//这里也修改下，要不默认展开的，再次点击没办法收起来
                    } else {
                        this.visibility = this.name;
                        this.$parent.active = this.name;//这里也同步修改下父
                        this.$parent.change ? this.$parent.change(this.name) : "";
                    }
                }
            }
        },
        computed: {},
        mounted(){

        },
        filters: {}
    }
</script>