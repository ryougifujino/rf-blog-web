export default {
    install(Vue) {
        Vue.directive('scroll-bottom', {
            inserted(el, binding) {
                document.addEventListener('scroll', () => {
                    const [root, body] = [document.documentElement, document.body];
                    const scrollTop = root.scrollTop || body.scrollTop;
                    const visibleHeight = root.clientHeight || body.clientHeight;
                    const scrollHeight = root.scrollHeight || body.scrollHeight;
                    if (scrollTop + visibleHeight === scrollHeight) {
                        binding.value();
                    }
                });
            }
        });
    }
}
