<script setup lang="ts">
import { onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { Bili } from "@/utils/Bili";
import { FullUserInfo } from "@/type/FullUserInfo";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const router = useRouter();

// 外部传递的参数
const props = defineProps<{
  SESSDATA: string;
  bili_jct: string;
  DedeUserID: string;
  DedeUserID__ckMd5: string;
  sid: string;
}>();

const user = ref<FullUserInfo>();
const userCover = ref<string>();
onMounted(async () => {
  console.log(props);
  const u = await Bili.getBiliUserSpec(props.DedeUserID);
  user.value = u.data;

  let img = await Bili.getBiliUserCover(user.value.face, user.value.mid + "");
  userCover.value = img.data;
});
</script>

<template>
  <div class="content">
    <div class="user-avatar-area">
      <img class="user-cover" :src="userCover" alt="" />
      <div class="user-level">
        <div class="user-name">{{ user?.uname }}</div>
        <div class="levels">
          经验: {{ user?.level_info.current_exp }}/{{
            user?.level_info.next_exp
          }}
        </div>
      </div>
    </div>
    <div class="intro">
      <div>
        <div class="focus-size">
          {{ user?.level_info.current_level }}
        </div>
        <div>等级</div>
      </div>
      <div>
        <div class="focus-size">{{ user?.money }}</div>
        <div>硬币</div>
      </div>
      <div>
        <div class="focus-size">{{ user?.fans.following }}</div>
        <div>关注</div>
      </div>
      <div>
        <div class="focus-size">{{ user?.fans.follower }}</div>
        <div>粉丝</div>
      </div>
      <div>
        <div class="focus-size">{{ user?.fans.dynamic_count }}</div>
        <div>动态</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    // 白色2px边框
    border: 2px solid #fff;
    box-sizing: border-box;
  }

  // 横向排版intro
  .intro {
    width: 100%;
    // background-color: red;
    flex-direction: row;
    display: flex;
    // 水平均匀分布
    justify-content: space-between;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.6);
    }

    .focus-size {
      font-size: 20px;
      font-weight: bold;
      color: black;
    }
  }
  .user-avatar-area {
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
  }
  .user-level {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 10px;
    .user-name {
      font-size: 20px;
      font-weight: bold;
    }
    .levels {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
