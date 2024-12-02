import LoginPage from "@/auth/LoginPage.vue";
import RegisterPage from "@/auth/RegisterPage.vue";
import ChartPage from "@/components/ChartPage.vue";
import DashboardPage from "@/components/DashboardPage.vue";
import LayoutPage from "@/components/LayoutPage.vue";
import NewsData from "@/components/NewsData.vue";
import SpaceStationData from "@/components/SpaceStationData.vue";
import UserList from "@/components/UserList.vue";
import WeatherData from "@/components/WeatherData.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/",
    component: LayoutPage,
    children: [
      {
        path: "dashboard",
        name: "DashboardPage",
        component: DashboardPage,
      },
      {
        path: "news",
        name: "NewsData",
        component: NewsData,
      },
      {
        path: "weather",
        name: "WeatherData",
        component: WeatherData,
      },
      {
        path: "users",
        name: "UserList",
        component: UserList,
      },
      {
        path: "space",
        name: "SpaceStationData",
        component: SpaceStationData,
      },
      {
        path: "chart",
        name: "ChartPage",
        component: ChartPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
