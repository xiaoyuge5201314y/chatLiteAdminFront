const Layout = () => import("@/layout/index.vue");
// 系统管理
export default {
  path: "/",
  name: "Admin",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "homeFilled",
    title: "系统管理",
    rank: 0
  },
  children: [
    {
      path: "/user",
      name: "AdminUser",
      component: () => import("@/views/admin/user/index.vue"),
      meta: {
        title: "用户管理"
      }
    },
    {
      path: "/aiModel",
      name: "aiModel",
      component: () => import("@/views/admin/aiModel/index.vue"),
      meta: {
        title: "模型管理"
      }
    },
    {
      path: "/aiModelConfig",
      name: "aiModelConfig",
      component: () => import("@/views/admin/aiModelConfig/index.vue"),
      meta: {
        title: "模型配置管理"
      }
    }
  ]
} as RouteConfigsTable;
