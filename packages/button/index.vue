<!-- Created by 337547038 on 2018/8/27 0027. -->
<!--
 <Button>默认按钮</Button>
-->
<template>
  <button v-bind="$attrs"
          :type="nativeType"
          :class="classStyle"
          :disabled="disabled"
          @click="_handleClick"
          v-if="nativeType">
    <slot></slot>
  </button>
  <a v-bind="$attrs"
     :class="classStyle"
     :href="routerHref"
     @click="_handleClick"
     v-else>
    <slot></slot>
  </a>
</template>

<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Button`,
  data () {
    return {}
  },
  props: {
    type: String,
    href: String,
    routerTo: String,
    /* plain: {
      type: Boolean,
      default: false
    }, */
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    nativeType: {
      // 原生 type 属性
      default: '',
      validator: value => {
        return ['', 'button', 'submit', 'reset'].indexOf(value) !== -1
      }
    }
  },
  components: {},
  methods: {
    _handleClick (evt) {
      this.$emit('click', evt)
    }
  },
  computed: {
    classStyle () {
      return {
        [`${prefixCls}-btn`]: true,
        'is-round': this.round,
        [`${prefixCls}-btn-` + this.type]: this.type,
        'is-disabled': this.disabled
      }
    },
    routerHref () {
      // 解释路由url，即<router-link :to="/button">转<a href="#/button">
      if (this.routerTo) {
        let routeData = this.$router.resolve({path: this.routerTo})
        return routeData.href
      } else {
        return this.href
      }
    }
  },
  mounted () {
  }
}
</script>
