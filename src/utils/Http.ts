import axios, { AxiosInstance } from "axios";
import { cs } from "element-plus/es/locale";

export class Http {
  private axiosClient: AxiosInstance | undefined = undefined;

  private _proxy: undefined | string = "";

  constructor(baseUrl = "") {
    this.axiosClient = axios.create({
      baseURL: baseUrl,
      // adapter: axiosAdapter(),
    });
  }

  private _cookie = "";

  /**
   * 使用Axios访问网络
   * @param url 网址
   * @param method 请求方式
   * @param data 请求数据 对象或者字符串
   * @param header 协议头
   * @param proxy 代理配置: {
          host: "127.0.0.1",
          port: 6152,
          protocol: "http",
        }
   * @returns 返回Promise
   */
  async req<T>(
    url = "",
    method = "get",
    data = {},
    header = {},
    proxy = undefined
  ) {
    if (this.axiosClient == undefined) {
      return Promise.reject("axiosClient is undefined");
    }
    return this.axiosClient
      .request<T>({
        url: url,
        method: method,
        data: data,
        headers: header,
        proxy: proxy,
      })
      .then((res) => {
        return res.data;
      });
  }

  getCookie() {
    return this._cookie;
  }

  setCookie(ck: string) {
    this._cookie = ck;
  }
}

export const Utils = {
  SubString(text = "", left = "", right = "") {
    let linx = text.indexOf(left);
    let lstart = linx + left.length;
    let rinx = text.indexOf(right, lstart);
    return text.substring(lstart, rinx);
  },
};

// console.log("测试取文本中间", Utils.SubString("adb123,", "adb", ","));
