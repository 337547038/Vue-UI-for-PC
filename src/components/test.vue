<template>
    <div class="radio-component">
        <formItem>
            <vInput></vInput>
        </formItem>
    </div>
</template>

<script>
    import vInput from '../components/input/index'
    import formItem from '../components/form/formItem'

    export default {
        data(){
            return {}
        },
        components: {vInput, formItem},
        props: [],
        watch: {},
        methods: {},
        mounted(){

        },
        computed: {}
    }
</script>