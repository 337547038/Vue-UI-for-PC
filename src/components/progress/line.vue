<!--Created by 337547038 on 2017/12/14.-->
<template>
    <div class="progress-line" :style="{width:radius+'px',background:color,minHeight:border+'px'}">
        <slot></slot>
        <span class="progress-text" v-if="showText" :style="styleText"><b>{{percent}}</b>%</span>
        <span class="progress-bar" :style="style"></span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'progress',
        data () {
            return {
                percent: 0
            }
        },
        props: {
            value: {//进度
                type: Number,
                default: 0
                /*validator: function (value) {
                 return value >= 0 && value <= 100;
                 }*/
            },
            radius: {//外半径
                type: Number,
                default: 0

            },
            border: {//边框
                type: Number,
                default: 0
            },
            color: String,//底环颜色
            borderColor: String,//进度条颜色
            duration: {//动画持续时间，单位毫秒
                type: Number,
                default: 500
            },
            showText: {//显示进度数字
                type: Boolean,
                default: true
            },
            follow: {//进度数字跟进进度
                type: Boolean,
                default: true
            }
        },
        created(){
        },
        components: {},
        methods: {
            _animation(){
                /*let clearTime;
                 clearTime = setInterval(()=> {
                 if (this.percent < this.value && this.percent < 100) {
                 this.percent++;
                 } else {
                 clearInterval(clearTime);
                 }
                 }, this.duration / this.value);*/
                //这里用css3动画的transition，设置下延时
                setTimeout(()=> {
                    this.percent = this.value;
                }, 10)
            }
        },
        computed: {
            style(){
                return {
                    height: this.border + 'px',
                    width: this.percent + '%',
                    background: this.borderColor,
                    transition: `all ${this.duration / 1000}s`
                }
            },
            styleText(){
                if (this.follow) {
                    return {
                        left: this.percent + '%',
                        transition: `all ${this.duration / 1000}s`
                    }
                }
            }
        },
        mounted()
        {
            //页面加载完成后显示进度动画
            this._animation();
        },
        filters: {}
    }
</script>