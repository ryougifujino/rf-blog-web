import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '@/views/Home.vue';
import Archives from '@/views/Archives.vue';
import Share from '@/views/Shares.vue';
import About from '@/views/About.vue';

export default new Router({
    routes: [
        {path: '/home', component: Home},
        {path: '/archives', component: Archives},
        {path: '/share', component: Share},
        {path: '/about', component: About},
        {path: '/', redirect: '/home'}
    ]

});
