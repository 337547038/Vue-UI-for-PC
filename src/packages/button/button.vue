<!-- Created by 337547038 on 2018/8/27 0027. -->
<!--
 <Button>默认按钮</Button>
-->
<template>
  <button
    v-if="nativeType"
    v-bind="$attrs"
    :type="nativeType"
    :class="classStyle"
    :disabled="disabled"
    @click="handleClick">
    <i v-if="icon" :class="`icon-${[icon]}`"></i>
    <slot></slot>
  </button>
  <a
    v-else
    v-bind="$attrs"
    :class="classStyle"
    :href="disabled?null:routerHref"
    @click="handleClick">
    <i v-if="icon" :class="`icon-${[icon]}`"></i>
    <slot></slot>
  </a>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {computed, defineComponent} from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: `${prefixCls}Button`,
  components: {},
  props: {
    type: pType.string(),
    size: pType.string(),
    routerTo: pType.string(),
    href: pType.string(),
    icon: pType.string(),
    round: pType.bool(),
    disabled: pType.bool(),
    nativeType: pType.oneOfString(['', 'button', 'submit', 'reset'])
  },
  emits: ['click'],
  setup(props, {emit}) {
    const classStyle = computed(() => {
      return {
        [`${prefixCls}-btn`]: true,
        'is-round': props.round,
        [`${prefixCls}-btn-` + props.type]: props.type,
        'disabled': props.disabled,
        [props.size]: props.size
      }
    })
    const routerHref = computed(() => {
      // 解释路由url，即<router-link :to="/button">转<a href="#/button">
      if (props.routerTo) {
        const $router = useRouter()
        let routeData = $router.resolve({path: props.routerTo})
        return routeData.href
      } else if (props.href) {
        return props.href
      } else {
        return null
      }
    })
    const handleClick = (event: Element) => {
      if (!props.disabled) {
        emit('click', event)
      }
    }
    return {
      classStyle,
      routerHref,
      handleClick
    }
  }
})
</script>
