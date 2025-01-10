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
    {
      path: "/register_success",
      name: "register_success",
      component: SuccessView,
    },
    {
      path: "/editlabel/:id",
      name: "edit_label",
      component: EditLabel,
    },
  ],
});

export default router;
