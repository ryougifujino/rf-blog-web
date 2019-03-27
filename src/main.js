import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VueScroll from 'vue-scroll';

Vue.use(VueScroll);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');