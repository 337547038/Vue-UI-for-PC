<!-- Created by 337547038 on 2021/6/13. -->
<template>
  <ak-collapse :accordion="true">
    <ak-collapse-panel>
      标题1
      <template v-slot:content>
        <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
        <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
      </template>
    </ak-collapse-panel>
    <ak-collapse-panel>
      标题2
      <template v-slot:content>
        <p>简化流程：设计简洁直观的操作流程；</p>
        <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
        <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
      </template>
    </ak-collapse-panel>
    <ak-collapse-panel>
      标题3
      <template v-slot:content>
        <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
        <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
      </template>
    </ak-collapse-panel>
    <ak-collapse-panel>
      标题4
      <template v-slot:content>
        <p>简化流程：设计简洁直观的操作流程；</p>
        <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
        <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
      </template>
    </ak-collapse-panel>
  </ak-collapse>
</template>

<script>
export default {
  name: '1',
  data() {
    return {}
  },
  props: {},
  components: {},
  methods: {},
  computed: {},
  mounted() {
  }
}
</script>
