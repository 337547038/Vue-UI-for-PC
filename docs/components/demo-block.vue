<template>
  <div class="demo-block">
    <div class="demo-block-meta"
         v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="demo-block-source">
      <slot name="source"></slot>
      <div class="demo-block-code-icon" :class="{'show':showCode}"  @click="showCode=!showCode">
        <span></span><i>显示代码</i>
      </div>
    </div>
    <transition name="slide-toggle">
      <div class="demo-block-code"
           v-show="showCode">
        <slot name="highlight"></slot>
        <div class="demo-block-code-icon" :class="{'show':showCode}" @click="showCode=!showCode">
          <span></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showCode: false
    }
  },
  mounted () {
  }
}
</script>
<style>
  .demo-block{border: 1px solid #ebedf0;border-radius: 2px;display: inline-block;width: 100%;position: relative;margin: 0 0 16px;-webkit-transition: all 0.2s;transition: all 0.2s;}
  .demo-block p{padding: 0;margin: 0;}
  .demo-block-code-icon{height: 30px;line-height: 30px;border-top: 1px solid #ebedf0;text-align: center;cursor: pointer}
  .demo-block-code-icon span{width: 30px;height: 30px;display: inline-block;margin: 0 auto;cursor: pointer;vertical-align: middle}
  .demo-block-code-icon span:after{content: '';display: block;width: 10px;height: 10px;border-left: 1px solid #666;border-bottom: 1px solid #666;transform: rotate(-45deg);transition: all .3s;margin: 6px auto;}
  .demo-block-code-icon i{display: inline-block;vertical-align: middle;transform: translateX(100px);opacity: 0;transition: all .5s}
  .demo-block-code-icon.show span:after{transform: rotate(135deg);margin-top: 16px;}
  .demo-block-code-icon:hover{background: #eeffde}
  .demo-block-code-icon:hover i{transform: translateX(0);opacity: 1}
  .demo-block .demo-block-source{border-bottom: 1px solid #ebedf0;color: #444;position: relative;margin-bottom: -1px;}
  .demo-block .demo-block-source .source{padding: 20px 24px 20px;line-height: 24px}
  .demo-block .demo-block-meta{position: relative;padding: 12px 50px 12px 20px;-webkit-transition: background-color 0.4s;transition: background-color 0.4s;width: 100%;-webkit-box-sizing: border-box;box-sizing: border-box;font-size: 14px;color: #444;line-height: 2;border-radius: 0;border-bottom: 1px dashed #ebedf0;margin-bottom: -1px;}
  .demo-block .demo-block-code{background-color: #f7f7f7;font-size: 0;}
  .demo-block .demo-block-code code{background-color: #f7f7f7;border: none;display: block;padding: 16px 32px;height: auto;line-height: 22px;margin: 0}
  .demo-block .demo-block-code pre{margin: 0;padding: 0;}
  .sh-checkbox{color: #444;font-weight: 500;font-size: 14px;position: relative;cursor: pointer;display: inline-block;white-space: nowrap;user-select: none;}
  .slide-toggle-enter-active{ animation: slideDown .3s; transform-origin: center top }
  .slide-toggle-leave-active{ animation: slideUp .3s; transform-origin: center top }
  @keyframes slideDown{
    0%{ opacity: 0; transform: scaleY(0); }
    100%{ opacity: 1; transform: scaleY(1); }
  }
  @keyframes slideUp{
    0%{ opacity: 1; transform: scaleY(1); }
    100%{ opacity: 0; transform: scaleY(0); }
  }
</style>
