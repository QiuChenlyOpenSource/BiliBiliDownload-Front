import { FullUserInfo } from "@/type/FullUserInfo";
import {
  UserFavoriteCollect,
  UserFavoriteList,
  UserFavoriteMedia,
  UserInfo,
} from "../type/TypeCom";
import { Http } from "./Http";

export class BilibiliApi {
  http = new Http("/api");
  constructor() {}
  // 获取扫码
  async getQrCode() {
    return await this.http.req<{
      code: string;
      qrcode_key: string;
      msg: string;
      url: string;
    }>("/api/v1/bili/login/qrcode");
  }
  // 检查扫码状态
  async checkQrCode(key: string) {
    // {
    //     "code": 200,
    //     "msg": "获取成功",
    //     "data": {
    //         "url": status.url,
    //         "refresh_token": status.refresh_token,
    //         "timestamp": status.timestamp,
    //         "code": status.code,
    //         "message": status.message,
    //     },
    // }
    return await this.http.req<{
      code: number;
      msg: string;
      data: {
        url: string;
        refresh_token: string;
        timestamp: number;
        code: number;
        message: string;
        SESSDATA: string;
        bili_jct: string;
        DedeUserID: string;
        DedeUserID__ckMd5: string;
        sid: string;
      };
    }>(`/api/v1/bili/login/qrcode/status?qrcode_key=${key}`);
  }

  async hasLogin() {
    return await this.http.req<{
      code: number;
      msg: string;
      value: string | null;
    }>("/api/v1/cfg/config/isLogin");
  }

  async setLogin() {
    return this.http.req<{
      code: number;
      msg: string;
    }>("/api/v1/cfg/config/", "POST", {
      key: "isLogin",
      value: "true",
    });
  }

  async getBiliUserList() {
    return await this.http.req<{
      code: number;
      msg: string;
      data: {
        SESSDATA: string;
        bili_jct: string;
        DedeUserID: string;
        DedeUserID__ckMd5: string;
        sid: string;
      }[];
    }>("/api/v1/bili/login/user");
  }

  // 设置当前用户 userid
  async setBiliUser(id: string) {
    return await this.http.req<{
      code: number;
      msg: string;
    }>("/api/v1/bili/login/user/" + id);
  }

  // /login/user/info 获取用户信息
  async getBiliUserInfo() {
    return await this.http.req<{
      code: number;
      msg: string;
      data: UserInfo;
    }>("/api/v1/bili/login/user/info/");
  }

  // /login/user/favorite/{uid} 根据uid获取收藏夹
  async getBiliUserFavorite(uid: number) {
    return await this.http.req<{
      code: number;
      msg: string;
      data: UserFavoriteList;
    }>(`/api/v1/bili/login/user/favorite/${uid}`);
  }

  // /login/user/favorite/video/{media_id}/{pn}/{ps} 根据media_id获取收藏夹 pn 页数 ps 每页数量
  async getBiliUserFavoriteVideo(
    media_id: number,
    pn: number = 1,
    ps: number = 20
  ) {
    return await this.http.req<{
      code: number;
      msg: string;
      data: UserFavoriteMedia;
    }>(`/api/v1/bili/login/user/favorite/video/${media_id}/${pn}/${ps}`);
  }

  // /login/user/favorite/collected/{uid} 获取用户收藏的视频合集
  async getBiliUserFavoriteCollected(uid: number) {
    return await this.http.req<{
      code: number;
      msg: string;
      data: UserFavoriteCollect;
    }>(`/api/v1/bili/login/user/favorite/collected/${uid}`);
  }

  // /login/user/spec/{uid} 根据uid获取用户信息
  async getBiliUserSpec(uid: string) {
    return await this.http.req<{
      code: number;
      msg: string;
      data: FullUserInfo;
    }>(`/api/v1/bili/login/user/spec/${uid}`);
  }

  // /login/user/cover?url=xxx&userId=xxx 加载用户对应可访问的图片
  async getBiliUserCover(url: string, userId?: string) {
    return await this.http.req<{
      code: number;
      msg: string;
      data: string;
    }>(`/api/v1/bili/login/user/cover/getUrl?url=${url}&userId=${userId}`);
  }
}

export const Bili = new BilibiliApi();
