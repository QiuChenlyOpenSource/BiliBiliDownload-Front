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
    <div
      class="space"
      :style="{
        'padding-top': 'var(--statusBarHeight)',
      }"
    ></div>

    <h1>FindMusic页面</h1>
    <button style="margin-top: 10px" @click="$router.replace('/')">主页</button>

    <div class="banner">
      <div class="app-recommend">
        <div class="app-head">
          <img
            class="app-icon"
            src="https://cdn.setapp.com/master/4258f1ef9e1474b59c1837918f143707a900cf93/static/main/images/pages/home/apps/icon-cmm.png"
          />
          <div class="desc-line">
            <span class="app-desc">让你的Mac干净如新。</span>
            <span class="app-claim"
              >移除垃圾, 扫描恶意软件, 清理无用的电子邮件附件。</span
            >
          </div>
        </div>
        <div class="app-download">
          <span>获取</span>
          <div
            class="bg"
            :style="{
              background:
                'top/cover no-repeat url(https://cdn.setapp.com/master/4258f1ef9e1474b59c1837918f143707a900cf93/static/main/images/pages/home/apps/cmm-big@2x.png)',
            }"
          ></div>
        </div>
      </div>
    </div>
    <div style="height: 1000px">
      123123123123123123123123123123123

      <img
        class="app-icon"
        src="https://cdn.setapp.com/master/4258f1ef9e1474b59c1837918f143707a900cf93/static/main/images/pages/home/apps/icon-cmm.png"
      />
      <img
        class="app-icon"
        src="https://cdn.setapp.com/master/4258f1ef9e1474b59c1837918f143707a900cf93/static/main/images/pages/home/apps/icon-cmm.png"
      />
    </div>

    <div class="play-bar-space"></div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  flex: 1;

  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background-color: red;

  .banner {
    .app-recommend {
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      background-color: #df96ae;
      border-radius: 20px;
      overflow: hidden;

      .app-head {
        z-index: 2;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        margin-top: 10px;

        .desc-line {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: start;

          background-color: rgba($color: white, $alpha: 0.1);
          border-radius: 10px;
          padding: 0 10px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .app-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }

        span {
          color: #000;
        }

        .app-desc {
          font-size: 25px;
          font-weight: bold;
          margin-top: 10px;
        }
        .app-claim {
          font-size: 14px;
          margin-top: 10px;
        }
      }
      .app-download {
        display: flex;
        flex: 1;
        width: 100%;

        span {
          cursor: pointer;
          height: 26px;
          margin-left: 10px;
          width: 80px;
          border-radius: 100px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bolder;
          background-color: #307bf6;

          &:hover {
            background-color: #6bd35f;
            color: white;
          }
        }

        .bg {
          flex: 1;
          margin-top: -10%;
          z-index: 1;
        }

        flex: 1;
      }
    }
  }

  .play-bar-space {
    height: 50px;
    padding: 10px 0;
    width: 100%;
    display: block;
  }
}
</style>
