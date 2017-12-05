<template>
    <div class="carousel" :class="className">
        <div class="carousel-wrapper">
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
<script>
    export default {
        name: 'carousel',
        data () {
            return {}
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
                default: 3000
            },
            pauseOnHover: {
                //鼠标移上时暂停
                type: Boolean,
                default: true
            },
            controlNav: {
                //小圆点控制
                type: Boolean,
                default: true
            },
            directionNav: {
                //上下控制
                type: Boolean,
                default: true
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
        },
        methods: {},
        filters: {}
    }
</script>