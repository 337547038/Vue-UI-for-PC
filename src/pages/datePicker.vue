<!--Created by 337547038 on 2017/12/20.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>DatePicker Demo</h1>
        <h2>Use</h2>
        <pre>import DatePicker from '../components/datePicker/index'</pre>
        <pre>&lt;DatePicker v-model="value">&lt;/DatePicker></pre>
        <h2>说明</h2>
        <p>日期弹出窗插入在body节点里，避免受父元素定位的影响，添加了overflow:hidden而被隐藏</p>
        <h3>1、基本使用</h3>
        <p>没有值时默认为当天 value:{{value}}</p>
        <DatePicker placeholder="select" v-model="value"></DatePicker>
        <h3>2、有时间ymd</h3>
        <DatePicker placeholder="select" v-model="value2" format="ymd"></DatePicker>
        <h3>3、年</h3>
        <DatePicker v-model="value3" format="y"></DatePicker>
        <h3>4、年月 ym</h3>
        <DatePicker v-model="value4" format="ym"></DatePicker>
        <h3>5、年月 yM</h3>
        <DatePicker v-model="value5" format="yM"></DatePicker>
        <h3>6、时间 ymdHms</h3>
        <DatePicker v-model="value6" format="ymdHms"></DatePicker>
        <h3>7、时间 yMDHms</h3>
        <DatePicker v-model="value7" format="yMDHms" placeholder="请选择"></DatePicker>
        <h3>8、disabled</h3>
        <DatePicker v-model="value8" format="yMDHms" placeholder="请选择" :disabled="true"></DatePicker>
        <h3>9、disabledDate</h3>
        <p>时间日期面板设定年月日可选条件，暂不支持时分秒限制</p>
        <pre>
        disabledDate9(time){
            var day = time.getDay();
            return day === 0 || day === 6;
        }</pre>
        <DatePicker v-model="value9" placeholder="星期六日不能选择" :disabledDate="disabledDate9"></DatePicker>
        <h3>10、disabledDate</h3>
        <pre>
        disabledDate10(time){
           let min = new Date(2017, 10, 20);
           let max = new Date(2017, 11, 20);
           return time < min || time > max
        }</pre>
        <DatePicker placeholder="可选2017-11-20至2017-12-20" :disabledDate="disabledDate10" v-model="value10"></DatePicker>
        <h3>11、inline</h3>
        <pre>
            import Picker from '../components/datePicker/datePicker'
            &lt;Picker v-model="value11">&lt;/Picker></pre>
        <p>选中值：{{value11}}</p>
        <div style="height: 230px;position: relative">
            <Picker v-model="value11" type="inline"></Picker>
        </div>
        <h3>12、range</h3>
        <p>暂只支持yMd格式，年或月选择暂不支持</p>
        <DatePicker placeholder="可选2017-11-20至2017-12-20" :disabledDate="disabledDate10" type="range"
                    v-model="value12"></DatePicker>
        <h3>13、innerHTML</h3>
        <p>可以将特殊提示的文本插入到指定的日期里，例如假期提示</p>
        <pre>
            innerHTML(time){
                let start = new Date(2017, 11, 30);
                let end = new Date(2018, 0, 1);
                if (time >= start && time <= end) {
                    return '休'
                }
            }</pre>
        <DatePicker placeholder="2018年元旦假期提示" v-model="value13" :innerHTML="innerHTML"></DatePicker>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td></td>
                <td>通过v-model双向绑定</td>
            </tr>
            <tr>
                <td>placeholder</td>
                <td>String</td>
                <td>输入框提示占位文本</td>
            </tr>
            <tr>
                <td>showClear</td>
                <td>Boolean｜true</td>
                <td>显示input右边的清空按钮</td>
            </tr>
            <tr>
                <td>disabledDate</td>
                <td>Function</td>
                <td>禁用的时间，return true时将不能选择</td>
            </tr>
            <tr>
                <td>format</td>
                <td>String</td>
                <td>显示类型，大写表示两位。y(年选择)、ym(年月选择)、yM(年月选择)、ymd(年月日选择)、yMD(年月日，默认)、ymdHms(年月日时分秒选择)、yMDHms(年月日时分秒选择)</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>Boolean｜false</td>
                <td>禁用</td>
            </tr>
            <tr>
                <td>type</td>
                <td>String｜normal</td>
                <td>显示类型，三种normal、inline、range</td>
            </tr>
            <tr>
                <td>split</td>
                <td>String｜至</td>
                <td>双日历时的分隔符，默认值也要按要求传进去</td>
            </tr>
            <tr>
                <td>innerHTML</td>
                <td>Function</td>
                <td>可以将特殊提示的文本插入到指定的日期里</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import DatePicker from '../components/datePicker/index'
    import Picker from '../components/datePicker/datePicker'
    export default {
        name: 'datePicker',
        path: '/datePicker',
        data () {
            return {
                value: '',
                value2: '2017-2-20',
                value3: '2017',
                value4: '2017-8',
                value5: '2017-08',
                value6: '2017-8-8 08:08:08',
                value7: '',
                value8: '2017-12-20',
                value9: '',
                value10: '',
                value11: '',
                value12: '2017-11-23至2017-12-12',
                value13: ''
            }
        },
        props: {},
        components: {DatePicker, Picker},
        methods: {
            disabledDate9(time){
                var day = time.getDay();
                return day === 0 || day === 6;
                /*let min = new Date(2017, 10, 10,0,0,0);
                 let max = new Date(2017, 11, 20);
                 return time < min || time > max*/

            },
            disabledDate10(time){
                let min = new Date(2017, 10, 20);
                let max = new Date(2017, 11, 20);
                return time < min || time > max

            },
            innerHTML(time){
                let start = new Date(2017, 11, 30);
                let end = new Date(2018, 0, 1);
                if (time >= start && time <= end) {
                    return '休'
                }
            }
        },
        computed: {
            formatTime(){

            }
        },
        mounted(){
        },
        filters: {},
        watch: {
            value(){
                // console.log('page value change')
            }
        }
    }
</script>