import { createApp } from 'vue'
import App from './App.vue'
import VueVega from 'vue-vega';

const app = createApp(App);

app.use(VueVega);
app.mount('#app');