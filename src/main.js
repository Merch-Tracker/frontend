import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import store from "./store";

axios.defaults.baseURL = "http://127.0.0.1:9010";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');