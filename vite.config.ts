import { HmrOptions, UserConfig, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { internalIpV4 } from "internal-ip";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import path from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

// https://vitejs.dev/config/
export default defineConfig(
  async () =>
    ({
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [
            IconsResolver({
              // prefix: "icon", // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
              // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
              // alias: { park: 'icon-park' } 集合的别名
              // enabledCollections: ["ep"], // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
            }),
            ElementPlusResolver(),
          ],
        }),
        Icons({
          // scale: 1, // 缩放
          compiler: "vue3", // 编译方式
          // defaultClass: '', // 默认类名
          // defaultStyle: '', // 默认样式
          autoInstall: true,
          // jsx: 'react' // jsx支持
        }),
      ],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
      },
      // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
      //
      // 1. prevent vite from obscuring rust errors
      clearScreen: false,
      // 2. tauri expects a fixed port, fail if that port is not available
      server: {
        port: 1420,
        strictPort: true,
        host: "0.0.0.0",
        hmr: {
          protocol: "ws",
          host: "localhost",
          port: 1421,
        },
        watch: {},
        proxy: {
          "/api": {
            target: "http://127.0.0.1:8000", //目标url
            changeOrigin: true, //支持跨域
            rewrite: (path) => path.replace(/^\/api/, ""),
            //重写路径,替换/api
          },
        },
      },
    } as UserConfig)
);
