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
                        transition: 'all 1s',
                        webkitTransition: 'all 1s'
                    }
                }
            }
        },
        methods: {},
        filters: {}
    }
</script>