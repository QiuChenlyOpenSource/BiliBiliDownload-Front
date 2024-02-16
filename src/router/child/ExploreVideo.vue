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
    <SpaceBar />
    <div class="user-area">asd</div>
    <SpaceBar height="var(--bottom-function-bar-height)" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  overflow: scroll;
  flex: 1;
}
</style>
