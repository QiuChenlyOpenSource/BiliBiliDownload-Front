<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { useDark, useToggle } from "@vueuse/core";
import { RouterView, useRouter } from "vue-router";
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
import { Bili, BilibiliApi } from "../../utils/Bili";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const text = ref("Test Text");

const router = useRouter();

const config = ConfigStore();

const configRefs = storeToRefs(config);

const needLogin = ref(true);

const size = ref("default");

onMounted(async () => {
  // greet()
  // getClient().then(async client=>{
  //   const response = await client.get('https://www.baidu.com/',{
  //     responseType:ResponseType.Text
  //   });
  //   console.log(response.data)
  // });

  const login = await Bili.hasLogin();
  if (!login || login.code !== 0) {
    needLogin.value = true;
    console.log("需要登录，强制跳转");
    router.replace("/home/login");
    return;
  }

  needLogin.value = false;
  router.replace("/home/user");

  text.value = JSON.stringify(config.config.cache);
});
</script>

<template>
  <div class="content">
    <div class="content-app">
      <!-- <div class="search-bar">
        <i-fluent-search-28-filled />
        <input type="text" placeholder="搜索" />
      </div> -->
      <RouterView />
    </div>
    <div class="bottom-panel">
      <!-- 写一个列表 -->
      <div class="list">
        <RouterLink class="l1" to="/home/find-music">
          <img
            src="https://infinityicon.infinitynewtab.com/user-share-icon/9622b98e90dd4f107d23481566095b34.png?imageMogr2/thumbnail/240x/blur/1x0/quality/100|imageslim"
            alt=""
          />
          <span>设置</span>
        </RouterLink>
        <RouterLink class="l1" to="/home/find-music">
          <img
            src="https://infinityicon.infinitynewtab.com/user-share-icon/9622b98e90dd4f107d23481566095b34.png?imageMogr2/thumbnail/240x/blur/1x0/quality/100|imageslim"
            alt=""
          />
          <span>设置</span>
        </RouterLink>
        <RouterLink class="l1" to="/home/find-music">
          <img
            src="https://infinityicon.infinitynewtab.com/user-share-icon/9622b98e90dd4f107d23481566095b34.png?imageMogr2/thumbnail/240x/blur/1x0/quality/100|imageslim"
            alt=""
          />
          <span>设置</span>
        </RouterLink>
        <RouterLink class="l1" to="/home/find-music">
          <img
            src="https://infinityicon.infinitynewtab.com/user-share-icon/9622b98e90dd4f107d23481566095b34.png?imageMogr2/thumbnail/240x/blur/1x0/quality/100|imageslim"
            alt=""
          />
          <span>设置</span>
        </RouterLink>
        <RouterLink class="l1" to="/home/find-music">
          <img
            src="https://infinityicon.infinitynewtab.com/user-share-icon/9622b98e90dd4f107d23481566095b34.png?imageMogr2/thumbnail/240x/blur/1x0/quality/100|imageslim"
            alt=""
          />
          <span>设置</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search-bar {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  align-items: center;
  height: 35px;
  font-size: 13px;
  border: 0.8px solid rgba($color: white, $alpha: 0.2);
  background-color: rgba($color: white, $alpha: 0.1);

  svg {
    margin: 0 10px;
  }

  input {
    flex: 1;
    border: none;
    box-shadow: none;
    outline: none;
    padding: 0;
    border-radius: 0;
    background-color: transparent;
  }
}
.bottom-panel {
  width: 100%;
  height: 65px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  // 顶部加上阴影
  box-shadow: 0 -5px 10px rgba($color: black, $alpha: 0.1);
  position: absolute;
  bottom: 0;

  // 模糊
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  // 加上淡黑色
  background-color: rgba($color: black, $alpha: 0.25);

  .list {
    // background-color: red;
    display: flex;
    // 让所有元素水平分割
    width: 100%;

    .l1 {
      color: #fff;
      height: 100%;
      width: 100%;
      font-size: 15px;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: white, $alpha: 0.1);
      }

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 25px;
        height: 25px;
        border-radius: 8px;
      }
      span {
        line-height: auto;
      }
    }
  }
}

.content-app {
  flex: 1;
}
</style>
