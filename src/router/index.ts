import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/router/child/AppMain.vue"),
    children: [
      {
        path: "find-music",
        component: () => import("@/router/child/FindMusic.vue"),
      },
      {
        path: "login",
        component: () => import("@/router/child/Login.vue"),
      },
      {
        path: "user",
        component: () => import("@/router/child/User.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/router/child/About.vue"),
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
