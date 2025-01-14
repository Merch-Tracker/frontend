import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import store from "./store/store.js";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
