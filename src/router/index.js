import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import PersonalView from "@/views/PersonalView.vue";
import CollectionView from "@/views/merch/CollectionView.vue";
import NewMerchView from "@/views/merch/NewMerchView.vue";
import DetailedView from "@/views/merch/DetailedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
    {
      path: "/merch/collection",
      name: "collection",
      component: CollectionView,
    },
    {
      path: "/merch/new",
      name: "merchnew",
      component: NewMerchView,
    },
    {
      path: "/merch/:id",
      name: "merchdetail",
      component: DetailedView,
    },
  ],
});

export default router;
