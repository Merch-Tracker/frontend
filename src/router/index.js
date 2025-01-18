import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/register/RegisterView.vue";
import PersonalView from "@/views/PersonalView.vue";
import CollectionView from "@/views/merch/CollectionView.vue";
import NewMerchView from "@/views/merch/NewMerchView.vue";
import DetailedView from "@/views/merch/DetailedView.vue";
import SuccessView from "@/views/register/SuccessView.vue";
import EditLabel from "@/components/labels/EditLabel.vue";
import store from "@/store/store.js";
import ChartsView from "@/views/ChartsView.vue";


const routes = [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/personal",
      name: "personal",
      component: PersonalView,
      meta: { requiresAuth: true },

    },
    {
      path: "/merch/collection",
      name: "collection",
      component: CollectionView,
      meta: { requiresAuth: true },
    },
    {
      path: "/merch/new",
      name: "merchnew",
      component: NewMerchView,
      meta: { requiresAuth: true },
    },
    {
      path: "/merch/:id",
      name: "merchdetail",
      component: DetailedView,
      meta: { requiresAuth: true },
    },
    {
      path: "/register_success",
      name: "register_success",
      component: SuccessView,
    },
    {
      path: "/editlabel/:id",
      name: "edit_label",
      component: EditLabel,
      meta: { requiresAuth: true },
    },
    {
        path:"/merch/charts",
        name: "charts",
        component: ChartsView,
        meta: { requiresAuth: true },
    },
  ];

const router = createRouter({history: createWebHistory(import.meta.env.BASE_URL), routes});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["authAndToken/isAuth"];
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next ({ name: "login" });
  } else {
    next();
  }
});

export default router;
