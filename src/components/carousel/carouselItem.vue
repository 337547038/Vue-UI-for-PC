<!--Created by 337547038 on 2017/12/6.-->
<template>
    <div class="carousel-slide" :style="style">
        <slot/>
    </div>
</template>
<script>
    export default {
        name: 'carouselItem',
        data () {
            return {}
        },
        components: {},
        mounted(){
        },
        computed: {
            style(){
                if (this.$parent.animation === 'fade') {
                    return {
                        position: 'absolute',
                        opacity: 0,
                        width: '100%',
                        transition: `opacity ${this.$parent.speed / 1000}s`,
                        webkitTransition: `opacity ${this.$parent.speed / 1000}s`
                    }
                } else {
                    return {
                        width: this.$parent.containerWidth + 'px',
                        float: 'left'
                    }
                }
            }
        },
        methods: {},
        filters: {}
    }
</script>