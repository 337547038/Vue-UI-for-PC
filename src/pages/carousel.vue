<!--Created by 337547038 on ${DATE}.-->
<template>
    <div class="demo">
        <h1>Carousel 跑马灯</h1>
        <Carousel className="class-name">
            <CarouselItem><img src="../assets/images/Desert.jpg"></CarouselItem>
            <CarouselItem><img src="../assets/images/Hydrangeas.jpg"></CarouselItem>
            <CarouselItem><img src="../assets/images/Jellyfish.jpg"></CarouselItem>
            <CarouselItem><img src="../assets/images/Koala.jpg"></CarouselItem>
        </Carousel>
    </div>
</template>
<script>
    import {Carousel,CarouselItem} from '../components/carousel/index'
    export default {
        name: "carousel",
        path: '/carousel',
        data () {
            return {}
        },
        components: {Carousel,CarouselItem},
        mounted(){
        },
        methods: {},
        filters: {}
    }
</script>
<style>

</style>