<!--Created by 337547038 on 2017/12/19.-->
<template>
    <div class="tooltip-box" @mouseenter="_mouseEnter" @mouseleave="_mouseLeave" ref="toolDiv">
        <slot/>
        <span style="display: none"><slot name="content"></slot></span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: '',
        data () {
            return {
                clearTime: '',
                tooltip: ''
            }
        },
        props: {
            content: String,
            className: String,
            direction: {
                type: String,
                default: 'top-left'
            },
            maxWidth: {
                type: Number,
                default: 500
            },
            delay: {
                type: Number,//鼠标移开后延时移除时间，主要能够让鼠标移动提示文字上，单位毫秒
                default: 200
            },
            always: {
                type: Boolean,
                default: false
            }
        },
        components: {},
        methods: {
            _mouseEnter(){
                if (!this.always) {
                    //如果存在先移除，避免重复创建
                    if (this.tooltip) {
                        clearTimeout(this.clearTime);
                        document.body.removeChild(this.tooltip);
                        this.tooltip = '';
                    }
                    this._createElement();
                    this.tooltip.addEventListener('mouseenter', this._tooltipMouseEnter, false);
                    this.tooltip.addEventListener('mouseleave', this._tooltipMouseLeave, false);
                }
            },
            _createElement(){
                //创建相关节点
                let className = this.className ? " " + this.className : "";
                //body下创建节点
                this.tooltip = document.createElement('div');
                this.tooltip.className = 'tooltip ' + this.direction + className;
                this.tooltip.style.maxWidth = parseInt(this.maxWidth) + 'px';

                let content;
                if (this.content) {
                    content = this.content;
                } else if (this.$slots.content) {
                    //这个内容还真不好取，还要先在template里显示出来才取得到，不知有没其他办法
                    content = this.$slots.content[0].elm.innerHTML;
                } else {
                    return false;
                }
                this.tooltip.innerHTML = content;
                document.body.appendChild(this.tooltip);
                //取当前标签偏移位置
                let offset = this.getOffset(this.$refs.toolDiv);
                let windowWidth = this.getWidth(window);
                let height = this.tooltip.offsetHeight;
                let style = this.tooltip.style;
                const space = 8;//当前标签与提示语之间的距离
                switch (this.direction) {
                    case 'top-left':
                        style.left = offset.left + 'px';
                        style.top = (offset.top - this.tooltip.offsetHeight - space) + 'px';
                        break;
                    case 'top':
                        //先让提示左边和当前标签中间对齐（偏移位置+标签宽的一半），再向左移50%
                        style.transform = 'translateX(-50%)';
                        style.left = this._translate(offset.left + offset.width / 2) + 'px';
                        style.top = (offset.top - this.tooltip.offsetHeight - space) + 'px';
                        break;
                    case 'top-right':
                        style.right = windowWidth - (offset.left + offset.width) + 'px';
                        style.top = (offset.top - this.tooltip.offsetHeight - space) + 'px';
                        break;
                    case 'left':
                        //top先让提示语顶部跟标签中间对齐，再上移50%
                        style.right = windowWidth - (offset.left - space) + 'px';
                        style.top = this._translate(offset.top + offset.height / 2) + 'px';
                        style.transform = 'translateY(-50%)';
                        break;
                    case 'right':
                        //top和左边一样
                        style.left = offset.left + offset.width + space + 'px';
                        style.top = this._translate(offset.top + offset.height / 2) + 'px';
                        style.transform = 'translateY(-50%)';
                        break;
                    case 'bottom-left':
                        style.left = offset.left + 'px';
                        style.top = offset.top + offset.height + space + 'px';
                        break;
                    case 'bottom':
                        style.left = this._translate(offset.left + offset.width / 2) + 'px';
                        style.transform = 'translateX(-50%)';
                        style.top = offset.top + offset.height + space + 'px';
                        break;
                    case 'bottom-right':
                        style.right = windowWidth - (offset.left + offset.width) + 'px';
                        //style.transform = 'translateX(-100%)';
                        style.top = offset.top + offset.height + space + 'px';
                        break;
                }
            },
            _mouseLeave(){
                if (!this.always) {
                    this._removeChild();
                }
            },
            _tooltipMouseEnter(){
                //鼠标移到提示文字上面时，清除延时时间
                clearTimeout(this.clearTime);
            },
            _tooltipMouseLeave(){
                //鼠标从提示文字上移开时
                this._removeChild();
            },
            _removeChild(){
                this.clearTime = setTimeout(()=> {
                    if (this.tooltip) {
                        document.body.removeChild(this.tooltip);
                        this.tooltip = '';
                    }
                }, this.delay);
            },
            _translate(px){
                //通过transform平移标签时，如平移的单位为非偶数，会出现字体模糊，这里强制取偶
                if (parseInt(px) % 2 == 0) {
                    //偶数
                    return parseInt(px)
                } else {
                    return parseInt(px) + 1
                }
            }
        },
        computed: {},
        mounted(){
            if (this.always) {
                //一直显示的
                this._createElement();
            }
        },
        filters: {}
    }
</script>