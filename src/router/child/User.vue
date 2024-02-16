<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";

import SpaceBar from "@/components/SpaceBar.vue";
import { ElMessage } from "element-plus";
import BiliUser from "@/components/BiliUser.vue";
import { Bili } from "@/utils/Bili";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const greetMsg = ref("");
const name = ref("");

const router = useRouter();

const userLst = ref<UserList[]>([]);

interface UserList {
  SESSDATA: string;
  bili_jct: string;
  DedeUserID: string;
  DedeUserID__ckMd5: string;
  sid: string;
}

onMounted(async () => {
  let lst = await Bili.getBiliUserList();
  userLst.value = lst.data;
});

const activeUser = async (DedeUserID = "") => {
  let res = await Bili.setBiliUser(DedeUserID);
  if (res.code === 0) {
    ElMessage.success(res.msg);

    let user = await Bili.getBiliUserInfo();

    let favo = await Bili.getBiliUserFavorite(user.data.mid);

    let userFavo = favo.data.list[0];

    let page = userFavo.media_count / 20;
    if (userFavo.media_count / 20 > 0) page++;
    for (let index = 0; index < page; index++) {
      let favoLst = await Bili.getBiliUserFavoriteVideo(userFavo.id, index + 1);
    }

    let favoCollect = await Bili.getBiliUserFavoriteCollected(user.data.mid);
  }
};
</script>

<template>
  <div class="content">
    <SpaceBar />
    <div class="user-area">
      <div class="user-item" v-for="item in userLst" :key="item.DedeUserID">
        <BiliUser
          :SESSDATA="item.SESSDATA"
          :bili_jct="item.bili_jct"
          :DedeUserID="item.DedeUserID"
          :DedeUserID__ckMd5="item.DedeUserID__ckMd5"
          :sid="item.sid"
        />
        <div class="active" @click="activeUser(item.DedeUserID)">使用</div>
      </div>
    </div>
    <SpaceBar height="var(--bottom-function-bar-height)" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  overflow: scroll;
  // background-color: red;
  flex: 1;

  .user-area {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .user-item {
      margin: 10px 10px 0 10px;
      border-radius: 5px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      overflow: hidden;

      &:last-of-type {
        margin-bottom: 10px;
      }

      .active {
        margin-top: 10px;
        padding: 5px;
        background-color: #409eff;
        color: #fff;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
      }
    }
  }
}
</style>
