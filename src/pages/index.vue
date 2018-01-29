<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <ul>
            <li v-for="item in link">
                <router-link :to="item.link">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'index',
        path: '/',
        data () {
            return {
                msg: 'Welcome to Vue.js@2.5 UI for PC',
                link: [
                    {
                        title: 'BackTop 返回顶部',
                        link: '/backTop',
                        intro: ''
                    },
                    {
                        title: 'Carousel 跑马灯',
                        link: '/carousel',
                        intro: ''
                    },
                    {
                        title: 'Cascader 级联',
                        link: '/cascader',
                        intro: ''
                    },
                    {
                        title: 'Checkbox 多选框',
                        link: '/checkbox',
                        intro: ''
                    },
                    {
                        title: 'Collapse 折叠面板',
                        link: '/collapse',
                        intro: ''
                    },
                    {
                        title: 'DatePicker 日期选择',
                        link: '/datePicker',
                        intro: ''
                    },
                    {
                        title: 'Dialog 对话框',
                        link: '/dialog',
                        intro: ''
                    },
                    {
                        title: 'Form 表单',
                        link: '/form',
                        intro: ''
                    },
                    {
                        title: 'Input 输入框',
                        link: '/input',
                        intro: ''
                    },
                    {
                        title: 'InputNumber 数字输入框',
                        link: '/inputNumber',
                        intro: ''
                    },
                    {
                        title: 'Layer 弹窗层',
                        link: '/layer',
                        intro: ''
                    },
                    {
                        title: 'Loading 加载',
                        link: '/loading',
                        intro: ''
                    },
                    {
                        title: 'Menu 菜单',
                        link: '/menu',
                        intro: ''
                    },
                    {
                        title: 'Page 分页',
                        link: '/page',
                        intro: ''
                    },
                    {
                        title: 'Progress 进度条',
                        link: '/progress',
                        intro: ''
                    },
                    {
                        title: 'Radio 单选框',
                        link: '/radio',
                        intro: ''
                    },
                    {
                        title: 'SelectDropDown 仿select',
                        link: '/select',
                        intro: ''
                    },
                    {
                        title: 'Switch 开关',
                        link: '/switch',
                        intro: ''
                    },
                    {
                        title: 'Table 表格',
                        link: '/table',
                        intro: ''
                    },
                    {
                        title: 'Tabs 标签页',
                        link: '/tabs',
                        intro: ''
                    },
                    {
                        title: 'Textarea 文本框',
                        link: '/textarea',
                        intro: ''
                    },
                    {
                        title: 'Tooltip 文字提示',
                        link: '/tooltip',
                        intro: ''
                    },
                    {
                        title: 'Tree 树形',
                        link: '/tree',
                        intro: ''
                    }
                ]
                /* link: ['layer', 'dialog', 'carousel', 'select', 'tabs', 'loading', 'table', 'page', 'menu', 'tooltip', 'collapse', 'input', 'radio', 'checkbox', 'form', 'cascader', 'switch']*/
            }
        },
        mounted(){
            console.log(this.link.length);
            // console.log(this.getHeight(window));
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello{ margin: 50px }
    .hello ul{ margin: 30px }
    .hello li{ list-style: circle; line-height: 32px; }
    .hello li a{ font-size: 16px; }
</style>
