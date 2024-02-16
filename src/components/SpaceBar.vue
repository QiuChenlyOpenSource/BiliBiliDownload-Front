<script setup lang="ts">
// 外部传递的参数
const props = defineProps<{
  height?: string;
}>();
</script>

<template>
  <div
    :class="!$props.height ? 'space-bar' : ''"
    :style="{
      'padding-top': !$props.height ? '' : $props.height,
    }"
  ></div>
</template>

<style lang="scss" scoped>
.space-bar {
  background-color: #fff;
  padding-top: var(--statusBarHeight);
}
</style>
