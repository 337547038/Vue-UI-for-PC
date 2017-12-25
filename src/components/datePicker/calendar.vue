<!--Created by 337547038 on 2017/12/23.-->
<template>
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
                <a v-for="item in days" :class="[_dayClass(item)]" @click="_selectDay(item,$event)">{{item.d}}
                    <span v-text="_innerHTML(item)" v-if="_innerHTML(item)"></span>
                </a>
            </div>
        </div>
        <!--双日历时只需要一个年月面板-->
        <template v-if="!isRight">
            <div class="calendar-months clearfix" v-if="$parent.showMonth||$parent.format=='ym'||$parent.format=='yM'">
                <a v-for="(m,index) in months" v-text="m" :class="[_monthClass(index)]"
                   @click="_selectMonth(index,$event)"></a>
            </div>
            <div class="calendar-year clearfix" v-show="$parent.showYear||$parent.format=='y'">
                <a v-for="y in years" v-text="y" :class="[_yearClass(y)]"
                   @click="_selectYear(y,$event)"></a>
            </div>
        </template>
        <template v-if="$parent.type!='range'"><!--双日期是先不要这-->
            <div class="calendar-time clearfix" v-show="!$parent.showYear&&!$parent.showMonth"
                 v-if="$parent.format=='ymdHms'||$parent.format=='yMDHms'">
                <div class="calendar-time-input">
                    <input type="text" v-model="$parent.hour" maxlength="2">:
                    <input type="text" v-model="$parent.minute" maxlength="2">:
                    <input type="text" v-model="$parent.second" maxlength="2">
                </div>
                <a class="btn-time" @click="_selectConfirm">确定</a>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'calendar',
        data(){
            return {
                year: this.$parent.year,
                month: this.$parent.month,
                day: this.$parent.day
            }
        },
        props: ['days', 'isRight'],
        mounted(){
            this._getRangeTime();
        },
        components: {},
        methods: {
            _getRangeTime(){
                //双日历并是右边时
                if (this.$parent.rangeDefault && this.$parent.type == 'range' && this.isRight) {
                    let time = new Date(this.$parent.rangeDefault);
                    this.year = time.getFullYear();
                    this.month = time.getMonth();
                    this.day = time.getDate();
                }
            },
            _dayClass(item){
                //添加相对应样式，今天、禁用
                let time = new Date(item.y, item.m, item.d);
                let time2 = new Date(this.year, this.month, this.day).toDateString();//这里用初始值，否则选了上下年月，会一直选中一天
                return {
                    'calendar-date-out': item.p || item.n,//非当前月
                    'calendar-date-today': time.toDateString() == new Date().toDateString(),//今天的
                    'calendar-date-select': time.toDateString() == time2,//选中的
                    'calendar-date-disabled': this.$parent.disabledDate(time)//不能选择的
                }
            },
            _selectDay(item, e){
                //选择日期，提供两种回调方法
                //有具体时间选择时不关闭，只能点确定关闭
                //不点选择的日期
                let disabled = e.target.className;
                if (disabled.indexOf('calendar-date-disabled') == -1) {
                    let time;
                    if (this.$parent.type == 'range') {
                        this.year = item.y;
                        this.month = item.m;
                        this.day = item.d;
                        //点按钮才关闭，选日期时先保存值
                        time = this._formatTime(item.y, item.m, item.d);
                        this.$parent._saveValue(time, this.isRight);
                    } else if (this.$parent.type == 'inline') {
                        //直接返回结果，这里更新下
                        this.year = item.y;
                        this.month = item.m;
                        this.day = item.d;
                        time = this._formatTime(item.y, item.m, item.d);
                        this.$parent._emit(time);
                    } else {
                        //将结果返回，关闭下拉
                        if (this.$parent.format == 'ymdHms' || this.$parent.format == 'yMDHms') {
                            //具体时间选择的，点确定关闭
                            this.year = item.y;
                            this.month = item.m;
                            this.day = item.d;
                        } else {
                            time = this._formatTime(item.y, item.m, item.d);
                            this.$parent._emit(time);
                            this.$parent.showHide = false;
                        }
                    }
                }
            },
            _monthClass(m){
                //月份添加相对应样式
                let time = new Date(this.$parent.year, m);
                let time2 = new Date(this.$parent.year, this.$parent.month).toDateString();
                //todo 月份限制有问题，如day===0星期天不能选，此时如time=Sun Jan 01 2017 00:00:00,取得的day也是＝＝＝0，返回true，当月就成了不能选
                return {
                    'calendar-date-select': time.toDateString() == time2//选中的
                    //'calendar-date-disabled': this.$parent.disabledDate(time)//不能选择的
                }
            },
            _selectMonth(m, e){
                //月份选择，关闭月份面板，更新所选月
                let disabled = e.target.className;
                if (disabled.indexOf('calendar-date-disabled') == -1) {
                    this.$parent.showMonth = false;
                    this.$parent.month = m;
                    //如果是年月面板，
                    if (this.$parent.format == 'ym' || this.$parent.format == 'yM') {
                        let time = this._formatTime(this.$parent.year, this.$parent.month);
                        this.$parent._emit(time);
                        this.$parent.showHide = false;//关闭
                    }
                }
            },
            _yearClass(y){
                return {
                    'calendar-date-select': y == this.$parent.year//选中的
                    //'calendar-date-disabled': this.disabledDate(new Date(y))//不能选择的
                }
            },
            _selectYear(y, e){
                //选择年份，关闭年份面板，更新所选年
                let disabled = e.target.className;
                if (disabled.indexOf('calendar-date-disabled') == -1) {
                    this.$parent.showYear = false;
                    this.$parent.year = y;
                    if (this.$parent.format == 'y') {
                        this.$parent._emit(y);
                        this.$parent.showHide = false;//关闭
                    }
                }
            },
            _selectConfirm(){
                //点确定，带时间时，选择日期不能关闭，只能点确定
                let time = this._formatTime(this.year, this.month, this.day, this.$parent.hour, this.$parent.minute, this.$parent.second);
                this.$parent._emit(time);
                this.$parent.showHide = false;//关闭
            },
            _formatTime(y, m, d, h, mm, s){
                const split = '-';
                const time = this._to2(h) + ":" + this._to2(mm) + ":" + this._to2(s);
                const yearMoth2 = y + split + this._to2(m + 1);
                const yearMoth = y + split + (m + 1);
                switch (this.$parent.format) {
                    case 'yMD':
                        return yearMoth2 + split + this._to2(d);
                        break;
                    case 'ymd':
                        return yearMoth + split + d;
                        break;
                    case 'y':
                        return y;
                        break;
                    case 'yM':
                        return yearMoth2;
                        break;
                    case 'ym':
                        return yearMoth;
                        break;
                    case 'yMDHms':
                        return yearMoth2 + split + this._to2(d) + " " + time;
                        break;
                    case 'ymdHms':
                        return yearMoth + split + d + " " + time;
                        break;
                }
            },
            _to2(v){
                //将一位转为两位
                return v < 10 ? '0' + parseInt(v) : v;
            },
            _innerHTML(item){
                let time = new Date(item.y, item.m, item.d);
                return this.$parent.innerHTML ? this.$parent.innerHTML(time) : ""
            }
        },
        computed: {
            months(){
                //月列表
                return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            years(){
                //每次显示十年，显示前面四年，后面五年
                let array = [];
                for (let i = this.year - 4; i <= this.year + 5; i++) {
                    array.push(i);
                }
                return array;
            }
        }
    }
</script>