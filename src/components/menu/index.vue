<!--Created by 337547038 on 2017/12/17.-->
<template>
    <div class="nav">
        <ul class="clearfix">
            <li v-for="(item,index) in data"
                :class="{'active':item.name?item.name==value:value==index,'has-child':item.child}">
                <a :href="item.href" v-text="item.title" :target="item.target"></a>
                <ul class="child" v-if="item.child">
                    <li v-for="child in item.child">
                        <a :href="child.href" v-text="child.title" :target="child.target"></a>
                    </li>
                </ul>
            </li>
            <!--<li class="active"><a href="#">首页</a></li>
            <li class="has-child show"><a href="#">产品中心</a>
                <ul class="child">
                    <li><a href="">产品1</a></li>
                    <li><a href="">产品2</a></li>
                    <li><a href="">产品3</a></li>
                    <li><a href="">产品4</a></li>
                </ul>
            </li>
            <li><a href="#">联系我们</a></li>
            <li><a href="#">联系我们</a></li>-->
        </ul>
    </div>
</template>
<script>
    export default {
        name: '',
        path: '',
        data(){
            return {}
        },
        props: {
            data: Array,
            value: String
        },
        mounted(){
        },
        components: {},
        methods: {
            styleClass(){
                return {
                    active: true
                }
            }
        },
        computed: {}
    }
</script>