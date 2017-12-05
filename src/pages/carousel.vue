<!--Created by 337547038 on ${DATE}.-->
<template>
    <div class="demo">
        <h1>Carousel 跑马灯</h1>
        <Carousel className="class-name">
            <div class="slider">0</div>
            <div class="slider">1</div>
            <div class="slider">2</div>
            <div class="slider">3</div>
        </Carousel>
    </div>
</template>
<script>
    import Carousel from '../components/carousel'
    export default {
        name: "carousel",
        path: '/carousel',
        data () {
            return {}
        },
        components: {Carousel},
        mounted(){
        },
        methods: {},
        filters: {}
    }
</script>