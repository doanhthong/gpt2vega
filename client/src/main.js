import { createApp } from 'vue'
import App from './App.vue'
import VueVega from 'vue-vega';
import './assets/scss/main.scss';
import './assets/tailwind.css'

const app = createApp(App);

app.use(VueVega);
app.mount('#app');