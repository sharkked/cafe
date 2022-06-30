import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./vue/App.vue";
import router from "./ts/router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
