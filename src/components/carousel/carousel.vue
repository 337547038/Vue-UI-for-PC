<template>
    <div class="carousel" :class="className">
        <div class="carousel-wrapper fade" v-if="animation=='fade'" @mouseover="_mouseOver" @mouseleave="_mouseLeave">
            <slot/>
        </div>
        <div class="carousel-wrapper" v-else ref="wrap">
            <div class="carousel-scroll" :style="_scrollStyle" ref="scroll">
                <slot/>
            </div>
        </div>
        <ul class="carousel-control" v-if="controlNav">
            <li :class="{'active':index==active}" v-for="(item,index) in pages"></li>
        </ul>
        <ul class="carousel-direction" v-if="directionNav">
            <li class="carousel-prev" @click="_slideControl(-1)" :class="{'disable':prevDisable}"></li>
            <li class="carousel-next" @click="_slideControl(1)" :class="{'disable':nextDisable}"></li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'carousel',
        data () {
            return {
                setInterTime: '',
                active: this.slideTo,
                prevDisable: !this.loop,//上下可点击，循环时就一直是false
                nextDisable: false,
                pages: 0,//共有多少页
                containerWidth: '',//组件宽
                moveWidth: ''//每次移动的宽
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
                //动画过度时间，单位毫秒
                type: Number,
                default: 300
            },
            showTime: {
                //停留时间，单位毫秒
                type: Number,
                default: 3000
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
            this._controlClass(this.animation, 1, this.active);
            this.$nextTick(()=> {
                this.pages = this.$children.length;
                //自动轮播
                this._autoPlay();
                this.containerWidth = this.getWidth(this.$refs.wrap);
                if (this.animation === 'slide') {
                    this._isSlide();
                }
                //加载完成
                this.after ? this.after() : "";
            });
        },
        watch: {
            active(val, oldval){
                this._controlClass(this.animation, 2, oldval);
                this._controlClass(this.animation, 1, val);
                this.slideAfter ? this.slideAfter(val) : "";
            }
        },
        methods: {
            _controlClass(animation, type, index){
                let el = this.$children[index].$el;
                if (animation === 'fade') {
                    if (type == 1) {
                        this.addClass(el, 'active');
                        el.style.opacity = 1;
                        el.style.zIndex = 1
                    } else {
                        this.removeClass(el, 'active');
                        el.style.opacity = 0;
                        el.style.zIndex = ''
                    }
                } else {
                    //let len = this.$children.length;
                    if (type == 1) {
                        //left
                        this.addClass(el, 'active');
                        this.moveWidth = -this.containerWidth * index + 'px'
                    } else {
                        //right
                        this.removeClass(el, 'active');
                        this.moveWidth = this.containerWidth * index + 'px'
                    }
                }
            },
            _autoPlay(){
                if (this.autoPlay) {
                    this.setInterTime = setInterval(()=> {
                        this._slideControl(1);
                    }, this.showTime)
                }
            },
            _slideControl(d){
                //切换控制
                if (d > 0) {
                    //下一个
                    this.prevDisable = false;
                    if (this.active < this.pages - 1) {
                        this.active++;
                    } else {
                        //如果不循环停在最后一个
                        if (this.loop) {
                            this.active = 0;
                        } else {
                            this.nextDisable = true;
                        }
                    }
                } else {
                    //上一个
                    this.nextDisable = false;
                    if (this.active > 0) {
                        this.active--;
                    } else {
                        if (this.loop) {
                            this.active = this.pages - 1
                        } else {
                            this.prevDisable = true;
                        }
                    }
                }
            },
            _mouseOver(){
                if (this.pauseOnHover) {
                    clearInterval(this.setInterTime);
                }
            },
            _mouseLeave(){
                this._autoPlay();
            },
            _isSlide(){
                /*let el = this.$refs.scroll;
                 let first = el.firstChild;
                 let last = el.lastChild.cloneNode(true);
                 //clone最后一个插入到第一（这里clone的没宽度？？）
                 last.style.width = this.containerWidth + 'px';
                 el.insertBefore(last, first);
                 //clone第一个插入到最后
                 let firstClone = first.cloneNode(true);
                 firstClone.style.width = this.containerWidth + 'px';
                 el.appendChild(firstClone);
                 //插入两个clone后更新pages
                 this.pages = this.pages + 2;*/
            }
        },
        computed: {
            _scrollStyle(){
                return {
                    width: this.containerWidth * this.pages + 'px',
                    overflow: 'hidden',
                    transform: `translate(${this.moveWidth},0)`,
                    webkitTransform: `translate(${this.moveWidth},0)`,
                    transition: `transform ${this.speed / 1000}s`,
                    webkitTransition: `transform ${this.speed / 1000}s`
                }
            }
        },
        filters: {}
    }
</script>