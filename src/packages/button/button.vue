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
    :style="{width:btnWidth}"
    @click="handleClick">
    <i v-if="icon" :class="`icon-${[icon]} ${prefixCls}-icon`"></i>
    <slot></slot>
  </button>
  <a
    v-else
    v-bind="$attrs"
    :class="classStyle"
    :href="disabled?null:routerHref"
    :style="{width:btnWidth}"
    @click="handleClick">
    <i v-if="icon" :class="`icon-${[icon]} ${prefixCls}-icon`"></i>
    <slot></slot>
  </a>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {computed, defineComponent, inject, ref} from 'vue'
import {useRouter} from 'vue-router'
import {GroupConfig} from '../types/button'

export default defineComponent({
  name: `${prefixCls}Button`,
  props: {
    type: pType.string(),
    size: pType.string(),
    routerTo: pType.string(),
    href: pType.string(),
    icon: pType.string(),
    round: pType.bool(),
    disabled: pType.bool(),
    nativeType: pType.oneOfString(['', 'button', 'submit', 'reset']),
    width: pType.string(),
    name: pType.string() // btn group中作为唯一标识
  },
  emits: ['click'],
  setup(props, {emit}) {
    const btnClick = inject('btnClick', '') as (event: Element, name: string) => void
    const groupConfig: GroupConfig = inject('groupConfig', {})
    const btnWidth = ref(props.width || groupConfig.width)
    const classStyle = computed(() => {
      return {
        [`${prefixCls}-btn`]: true,
        'is-round': props.round || groupConfig.round,
        [`${prefixCls}-btn-` + props.type]: props.type,
        'disabled': props.disabled || groupConfig.disabled,
        [props.size || groupConfig.size]: props.size || groupConfig.size
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
        btnClick && btnClick(event, props.name)
      }
    }
    return {
      classStyle,
      routerHref,
      handleClick,
      btnWidth,
      prefixCls
    }
  }
})
</script>
