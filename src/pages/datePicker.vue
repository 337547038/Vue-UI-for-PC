<!--Created by 337547038 on 2017/12/20.-->
<template>
    <div class="demo">
        <DatePicker placeholder="select" v-model="value"></DatePicker>
        {{value}}
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>{{time.toDateString()}}</p>
        <picker v-model="time"></picker>
    </div>
</template>
<script>
    import DatePicker from '../components/datePicker/index'
    import picker from '../components/datePicker/datePicker'
    export default {
        name: 'datePicker',
        path: '/datePicker',
        data () {
            return {
                value: '',
                time:new Date()
            }
        },
        props: {},
        components: {DatePicker,picker},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>