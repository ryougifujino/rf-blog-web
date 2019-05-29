import Vue from 'vue';
import Router from 'vue-router';
import {JS, attachLibs} from "@/common/cdn";

Vue.use(Router);

const Home = () => import('@/views/Home.vue');
const Archives = () => import('@/views/Archives.vue');
const Share = () => import('@/views/Shares.vue');
const About = () => import('@/views/About.vue');
const PostEdit = () => import('@/views/PostEdit.vue');
const Post = () => import('@/views/Post.vue');
const Search = () => import('@/views/Search.vue');

const routes = [
    {path: '/home', component: Home},
    {path: '/archives', component: Archives},
    {path: '/share', component: Share},
    {path: '/about', component: About},
    {path: '/post-edit', component: PostEdit},
    {path: '/post-edit/:id', component: PostEdit},
    {path: '/post/:id', component: Post},
    {path: '/search', component: Search},
    {path: '/', redirect: '/home'}
];

if (process.env.NODE_ENV === 'production') {
    routes.forEach(route => {
        const libs = JS[route.path];
        if (!libs) {
            return;
        }
        route.beforeEnter = async (to, from, next) => {
            await attachLibs(libs);
            next();
        };
    });
}

export default new Router({
    mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
    routes
});
