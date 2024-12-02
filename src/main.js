import { createApp } from "vue";
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from "./App.vue";
import router from "./router";


// Create Vue app and use router
createApp(App).use(router).mount("#app");
