<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { Bili } from "../../utils/Bili";
import QrcodeVue, { Level, RenderAs } from "qrcode.vue";
import { storeToRefs } from "pinia";
import { ConfigStore } from "../../store/Config";
import { ElMessage } from "element-plus";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const config = ConfigStore();

const configRefs = storeToRefs(config);

const router = useRouter();
const qrcode_key = ref("");
const qrcode_url = ref("");
const message = ref("");

var tag: NodeJS.Timeout;

onMounted(async () => getCodeUrl());

const getCodeUrl = async () => {
  const qr = await Bili.getQrCode();
  qrcode_key.value = qr.qrcode_key;
  qrcode_url.value = qr.url;
  checkCode();
};

const checkCode = async () => {
  clearTimeout(tag);
  let res = await Bili.checkQrCode(qrcode_key.value);
  console.log(res);
  if (res.code > 0) {
    // ElementUI弹框出错
    ElMessage.error(res.msg);
    return;
  }

  message.value = res.data.message;
  if (res.data.code === 86038) {
    // 二维码过期
    return getCodeUrl();
  } else if (res.data.code === 0) {
    // 登录成功
    configRefs.config.value.user = {
      ...res.data,
    };
    await Bili.setLogin();
    return router.push("/home");
  }
  tag = setTimeout(async () => {
    await checkCode();
  }, 1000);
};
</script>

<template>
  <div class="content">
    <span>使用手机版扫码登录,或者截图app扫码。</span>
    <div class="qrcode">
      <QrcodeVue class="bords" :size="200" :value="qrcode_url" />
    </div>
    <div class="status">{{ message }}</div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  flex: 1;
  height: 100%;
  padding-top: var(--statusBarHeight);

  .qrcode {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;

    .bords {
      border-radius: 5px;
      padding: 10px;
      border: 2px solid #000;
    }
  }
}
</style>
