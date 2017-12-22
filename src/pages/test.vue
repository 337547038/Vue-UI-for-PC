<template>
    <div>

    </div>
</template>
<script>
    import Test from '../components/test.vue'
    export default {
        name: 'test',
        path: '/test',
        data(){
            return {
                radioValue: '2',
                radioValue2: '220'
            }
        },
        props: {

        },
        mounted(){

            let days = [];
            const v = this.get(new Date(2017,11));
            const year = v.year;
            const month = v.month;
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
                    m: month > 0 ? month : 12,//这里转为从1开始
                    p: true
                });
                count--
            }
            //当前月
            time.setMonth(time.getMonth() + 2, 0);//切换到当前月份的最后一天，+2是个月了，0再切换到上个月，即当前月
            lastDay = time.getDate();
            /*for (let i = 1; i <= lastDay; i++) {
                days.push({
                    i: i,
                    y: year,
                    m: month + 1//这里转为从1开始
                })
            }
            //下个月
            for (let i = 1; days.length < 42; i++) {
                days.push({
                    i: i,
                    y: month < 11 ? year : year + 1,
                    m: month < 11 ? month + 2 : 1,
                    n: true
                })
            }*/
            console.log(days);
        },
        components: {Test},
        methods: {
            get (time) {
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
            days () {
                const days = []
                const $this = this
                //const year = $this.year
                //const month = $this.month
                const year = 2017
                const month = 12
                const time = new Date(year, month, 1)
                //const dow = $this.local.dow || 7
                const dow = 7
                time.setDate(0) // switch to the last day of last month
                let lastDay = time.getDate()
                const week = time.getDay() || 7
                let count = dow <= week ? (week - dow + 1) : (week + (7 - dow + 1))
                while (count > 0) {
                    days.push({
                        i: lastDay - count + 1,
                        y: month > 0 ? year : year - 1,
                        m: month > 0 ? month - 1 : 11,
                        p: true
                    })
                    count--
                }
                time.setMonth(time.getMonth() + 2, 0) // switch to the last day of the current month
                lastDay = time.getDate()
                let i = 1
                for (i = 1; i <= lastDay; i++) {
                    days.push({
                        i: i,
                        y: year,
                        m: month
                    })
                }
                for (i = 1; days.length < 42; i++) {
                    days.push({
                        i: i,
                        y: month < 11 ? year : year + 1,
                        m: month < 11 ? month + 1 : 0,
                        n: true
                    })
                }
                return days
            }
        }
    }
</script>