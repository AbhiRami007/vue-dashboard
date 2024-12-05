import { createApp } from "vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.vue";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(VueChartkick);
app.mount("#app");
