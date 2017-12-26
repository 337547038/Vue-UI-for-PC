<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="cascader-box">
        <div class="input-control" :class="{'focus':show,'placeholder':placeholder,'disabled':disabled}" v-text="text">
        </div>
        <span class="mask" v-show="show"></span>
        <transition name="slide-toggle">
            <div class="cascader-down" v-show="show">
                <p class="tips">请选择新地址</p>
                <div class="cascader-tab">
                    <ul class="clearfix">
                        <li class="active">广东</li>
                        <li>广州</li>
                        <li>天河</li>
                    </ul>
                </div>
                <div class="cascader-area">
                    <ul class="clearfix">
                        <li><a>广东</a></li>
                        <li><a>北京</a></li>
                        <li><a>北京</a></li>
                        <li><a>北京</a></li>
                        <li><a>北京</a></li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'cascader',
        data () {
            return {
                show: true,
                text: ''
            }
        },
        props: {
            placeholder: String,
            disabled: {
                type: Boolean,
                default: false
            },
            /*trigger: {//触发下拉事件，click和
             type: String,
             default: 'click'
             }*/
        },
        components: {},
        methods: {
            _showHide(e){
                if (this.$el.contains(e.target)) {
                    this.disabled == false ? this.show = !this.show : "";
                } else {
                    this.show = false;
                }
            }
        },
        computed: {},
        mounted(){
            document.addEventListener('click', this._showHide);
        },
        filters: {}
    }
</script>