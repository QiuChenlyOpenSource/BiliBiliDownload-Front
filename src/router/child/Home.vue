<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const greetMsg = ref("");
const name = ref("");
const router = useRouter();

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>
  <div class="content">
    <h1 style="margin-top: 10px">欢迎使用Tauri!</h1>

    <div class="row">
      <a href="#" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="#" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="#" target="_blank">
        <img src="/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <p style="margin-top: 10px">点击 Tauri, Vite, 和 Vue 图标了解更多.</p>
    <p style="margin-top: 10px">
      推荐的IDE和插件:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      +
      <a href="https://github.com/tauri-apps/tauri-vscode" target="_blank"
        >Tauri</a
      >
      +
      <a href="https://github.com/rust-lang/rust-analyzer" target="_blank"
        >rust-analyzer</a
      >
    </p>

    <p style="margin-top: 10px">
      这是自动引入的<a
        href="https://icones.js.org/collection/all"
        target="_blank"
        alt="点击查看更多图标"
        >图标</a
      >:<i-fluent-question-28-filled />
    </p>

    <div class="card" style="margin-top: 10px">
      <input id="greet-input" v-model="name" placeholder="输入任意字符串..." />
      <button style="margin-left: 10px" type="button" @click="greet()">
        点我
      </button>
      <br />
      <button
        style="margin-top: 10px"
        type="button"
        @click="router.replace('/about')"
      >
        去关于页面
      </button>
      <br />
      <button style="margin-top: 10px" @click="toggleDark()">
        [黑暗模式状态检测]当前状态是: {{ isDark }}
      </button>
    </div>

    <p>{{ greetMsg }}</p>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 1000px;
  margin-top: 100px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
