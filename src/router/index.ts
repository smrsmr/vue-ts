import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/home.vue"),
    children: [
      {
        path: "/About",
        name: "About",
        component: () => import("../views/About.vue")
      },
      {
        path: "/home2",
        name: "home2",
        component: () => import("../views/Home.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
