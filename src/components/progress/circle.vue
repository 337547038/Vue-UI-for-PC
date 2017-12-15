<!--Created by 337547038 on 2017/12/14.-->
<template>
    <div class="progress-circle" v-style.pro="style">
        <slot></slot>
        <span class="progress-text" v-if="showText"><b>{{percent}}</b>%</span>
        <div class="circle-circle" v-style.circle="style" :style="circleStyle">
            <span class="circle-left" v-style.left="style" :style="rotateStyle"></span>
            <span class="circle-right" v-style.right="style" v-if="percent>=50"></span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'progress',
        data () {
            return {
                style: {//定义个方便传到指令去
                    radius: this.radius,
                    border: this.border,
                    color: this.color,
                    borderColor: this.borderColor
                },
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
            }
        },
        created(){
        },
        components: {},
        methods: {
            _animation(){
                let clearTime;
                clearTime = setInterval(()=> {
                    if (this.percent < this.value && this.percent < 100) {
                        this.percent++;
                    } else {
                        clearInterval(clearTime);
                    }
                }, this.duration / this.value);
            }
        },
        computed: {
            circleStyle()
            {
                //value大于50%时显示完整，小于50%，显示右半边　　360/100
                if (this.percent > 50) {
                    return {
                        clip: 'rect(auto,auto,auto,auto)'
                    }
                } else {
                    return {
                        clip: `rect(0,${this.radius * 2}px,${this.radius * 2}px,${this.radius}px)`
                    }
                }
            },
            rotateStyle()
            {
                //左半圆根据value值旋转即可，360度/100=3.6
                return {
                    transform: "rotate(" + 3.6 * this.percent + "deg)",
                    webkitTransform: "rotate(" + 3.6 * this.percent + "deg)"
                }
            }
        },
        mounted()
        {
            //页面加载完成后显示进度动画
            this._animation();
        },
        filters: {},
        directives: {
            //每个都指定宽高等，但每个标签又不太一致，部分共公的，这里用指令，并且是bind形式只调用一次
            //发现每个都要写style好麻烦
            style: {
                bind(el, binding)
                {
                    let value = binding.value;
                    let type = binding.modifiers;
                    let style = el.style;
                    style.width = value.radius * 2 + 'px';
                    style.height = value.radius * 2 + 'px';
                    if (type.pro) {
                        style.border = `${value.border}px solid ${value.color}`;
                    } else if (type.circle) {
                        style.left = `-${value.border}px`;
                        style.top = `-${value.border}px`;
                    } else if (type.left) {
                        style.border = `${value.border}px solid ${value.borderColor}`;
                        style.clip = `rect(0, ${value.radius}px, ${value.radius * 2}px, 0px)`;
                    } else if (type.right) {
                        style.border = `${value.border}px solid ${value.borderColor}`;
                        style.clip = `rect(0, ${value.radius * 2}px, ${value.radius * 2}px, ${value.radius}px)`;
                    }
                }
            }
        }
    }
</script>