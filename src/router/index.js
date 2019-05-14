import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () => import('@/views/Home.vue');
const Archives = () => import('@/views/Archives.vue');
const Share = () => import('@/views/Shares.vue');
const About = () => import('@/views/About.vue');
const PostEdit = () => import('@/views/PostEdit.vue');
const Post = () => import('@/views/Post.vue');
const Search = () => import('@/views/Search.vue');

export default new Router({
    routes: [
        {path: '/home', component: Home},
        {path: '/archives', component: Archives},
        {path: '/share', component: Share},
        {path: '/about', component: About},
        {path: '/post-edit', component: PostEdit},
        {path: '/post-edit/:id', component: PostEdit},
        {path: '/post/:id', component: Post},
        {path: '/search', component: Search},
        {path: '/', redirect: '/home'}
    ]

});
