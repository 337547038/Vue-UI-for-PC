<!--Created by 337547038 on 2018/1/26.-->
<template>
    <li>
        <i :class="{'has-child':data.children,'last-child':num+1==len,'open-child':show}" @click="_slideToggle"></i><a v-text="data.name" @click="_click" :class="{'active':data.name==active}"></a>
        <ul v-show="show" v-if="data.children">
            <forLi v-for="(item,index) in data.children" :data="item" :key="index" :num="index"
                   :len="data.children.length" @click="_click2" :active="active"></forLi>
        </ul>
    </li>
</template>
<script>
    export default {
        name: 'forLi',
        data () {
            return {
                show: this.data.show || false
            }
        },
        props: ['data', 'len', 'num', 'active'],
        components: {},
        methods: {
            _slideToggle(){
                if (this.data.children) {
                    this.show = !this.show;
                }
            },
            _click(){
                this.$emit('click', this.data.name);
            },
            _click2(name){
                this.$emit('click', name);
                //e.preventDefault();
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>
