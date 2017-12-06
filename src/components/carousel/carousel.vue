<template>
    <div class="carousel" :class="className">
        <div class="carousel-wrapper fade" v-if="animation=='fade'">
            <slot/>
        </div>
        <div class="carousel-wrapper" v-else>
            <slot/>
        </div>
        <ul class="carousel-control" v-if="controlNav">
            <li class="active"></li>
            <li></li>
            <li></li>
        </ul>
        <ul class="carousel-direction" v-if="directionNav">
            <li class="carousel-prev"></li>
            <li class="carousel-next"></li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'carousel',
        data () {
            return {
                setInterTime: '',
                active: this.slideTo
            }
        },
        props: {
            className: String,
            animation: {
                type: String,
                default: 'fade'//fade和slide两种
            },
            loop: {
                type: Boolean,
                default: true
            },
            speed: {
                //动画过度时间，毫秒
                type: Number,
                default: 500
            },
            showTime: {
                //停留时间
                type: Number,
                default: 5000
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            pauseOnHover: {
                //鼠标移上时暂停
                type: Boolean,
                default: true
            },
            controlNav: {
                //小圆点控制
                type: Boolean,
                default: false
            },
            directionNav: {
                //上下控制
                type: Boolean,
                default: false
            },
            slideTo: {
                //滑动到第几个
                type: Number,
                default: 0
            },
            after: Function,//加载完成
            slideAfter: Function//滑动结束
        },
        components: {},
        mounted(){
            this._controlClass(1, 0);
            this.$nextTick(()=> {
                //自动轮播
                this._autoPlay();
            })
        },
        watch: {
            active(val, oldval){
                this._controlClass(2, oldval);
                this._controlClass(1, val);
            }
        },
        methods: {
            _controlClass(type, index){
                //添加多一个样式，切换过程可以没那么突然
                let el = this.$children[index].$el;
                if (type == 1) {
                    this.addClass(el, 'active');
                    el.style.opacity = 1;
                    el.style.zIndex = 1
                } else {
                    this.removeClass(el, 'active');
                    el.style.opacity = 0;
                    el.style.zIndex = ''
                }
            },
            _autoPlay(){
                if (this.autoPlay) {
                    this.setInterTime = setInterval(()=> {
                        if (this.active < this.$children.length - 1) {
                            this.active++;
                        } else {
                            this.active = 0;
                        }
                    }, this.showTime)
                }
            }
        },
        filters: {}
    }
</script>