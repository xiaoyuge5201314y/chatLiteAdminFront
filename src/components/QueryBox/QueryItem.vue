<!--
 * @Description: 筛选项
 * @Version: 1.0
 * @Author: zengxianghui
 * @Date: 2022-07-20 09:14:40
 * @LastEditors: zengxianghui
 * @LastEditTime: 2023-02-28 08:56:31
-->
<script setup lang="ts">
const props = defineProps({
  label: {
    type: [String],
    default: ""
  },
  labelWidth: {
    type: [String, Number],
    default: 100
  },
  widthPercent: {
    type: [String, Number],
    default: "33.2%"
  },
  className: {
    type: String,
    default: ""
  },
  // 是否独自占一行
  isFullLine: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    class="query-item"
    :style="{
      minWidth: props.isFullLine ? '100%' : props.widthPercent,
      maxWidth: props.isFullLine ? '100%' : props.widthPercent
    }"
    :class="props.className"
  >
    <div
      v-if="props.label"
      class="label"
      :style="{ minWidth: props.labelWidth + 'px' }"
    >
      {{ props.label }}:
    </div>
    <!-- <div class="content" :style="{ maxWidth: props.isFullLine ? 'inherit' : '400px' }"> -->
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.query-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 32px;
  .label {
    // width: 100px;
    font-size: 14px;
    color: var(--el-text-color-primary);
    text-align: right;
    margin-right: 8px;
  }
  .content {
    display: flex;
    align-items: center;
    flex: 1;
    // max-width: 400px;
  }
  :deep(.el-input__wrapper) {
    width: 100%;
  }
}
</style>
