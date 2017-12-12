<template>
    <div class="demo">
        <h1>Carousel Demo</h1>
        <h2>使用</h2>
        <pre>
            import {Carousel, CarouselItem} from '../components/carousel/index'
        </pre>
        <pre>
            &lt;Carousel><br>
                &lt;CarouselItem>&lt;img src="../assets/images/1.jpg">&lt;/CarouselItem><br>
            &lt;CarouselItem>&lt;img src="../assets/images/1.jpg">&lt;/CarouselItem><br>
            &lt;/Carousel>
        </pre>
        <h2>淡入淡出效果</h2>
        <Carousel className="class-name" :slideAfter="slideAfter">
            <CarouselItem><img src="../assets/images/1.jpg"></CarouselItem>
            <CarouselItem><img src="../assets/images/2.jpg"></CarouselItem>
            <CarouselItem><img src="../assets/images/3.jpg"></CarouselItem>
            <CarouselItem><img src="../assets/images/4.jpg"></CarouselItem>
        </Carousel>
        <p>&nbsp;</p>
        <h2>滑动效果</h2>
        <Carousel className="class2" animation="slide" :autoPlay="false" :loop="true">
            <CarouselItem><img src="../assets/images/3.jpg"></CarouselItem>
            <CarouselItem><img src="../assets/images/1.jpg"></CarouselItem>
            <CarouselItem><img src="../assets/images/2.jpg"></CarouselItem>
            <CarouselItem>也可以是文字和图片混排</CarouselItem>
        </Carousel>
        <p>&nbsp;</p>
        <h3>参数Carousel</h3>
        <table class="table-1">
            <tr>
                <th width="80">参数</th>
                <th width="120">默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td>String</td>
                <td></td>
            </tr>
            <tr>
                <td>animation</td>
                <td>String | fade</td>
                <td>切换效果，目前只支持fade和slide两种</td>
            </tr>
            <tr>
                <td>loop</td>
                <td>Boolean | true</td>
                <td>循环</td>
            </tr>
            <tr>
                <td>speed</td>
                <td>Number | 300</td>
                <td>动画过度时间，单位毫秒</td>
            </tr>
            <tr>
                <td>showTime</td>
                <td>Number | 3000</td>
                <td>动画停留时间，单位毫秒</td>
            </tr>
            <tr>
                <td>autoPlay</td>
                <td>Boolean | true</td>
                <td>自动轮播</td>
            </tr>
            <tr>
                <td>pauseOnHover</td>
                <td>Boolean | true</td>
                <td>鼠标移上时暂停</td>
            </tr>
            <tr>
                <td>controlNav</td>
                <td>Boolean | true</td>
                <td>显示圆点控制</td>
            </tr>
            <tr>
                <td>directionNav</td>
                <td>Boolean | true</td>
                <td>前后控制</td>
            </tr>
            <tr>
                <td>slideTo</td>
                <td>Number | 0</td>
                <td>滑动到第几个</td>
            </tr>
            <tr>
                <td>after</td>
                <td>Function</td>
                <td>加载完成回调</td>
            </tr>
            <tr>
                <td>slideAfter</td>
                <td>Function</td>
                <td>切换回调</td>
            </tr>
        </table>
        <p>&nbsp;</p>
        <p>slide效果时，最后一张回到第一张时，效果不够理想，并不是无缝循环，有待改进。第一到最后也是</p>
    </div>
</template>
<script>
    import {Carousel, CarouselItem} from '../components/carousel/index'
    export default {
        name: "carousel",
        path: '/carousel',
        data () {
            return {}
        },
        components: {Carousel, CarouselItem},
        mounted(){
        },
        methods: {
            slideAfter(index){
                // console.log('当前：' + index);
            }
        },
        filters: {}
    }
</script>
<style>
    .carousel-slide img{ width: 100%;height: 100% }
</style>