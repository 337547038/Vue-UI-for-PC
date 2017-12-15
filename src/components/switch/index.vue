<!--Created by 337547038 on 2017/12/13.-->
<template>
    <span class="switch" @click="_click" :class="{'switch-checked':checked,'disabled':disabled}">
        <i class="switch-inner">
            <slot name="open" v-if="checked"></slot>
            <slot name="close" v-else></slot>
        </i>
    </span>
</template>
<script>
    export default {
        name: 'switch',
        data () {
            return {
                checked: this.value
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            change: Function
        },
        components: {},
        mounted(){
        },
        methods: {
            _click(){
                if (!this.disabled) {
                    this.checked = !this.checked;
                    this.$emit('input', this.checked);
                    this.change ? this.change(this.checked) : "";//回调
                }
            }
        },
        computed: {},
        filters: {}
    }
</script>