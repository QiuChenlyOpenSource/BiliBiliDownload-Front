<script setup lang="ts">
import Greet from "./router/child/Home.vue";

import { parseMinWidth } from "element-plus/es/components/table/src/util";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const title = ref("B站视频下载控制端");
onMounted(async () => {
  // router.replace("/home");
});
</script>

<template>
  <div class="container">
    <div data-tauri-drag-region class="head-bar">
      <div class="app-title">{{ title }}</div>
    </div>
    <div class="user-safe-area">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

.head-bar {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: var(--statusBarHeight);
  cursor: move;
  display: flex;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1000;

  &:hover {
    background-color: var(--normal-color);
    box-shadow: 0 5px 10px var(--shadow);
  }

  .app-title {
    font-size: 14px;
    text-align: center;
    pointer-events: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.user-safe-area {
  flex: 1;
  overflow: hidden;
}
</style>
