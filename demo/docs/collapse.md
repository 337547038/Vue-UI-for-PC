<!-- Created by 337547038 on 2018/8/31 0031. -->
# Collapse 折叠面板

### 基础用法
:::demo 可同时展开多个面板，面板之间不影响
```html
<template>
  <div>
    <ak-collapse>
      <ak-collapse-panel>
        标题1
        <template slot="content">
          <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
          <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p></template>
      </ak-collapse-panel>
      <ak-collapse-panel>
        标题2
        <div slot="content">
          <p>简化流程：设计简洁直观的操作流程；</p>
          <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
          <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
        </div>
      </ak-collapse-panel>
    </ak-collapse>
  </div>
</template>
```
:::

### 自定面板标题
:::demo 
```html
<template>
  <div>
    <ak-collapse>
      <ak-collapse-panel>
        <i class="icon-arrow"></i> 标题1 <i class="icon-warn"></i>
        <template slot="content">
          <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
          <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p></template>
      </ak-collapse-panel>
      <ak-collapse-panel>
        <i class="icon-arrow"></i> 标题2
        <div slot="content">
          <p>简化流程：设计简洁直观的操作流程；</p>
          <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
          <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
        </div>
      </ak-collapse-panel>
    </ak-collapse>
  </div>
</template>
<style>
.collapse-panel .icon-arrow{display: inline-block;font-size: 14px;transition: all .3s}
.collapse-panel.active .icon-arrow{transform: rotate(180deg)}
</style>
```
:::

### 手风琴效果
:::demo 每次只能展开一个面板
````html
<template>
  <div>
    <ak-collapse :accordion="true">
      <ak-collapse-panel>
        标题1
        <div slot="content">
          <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
          <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p></div>
      </ak-collapse-panel>
      <ak-collapse-panel>
        标题2
        <div slot="content">
          <p>简化流程：设计简洁直观的操作流程；</p>
          <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
          <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
        </div>
      </ak-collapse-panel>
      <ak-collapse-panel>
        标题3
        <div slot="content">
          <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
          <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p></div>
      </ak-collapse-panel>
      <ak-collapse-panel>
        标题4
        <div slot="content">
          <p>简化流程：设计简洁直观的操作流程；</p>
          <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
          <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
        </div>
      </ak-collapse-panel>
    </ak-collapse>
  </div>
</template>

````
:::

### 指定展开项
:::demo 通过添加`value`和`name`展开指定项
```html
<template>
  <div>
    <ak-collapse value="pane2">
      <ak-collapse-panel name="pane1">
        标题1
        <template slot="content">
          <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
          <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p></template>
      </ak-collapse-panel>
      <ak-collapse-panel name="pane2">
        标题2
        <div slot="content">
          <p>简化流程：设计简洁直观的操作流程；</p>
          <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</p>
          <p>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</p>
        </div>
      </ak-collapse-panel>
    </ak-collapse>
  </div>
</template>

```
:::

## API
### Collapse
|参数|类型|说明|
|-|-|-|
|value          | String         |当前激活的面板的，对应panel里的name，可不填|
|accordion      | boolean/false  |风琴效果，开启后每次只能展开一个面板|
|change         | function       |切换事件|
|class          | String         |原生 class|

### Panel
|参数|类型|说明|
|-|-|-|
|name           | String         |对应Collapse里的value，可不填|
|class          | String         |原生 class|

### Panel Slot
|参数|说明|
|-|-|
|content        | 内容|

