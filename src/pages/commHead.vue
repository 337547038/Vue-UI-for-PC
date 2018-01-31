<!--Created by 337547038 on 2017/12/13.-->
<template>
    <div class="comm-header">
        <MenuNav :data="data" :value="name"></MenuNav>
    </div>
</template>
<script>
    import MenuNav from '../components/menu/index'
    export default {
        name: 'comHeader',
        data () {
            return {
                data: [
                    {
                        title: '快速跳转', name: 'a', href: '/',
                        child: [
                            {
                                title: 'backTop 返回顶部',
                                href: '/backTop',
                                name: 'backTop'
                            },
                            {
                                title:'Breadcrumb 面包屑',
                                href:'/breadcrumb',
                                name: 'breadcrumb'
                            },
                            {
                                title: 'Carousel 跑马灯',
                                href: '/carousel',
                                name: 'carousel'
                            },
                            {
                                title: 'Cascader 级联',
                                href: '/cascader',
                                name: 'cascader'
                            },
                            {
                                title: 'Checkbox 多选框',
                                href: '/checkbox',
                                name: 'checkbox'
                            },
                            {
                                title: 'Collapse 折叠面板',
                                href: '/collapse',
                                name: 'collapse'
                            },
                            {
                                title: 'DatePicker 日期选择',
                                href: '/datePicker',
                                name: 'datePicker'
                            },
                            {
                                title: 'Dialog 对话框',
                                href: '/dialog',
                                name: 'dialog'
                            },
                            {
                                title: 'Form 表单',
                                href: '/form',
                                name: 'form'
                            },
                            {
                                title: 'Input 输入框',
                                href: '/input',
                                name: 'input'
                            },
                            {
                                title: 'InputNumber 数字输入框',
                                href: '/inputNumber',
                                name: 'inputNumber'
                            },
                            {
                                title: 'Layer 弹窗层',
                                href: '/layer',
                                name: 'layer'
                            },
                            {
                                title: 'Loading 加载',
                                href: '/loading',
                                name: 'loading'
                            },
                            {
                                title: 'Menu 菜单',
                                href: '/menu',
                                name: 'menu'
                            },
                            {
                                title: 'Page 分页',
                                href: '/page',
                                name: 'page'
                            },
                            {
                                title: 'Progress 进度条',
                                href: '/progress',
                                name: 'progress'
                            },
                            {
                                title: 'Radio 单选框',
                                href: '/radio',
                                name: 'radio'
                            },
                            {
                                title: 'SelectDropDown 仿select',
                                href: '/select',
                                name: 'select'
                            },
                            {
                                title: 'Steps 步骤条',
                                href: '/steps',
                                name: 'steps'
                            },
                            {
                                title: 'Switch 开关',
                                href: '/switch',
                                name: 'switch'
                            },
                            {
                                title: 'Table 表格',
                                href: '/table',
                                name: 'table'
                            },
                            {
                                title: 'Tabs 标签页',
                                href: '/tabs',
                                name: 'tabs'
                            },
                            {
                                title: 'Textarea 文本框',
                                href: '/textarea',
                                name: 'textarea'
                            },
                            {
                                title: 'Tooltip 文字提示',
                                href: '/tooltip',
                                name: 'tooltip'
                            },
                            {
                                title: 'Transfer 穿梭框',
                                href: '/transfer',
                                name: 'transfer'
                            },
                            {
                                title: 'Tree 树形',
                                href: '/tree',
                                name: 'tree'
                            }
                        ]
                    }
                ]
            }
        },
        components: {MenuNav},
        mounted(){
        },
        props: ['name'],
        methods: {},
        computed: {},
        filters: {}
    }
</script>