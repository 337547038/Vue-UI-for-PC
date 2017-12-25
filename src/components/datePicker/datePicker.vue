<!--Created by 337547038 on 2017/12/20.-->
<template>
    <transition name="date-picker">
        <div class="date-picker clearfix" v-if="showHide" :style="pickerStyle" @click="_stopPropagation"
             :class="{'date-picker-range':type=='range'}">
            <template v-if="type=='range'">
                <div class="calendar">
                    <div class="calendar-head">
                        <a class="calendar-prev-year" @click="year--">«</a>
                        <a class="calendar-prev-month" @click="_monthPN(-1)">‹</a>
                        <a class="calendar-year-select" @click="showYear=true">{{year}}年</a>
                        <a class="calendar-year-month" @click="showMonth=true">{{month+1}}月</a>
                    </div>
                    <Calendar :days="filterDaysLeft"></Calendar>
                </div>
                <div class="calendar">
                    <div class="calendar-head">
                        <a class="calendar-year-select" @click="showYear=true">{{rightYear}}年</a>
                        <a class="calendar-year-month" @click="showMonth=true">{{rightMonth}}月</a>
                        <a class="calendar-next-month" @click="_monthPN(1)">›</a>
                        <a class="calendar-next-year" @click="year++">»</a>
                    </div>
                    <Calendar :days="filterDaysRight" :isRight="true"></Calendar>
                </div>
                <div class="btn-time" @click="_selectConfirm">确定</div>
            </template>
            <template v-else>
                <div class="calendar">
                    <div class="calendar-head">
                        <template v-if="showMonth || format=='ym' || format=='yM'">
                            <a class="calendar-prev-year" @click="year--">«</a>
                            <a class="calendar-year-select" @click="showYear=true">{{year}}年</a>
                            <a class="calendar-next-year" @click="year++">»</a>
                        </template>
                        <template v-else-if="showYear || format=='y'">
                            <a class="calendar-prev-year" @click="year-=10">«</a>
                            <a class="calendar-year-select">{{year}}年</a>
                            <a class="calendar-next-year" @click="year+=10">»</a>
                        </template>
                        <template v-else>
                            <a class="calendar-prev-year" @click="year--">«</a>
                            <a class="calendar-prev-month" @click="_monthPN(-1)">‹</a>
                            <a class="calendar-year-select" @click="showYear=true">{{year}}年</a>
                            <a class="calendar-year-month" @click="showMonth=true">{{month+1}}月</a>
                            <a class="calendar-next-month" @click="_monthPN(1)">›</a>
                            <a class="calendar-next-year" @click="year++">»</a>
                        </template>
                    </div>
                    <Calendar :days="days"></Calendar>
                </div>
            </template>
        </div>
    </transition>
