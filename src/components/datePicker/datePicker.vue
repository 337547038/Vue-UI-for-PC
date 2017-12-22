<!--Created by 337547038 on 2017/12/20.-->
<template>
    <div class="date-picker clearfix" v-if="showHide">
        <div class="calendar">
            <div class="calendar-head">
                <a class="calendar-prev-year" @click="year--">«</a>
                <a class="calendar-prev-month" @click="_monthPN(-1)">‹</a>
                <a class="calendar-year-select">{{year}}年</a>
                <a class="calendar-year-month">{{month+1}}月</a>
                <a class="calendar-next-month" @click="_monthPN(1)">›</a>
                <a class="calendar-next-year" @click="year++">»</a>
            </div>
            <div class="calendar-body">
                <div class="calendar-days">
                    <div class="calendar-week clearfix">
                        <a>日</a>
                        <a>一</a>
                        <a>二</a>
                        <a>三</a>
                        <a>四</a>
                        <a>五</a>
                        <a>六</a>
                    </div>
                    <div class="calendar-list clearfix">
                        <a :class="[_calendarClass(item)]" v-for="item in days" v-text="item.d"
                           @click="_selectDay(item)"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'datePicker',
        data () {
            const time = this._getTime(this.value);
            return {
                showHide: true,
                year: time.year,
                month: time.month,
                day: time.day,
                hour: time.hour,
                minute: time.minute,
                second: time.second
            }
        },
        watch: {
            value(v){
                const time = this._getTime(v);
                this.year = time.year;
                this.month = time.month;
                this.day = time.day;
                this.hour = time.hour;
                this.minute = time.minute;
                this.second = time.second;
            }
        },
        props: {
            value: {
                default: function () {
                    return new Date()
                }
            }
        },
        components: {},
        methods: {
            close(){
                this.showHide = false;
            },
            open(){
                this.showHide = true;
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
            _selectDay(item){
                //选择日期
                this.$emit('input', new Date(item.y, item.m, item.d));
            },
            _calendarClass(item){
                //添加相对应样式，今天、禁用
                let time = new Date(item.y, item.m, item.d).toDateString();
                let time2 = new Date(this.year, this.month, this.day).toDateString();
                let min = new Date(2017, 11, 10, 0, 0, 0).toDateString();
                let max = new Date(2017, 11, 20, 0, 0, 0);
                return {
                    'calendar-date-out': item.p || item.n,//非当前月
                    'calendar-date-select': time == time2,//选中的
                    'calendar-date-disabled': min < time,//不能选择的
                }
            },
            _getTime (time) {
                return {
                    year: time.getFullYear(),
                    month: time.getMonth(),
                    day: time.getDate(),
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                    second: time.getSeconds()
                }
            }
        },
        computed: {
            days(){
                let days = [];
                const year = this.year;
                const month = this.month;
                const time = new Date(year, month, 1);
                //计算上个月剩多少天
                time.setDate(0);//切换到上个月的最后一天
                let lastDay = time.getDate();//当月开数
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
                lastDay = time.getDate();
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
                return days;
            }
        },
        mounted(){
            let time = new Date(20, item.m, item.d).toDateString();
            let min = new Date(2017, 11, 10, 0, 0, 0).toDateString();
        },
        filters: {}
    }
</script>