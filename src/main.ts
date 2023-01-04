import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import VueApexCharts from "vue3-apexcharts";
import "./index.css";
import "vue-toastification/dist/index.css";

const app = createApp(App);

const options = {
  position: "top-center",
  toastClassName: "toastification--error",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  maxToasts: 1,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

app.use(Toast, options);
app.use(VueApexCharts);

app.mount("#app");
