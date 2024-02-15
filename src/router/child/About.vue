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
    <h1>About页面</h1>
    <button style="margin-top: 10px" @click="$router.replace('/')">主页</button>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 1000px;
}
</style>
