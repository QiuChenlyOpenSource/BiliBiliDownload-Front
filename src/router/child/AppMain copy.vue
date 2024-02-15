<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { fetch } from "@tauri-apps/plugin-http"; //这个报错需要解决
import { ConfigStore } from "../../store/Config";
import { Http } from "../../utils/Http";
import { storeToRefs } from "pinia";

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const text = ref("Test Text");

const router = useRouter();

const config = ConfigStore();

const configRefs = storeToRefs(config);

const http = new Http("http://127.0.0.1:6152");

async function greet() {
  console.log("starting");
  const res = await http.get("https://github.com/");
  text.value = res.body;
  config.config.cache = JSON.stringify(res.body);
}

const size = ref("default");
onMounted(() => {
  // greet()
  // getClient().then(async client=>{
  //   const response = await client.get('https://www.baidu.com/',{
  //     responseType:ResponseType.Text
  //   });
  //   console.log(response.data)
  // });
  text.value = JSON.stringify(config.config.cache);
});
</script>

<template>
  <div class="content">
    <h1>AppMain</h1>
    <i-fluent-question-28-filled />
    <button @click="greet">GetHttp</button>
    <text>
      {{ text }}
    </text>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <el-radio-group v-model="size" label="size control" size="small">
      <el-radio-button label="large">large</el-radio-button>
      <el-radio-button label="default">default</el-radio-button>
      <el-radio-button label="small">small</el-radio-button>
    </el-radio-group>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ "List item " + o }}
      </div>
    </el-card>
    <el-row>
      <el-button :icon="Search" circle />
      <el-button type="primary" :icon="Edit" circle />
      <el-button type="success" :icon="Check" circle />
      <el-button type="info" :icon="Message" circle />
      <el-button type="warning" :icon="Star" circle />
      <el-button type="danger" :icon="Delete" circle />
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 1000px;
}
</style>
