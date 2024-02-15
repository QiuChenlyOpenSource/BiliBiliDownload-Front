import { defineStore } from "pinia";

export const ConfigStore = defineStore("configStore", {
  state: () => ({
    config: {
      cache: "",
      user: {
        url: "",
        refresh_token: "",
        timestamp: 0,
        code: 0,
        message: "",
        SESSDATA: "",
        bili_jct: "",
        DedeUserID: "",
        DedeUserID__ckMd5: "",
        sid: "",
      },
    },
  }),
  persist: {
    enabled: true,
  },
});
