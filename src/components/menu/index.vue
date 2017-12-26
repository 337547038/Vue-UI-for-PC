<!--Created by 337547038 on 2017/12/17.-->
<!--example
<MenuNav :data="data" value="a3"></MenuNav>-->
<template>
    <div class="nav" :class="{'nav-v':type=='v','nav-h':type=='h'}">
        <ul class="clearfix">
            <li v-for="(item,index) in data"
                :class="{'active':item.name==value || item.name==childActive,'has-child':item.child,'hover':hoverClass==item.name || openNames.indexOf(item.name)!=-1}"
                @mouseenter="_mouseOver(item)" @mouseleave="_mouseLeave(item)">
                <router-link :to="item.href" :target="item.target" @click="_onClick(item)" v-if="router" v-text="item.title"></router-link>
                <a :href="item.href" v-text="item.title" :target="item.target" @click="_onClick(item)" v-else></a>
                <ul class="child" v-if="item.child" v-show="hoverClass==item.name || openNames.indexOf(item.name)!=-1">
                    <li v-for="child in item.child" :class="{'active':child.name==value}">
                        <router-link :to="child.href" :target="child.target" @click="_selectBack(child)" v-if="router" v-text="child.title">
                        </router-link>
                        <a :href="child.href" :target="child.target" @click="_selectBack(child)" v-text="child.title" v-else></a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: '',
        path: '',
        data(){
            return {
                hoverClass: '',//鼠标经过添加样式，type=h时
                childActive: '',//当对应的name值在子菜单里，父层也要添加添加类
                openNames: []//展开的集合，垂直时
            }
        },
        watch: {
            value(){
                this._findActive();
            }
        },
        props: {
            data: Array,
            value: String,
            type: {
                type: String,
                default: 'h'
            },
            accordion: {
                type: Boolean,
                default: false
            },
            router: {
                type: Boolean,
                default: true
            },
            onSelect: Function
        },
        mounted(){
            this._findActive();
        },
        components: {},
        methods: {
            _mouseOver(item){
                if (item.child && item.name && this.type == 'h') {
                    //有子菜单和name有对应值，以及横向菜单时才有鼠标经过和离开效果，纵向时有点击展开
                    this.hoverClass = item.name;
                }
            },
            _mouseLeave(item){
                if (this.type == 'h') {
                    this.hoverClass = '';
                }
            },
            _onClick(item){
                if (item.child && item.name && this.type == 'v') {
                    let index = this.openNames.indexOf(item.name);
                    if (index != -1) {
                        if (this.accordion) {
                            //只能展开一项时
                            //存在数组中，表示当前点击的是已展开的项，此时清空数组即可
                            this.openNames.splice(0, this.openNames.length);
                        } else {
                            //可展开多项时
                            //数组里有就移除，没有就添加，此时有值
                            this.openNames.splice(index, 1);// 　
                        }
                    } else {
                        if (this.accordion) {
                            //没有，先清空，再添加自己
                            this.openNames.splice(0, this.openNames.length);
                            this.openNames.push(item.name);
                        }
                        else {
                            //没有，添加一个
                            this.openNames.push(item.name);
                        }
                    }
                    /*if (this.accordion) {
                     //如果已展开，则关闭。否则展开并关闭其它项
                     if (index != -1) {
                     this.openNames.splice(0, this.openNames.length);
                     } else {
                     //没有，先清空，再添加自己
                     this.openNames.splice(0, this.openNames.length);
                     this.openNames.push(item.name);
                     }
                     } else {
                     //没有就添加，有就移除
                     if (index != -1) {
                     //有
                     this.openNames.splice(index, 1);
                     } else {
                     this.openNames.push(item.name);
                     }
                     }*/
                }
                this._selectBack(item)
            },
            _selectBack(item){
                this.onSelect ? this.onSelect(item) : "";//back
            },
            _findActive(){
                this.childActive = '';
                //先在这里实现，实现功能：value所对应的name值在子菜单里，这时父级也添加类active
                for (let i in this.data) {
                    for (let j in this.data[i].child) {
                        if (this.data[i].child[j].name == this.value) {
                            this.childActive = this.data[i].name;
                            if (this.type == 'v') {
                                this.openNames.push(this.data[i].name);//垂直时当前默认为展开
                            }
                            break;
                        }
                    }
                }
            }
        },
        computed: {}
    }
</script>