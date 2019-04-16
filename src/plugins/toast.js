import Toast from '@/components/VToast.vue';
import Vue from 'vue';

// option "el" can only be used during instance creation with the `new` keyword,
// so we must use `Vue.extend`.
const ToastConstructor = Vue.extend(Toast);
const toast = new ToastConstructor({
    el: document.createElement('div')
});
document.body.appendChild(toast.$el);

let timer;

function showToast(text, duration = 1500) {
    if (timer) {
        clearTimeout(timer);
    }
    toast.setText(text);
    toast.setVisible(true);
    timer = setTimeout(() => {
        toast.setVisible(false);
    }, duration)
}

export default {
    install(Vue) {
        Vue.prototype.$showToast = showToast;
    }
}
