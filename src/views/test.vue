<!--<template>
  <ak-tabs>
      <ak-tab-pane label="用户管理">用户管理</ak-tab-pane>
      <ak-tab-pane label="配置管理">配置管理</ak-tab-pane>
      <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
      <ak-tab-pane label="定时任务补偿">
        <template #default="scope">
          定时任务补偿{{scope}}
        </template>
      </ak-tab-pane>
      <ak-tab-pane>
        <template #label><i class="icon-user"></i> 用户管理</template>
        用户管理
      </ak-tab-pane>
    </ak-tabs>
&lt;!&ndash;  <childTest>
    <template #default="scope">
      111{{ scope }}
    </template>
  </childTest>&ndash;&gt;
</template>-->
<script>
import {reactive, toRefs, h} from 'vue'
import childTest from './components/childTest.vue'

export default {
  components: {childTest},
  setup() {

    return () => [
      h('div', {class: 'counter-display'}, [
        h('span', {class: 'counter-label'}, '恭喜你，你已经写了'),
        h('span', {class: 'counter-text'}, 1),
        h('span', {class: 'counter-label'}, '斤代码！')
      ])
    ]
  }
}
</script>
