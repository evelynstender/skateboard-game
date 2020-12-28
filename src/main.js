import Vue from 'vue';
import App from './App.vue';
// import 'vue2-animate/dist/vue2-animate.min.css'

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
