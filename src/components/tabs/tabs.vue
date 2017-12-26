<!--Created by 337547038 on 2017/12/8.-->
<!--example
<Tabs value="t2">
    <TabPane label="tabs 1" name="t1">this is tabs 1 content</TabPane>
    <TabPane label="tabs 2" name="t2">this is tabs 2 content</TabPane>
    <TabPane label="tabs 3" name="t3">this is tabs 3 content</TabPane>
</Tabs>-->
<template>
    <div class="tabs">
        <div class="tabs-nav clearfix">
            <div class="tabs-tab" v-for="(item,index) in tabsTab" @click="_tabClick(item)"
                 :class="{'active':active==item.name,'disabled':item.disabled }">
                {{item.label}}
                <span class="tip" v-if="item.tip">{{item.tip | maxFilter(tipMax)}}</span>
            </div>
        </div>
        <div class="tabs-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tabs',
        data(){
            return {
                tabsTab: this.$children,
                active: this.value//当前显示第几个
            }
        },
        props: ['value', 'onChange', 'tipMax'],
        mounted(){
        },
        components: {},
        methods: {
            _tabClick(item){
                if (!item.disabled) {
                    this.active = item.name;
                    this.$emit('input', item.name);//v-model时双向绑定
                    this.onChange ? this.onChange(item.name) : ""
                }
            }
        },
        computed: {},
        filters: {
            maxFilter(v, max){
                if (parseInt(v) > parseInt(max)) {
                    return v + '+';
                } else {
                    return v
                }
            }
        }
    }
</script>