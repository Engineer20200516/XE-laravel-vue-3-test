import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/companies" },
    {
      path: "/",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "companies",
          component: () => import("../pages/companies.vue"),
        },
        {
          path: "employees",
          component: () => import("../pages/employees.vue"),
        },
        {
          path: "logout",
          component: () => import("../pages/logout.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "login",
          component: () => import("../pages/login.vue"),
        },
        {
          path: "register",
          component: () => import("../pages/register.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          component: () => import("../pages/[...all].vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("accessToken");

  if (authRequired && !loggedIn) {
    next("/login");
  } else if (!authRequired && !!loggedIn) {
    next("/companies");
  } else {
    next();
  }
});

export default router;
