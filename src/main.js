import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VueScroll from 'vue-scroll';
import Toast from '@/plugins/toast';
import Directives from '@/plugins/directives';
import Filters from '@/plugins/filters';

Vue.use(VueScroll);
Vue.use(Toast);
Vue.use(Directives);
Vue.use(Filters);

const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /^\.\/V[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);

    // 获取组件的 PascalCase 命名
    const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
});

const requireIcon = require.context(
    './assets/icons',
    false,
    /\.svg$/
);
requireIcon.keys().forEach(requireIcon);
// <=> requireIcon.keys().forEach(fileName => requireIcon(fileName));

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
