import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '@/views/Home.vue';
import Archives from '@/views/Archives.vue';
import Share from '@/views/Shares.vue';
import About from '@/views/About.vue';
import PostEdit from '@/views/PostEdit.vue';
import Post from '@/views/Post.vue';

export default new Router({
    routes: [
        {path: '/home', component: Home},
        {path: '/archives', component: Archives},
        {path: '/share', component: Share},
        {path: '/about', component: About},
        {path: '/post-edit', component: PostEdit},
        {path: '/post-edit/:id', component: PostEdit},
        {path: '/post/:id', component: Post},
        {path: '/', redirect: '/home'}
    ]

});
