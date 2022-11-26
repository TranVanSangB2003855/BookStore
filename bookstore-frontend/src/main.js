import { createApp } from 'vue';
import App from './App.vue';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
// import "bootstrap/dist/js/bootstrap.bundle"
// import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "jquery/dist/jquery.min.js";
import router from "./router/index";
import { createPinia, setActivePinia } from 'pinia';
// import bootstrap from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";
import './assets/main.css';



createApp(App).use(router).use(createPinia()).mount('#app');