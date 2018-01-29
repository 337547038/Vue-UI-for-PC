<!--Created by 337547038 on 2018/1/29.-->
<template>
    <div class="back-top" :style="{right:right+'px',bottom:bottom+'px'}" v-show="show" @click="_click">
        <a v-text="text"></a>
    </div>
</template>
<script>
    export default {
        name: 'backTop',
        data () {
            return {
                show: false
            }
        },
        props: {
            text: {
                type: String,
                default: '返回顶部'
            },
            height: {
                type: Number,
                default: 200
            },
            bottom: {
                type: Number,
                default: 30
            },
            right: {
                type: Number,
                default: 30
            },
            duration: {
                type: Number,
                default: 1000
            }
        },
        components: {},
        methods: {
            _windowScroll(){
                if (this.getScrollTop() > this.height) {
                    this.show = true
                } else {
                    this.show = false
                }
            },
            _click(){
                let top = this.getScrollTop();
                let th = this;
                let v = top / this.duration;
                let timer = setInterval(function () {
                    //30ms的距离
                    top -= Math.abs(v * 30);
                    if (top <= 1) {
                        top = 0;
                        clearInterval(timer);
                    }
                    document.body.scrollTop = top;
                }, 30);
                this.$emit('click');
            }
        },
        computed: {},
        mounted(){
            window.addEventListener('scroll', this._windowScroll)
        },
        filters: {}
    }
</script>