<!--Created by 337547038 on 2017/12/7.-->
<template>
    <div class="demo">
        <h1>Select Demo</h1>
        <p>主要因为各种浏览器的外观问题，及placeholder和input一致问题</p>
        <h3>难点：</h3>
        <p>1、页面有两个以上时，A展开时，然后点B，这时A应该要收起来</p>
        <p>&nbsp;</p>
        <h3>使用：</h3>
        <p>1、最基本使用</p>
        <p>选中值：{{selectValue}}</p>
        <div>
            <SelectDropDown :option="option" v-model="selectValue" className="abc">
            </SelectDropDown>
        </div>
        <p>2、带有默认首选项时</p>
        <div>
            <SelectDropDown :option="option" defaultText="请选择">
            </SelectDropDown>
        </div>
        <p>3、带搜索选项</p>
        <div>
            <SelectDropDown :option="option" :showSearch="true" searchPlaceholder="请输入搜索关键字">
            </SelectDropDown>
        </div>
        <p>4、禁用状态</p>
        <div>
            <SelectDropDown :option="option" :showSearch="true" :disabled="true">
            </SelectDropDown>
        </div>
        <p>5、回调</p>
        <p>回调值：{{onChangeText}}</p>
        <div>
            <SelectDropDown :option="option" :onChange="onChange">
            </SelectDropDown>
        </div>
        <p>6、下拉显示指定个数</p>
        <div>
            <SelectDropDown :option="option" showNum="5">
            </SelectDropDown>
        </div>
        <p>7、通过地址加载值</p>
        <div>
            <SelectDropDown :option="option" optionUrl="static/restful/select.json">
            </SelectDropDown>
        </div>
        <p>&nbsp;</p>
        <h3>参数：</h3>
        <table class="table-1">
            <tr>
                <th width="80">参数</th>
                <th width="120">默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td></td>
                <td>选中值</td>
            </tr>
            <tr>
                <td>defaultText</td>
                <td>String | null</td>
                <td>默认显示的文本值，当v-model为空时，否则显示value对应的选项；v-model和defaultText都为空时显示列表的第一项</td>
            </tr>
            <tr>
                <td>className</td>
                <td>null</td>
                <td>添加的样式</td>
            </tr>
            <tr>
                <td>showNum</td>
                <td>null</td>
                <td>下拉个数，超出显示滚动条</td>
            </tr>
            <tr>
                <td>option</td>
                <td>Array</td>
                <td>下拉数据列表</td>
            </tr>
            <tr>
                <td>optionUrl</td>
                <td>String</td>
                <td>如存在刚好对应的接口，直接请求接口数据，不用在页面处理。如果请求成功则会覆盖option的值</td>
            </tr>
            <tr>
                <td>onChange</td>
                <td>Function</td>
                <td>下拉点击回调</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>false</td>
                <td>不可点击下拉</td>
            </tr>
            <tr>
                <td>showSearch</td>
                <td>false</td>
                <td>显示搜索项</td>
            </tr>
            <tr>
                <td>searchPlaceholder</td>
                <td></td>
                <td>搜索输入框的提示文字，showSearch=true时有效</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import SelectDropDown from '../components/select/index'
    export default {
        name: 'select',
        path: '/select',
        data () {
            return {
                option: [
                    {text: '选项11', value: '1'},
                    {text: '选项212', value: '2'},
                    {text: '选项3123', value: '30', disabled: true},
                    {text: '选项4', value: '4'},
                    {text: '选项5', value: '5'},
                    {text: '选项6', value: '7'},
                    {text: '选项8', value: '8'},
                    {text: '选项9', value: '9'}
                ],
                selectValue: '',
                onChangeText: ''
            }
        },
        components: {SelectDropDown},
        mounted(){

        },
        methods: {
            onChange(item){
                this.onChangeText = `选项文本值：${item.text}；选中值：${item.value}`;
                // console.log('onChange');
            }
        },
        computed: {},
        filters: {}
    }
</script>