</template>
<script>
    import Calendar from './calendar'
    export default {
        name: 'datePicker',
        data () {
            const time = this._getTime(this.value);
            return {
                rangeValue: [],//两个日历用于保存点击的值
                rangeDefault: time.rangeDefault,//双日历时保存右边初始值，用于默认时选中
                showHide: true,
                year: time.year,
                month: time.month,
                day: time.day,
                hour: this._to2(time.hour),
                minute: this._to2(time.minute),
                second: this._to2(time.second),
                showMonth: false,//显示月份选择面板
                showYear: false//显示年份选择面板
            }
        },
        watch: {
            value(v){
                console.log('datePicker value change');
                // console.log(v);
                //todo 下拉日期点击时，通过index再到page的输入框，当page的value改变了，应该是同步进来，但这里value不会改变
                const time = this._getTime(v);
                this.year = time.year;
                this.month = time.month;
                this.day = time.day;
                this.hour = time.hour;
                this.minute = time.minute;
                this.second = time.second;
            },
            hour(v){
                if (isNaN(parseInt(v))) {
                    this.hour = '00';
                } else {
                    if (parseInt(v) > 12) {
                        this.hour = 12;
                    }
                }
            },
            minute(v){
                if (isNaN(parseInt(v))) {
                    this.minute = '00';
                } else {
                    if (parseInt(v) > 60) {
                        this.minute = 60;
                    }
                }
            },
            second(v){
                if (isNaN(parseInt(v))) {
                    this.second = '00';
                } else {
                    if (parseInt(v) > 60) {
                        this.second = 60;
                    }
                }
            }
        },
        props: {
            value: [String, Number],
            disabledDate: {
                type: Function,
                default: function () {
                    return false
                }
            },
            offset: Object,//坐标信息
            input: Function,//选择回调
            format: {//返回日期格式
                type: String,
                default: 'yMD'
            },
            type: {
                type: String,
                default: 'normal'
            },
            split: {
                type: String,
                default: '至'
            },
            innerHTML: Function
        },
        components: {Calendar},
        methods: {
            close(){
                this.showHide = false;
            },
            _monthPN(t){
                //上下月
                if (t > 0) {
                    //next
                    if (this.month < 11) {
                        this.month++
                    } else {
                        this.month = 0;
                        this.year++
                    }
                } else {
                    if (this.month > 0) {
                        this.month--
                    } else {
                        this.month = 11;
                        this.year--
                    }
                }
            },
            _getTime (dt) {
                //value三种可能1：value=2017-12-12，2：value=2017-12-12到2018-12-12，3：空
                let time;
                let defaultValue;
                if (dt) {
                    if (dt.indexOf(this.split) != -1) {
                        time = new Date(dt.split(this.split)[0]);
                        if (time == 'Invalid Date') {
                            //日期不合法
                            time = new Date();
                        }
                        if (this.type == 'range') {
                            //双日历保存右边的初值
                            defaultValue = dt.split(this.split)[1];
                            if (defaultValue == 'Invalid Date') {
                                //日期不合法
                                defaultValue = '';
                            }
                        }
                    } else {
                        time = new Date(dt.toString());
                        if (time == 'Invalid Date') {
                            //日期不合法
                            time = new Date();
                        }
                    }
                } else {
                    //空
                    time = new Date();
                }
                return {
                    year: time.getFullYear(),
                    month: time.getMonth(),
                    day: time.getDate(),
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                    second: time.getSeconds(),
                    rangeDefault: defaultValue
                }
            },
            _saveValue(time, isRight){
                //双日历时保存值
                if (isRight) {
                    this.rangeValue[1] = time;
                } else {
                    this.rangeValue[0] = time;
                }
            },
            _selectConfirm(){
                //双日历确定，两个都有值时
                if (this.rangeValue.length === 2) {
                    this._emit(this.rangeValue[0] + this.split + this.rangeValue[1]);
                }
                this.showHide = false;
            },
            _to2(v){
                //将一位转为两位
                return v < 10 ? '0' + parseInt(v) : v;
            },
            _emit(time){
                this.$emit('input', time);
                this.input ? this.input(time) : "";
            },
            _stopPropagation(e){
                e.stopPropagation();
            }
        },
        computed: {
            pickerStyle(){
                //下拉日期位置
                if (this.offset) {
                    return {
                        left: this.offset.left + 'px',
                        top: this.offset.top + this.offset.height + 'px'
                    }
                }
            },
            days(){
                let days = [];
                const year = this.year;
                const month = this.month;
                const time = new Date(year, month, 1);
                //计算上个月剩多少天
                time.setDate(0);//切换到上个月的最后一天
                let lastDay = time.getDate();//当月天数
                const week = time.getDay();//星期几，前面已切换为上月最后一天，这里表示上个月最后一天是星期几
                let count = week + 1;//星期天开始
                while (count > 0) {
                    days.push({
                        d: lastDay - count + 1,
                        y: month > 0 ? year : year - 1,//0为1月，即上一年
                        m: month > 0 ? month - 1 : 11,
                        p: true
                    });
                    count--
                }
                //当前月
                time.setMonth(time.getMonth() + 2, 0);//切换到当前月份的最后一天，+2是个月了，0再切换到上个月，即当前月
                lastDay = time.getDate();//当月天数
                for (let i = 1; i <= lastDay; i++) {
                    days.push({
                        d: i,
                        y: year,
                        m: month
                    })
                }
                //下个月
                for (let i = 1; days.length < 42; i++) {
                    days.push({
                        d: i,
                        y: month < 11 ? year : year + 1,
                        m: month < 11 ? month + 1 : 0,
                        n: true
                    })
                }
                //////////////////////////////////////////////
                //双日历时，右边日历
                if (this.type == 'range') {
                    let count = time.getDay() + 1;//右边日历的上一个月，即左边的当前月
                    while (count > 0) {
                        days.push({
                            d: lastDay - count + 1,
                            y: year,
                            m: month,
                            p: true
                        });
                        count--
                    }
                    time.setMonth(time.getMonth() + 2, 0);//切换到下月的最后一天
                    for (let i = 1; i <= time.getDate(); i++) {
                        days.push({
                            d: i,
                            y: time.getFullYear(),
                            m: time.getMonth()
                        })
                    }
                    for (let i = 1; days.length < 84; i++) {
                        days.push({
                            d: i,
                            y: time.getMonth() < 11 ? time.getFullYear() : time.getFullYear() + 1,
                            m: time.getMonth() < 11 ? time.getMonth() + 1 : 0,
                            n: true
                        })
                    }
                }
                return days;
            },
            filterDaysLeft(){
                return this.days.slice(0, 42);
            },
            filterDaysRight(){
                return this.days.slice(42);
            },
            rightYear(){
                //双日历时右边表头
                const time = new Date(this.year, this.month);//这里直接转时间
                time.setMonth(time.getMonth() + 1);//切换到下月
                return time.getFullYear();
            },
            rightMonth(){
                //双日历时右边表头
                const time = new Date(this.year, this.month);//这里直接转时间
                time.setMonth(time.getMonth() + 1);//切换到下月
                return time.getMonth() + 1;
            }
        },
        mounted(){

        },
        filters: {}
    }
</script>