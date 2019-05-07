export default {
    install(Vue) {

        !function () {
            Vue.directive('scroll-bottom', {
                inserted(el, binding, vnode) {
                    document.addEventListener('scroll', () => {
                        if (vnode.context.$route.path !== `/${binding.arg}`) {
                            return;
                        }
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
        }();

        !function () {
            const CONTEXT = '@@_CLICK_OUTSIDE_CONTEXT';
            const nodes = [];

            let seeds = 0;

            const endListener = e => nodes.forEach(node => node[CONTEXT].handler(e));
            document.addEventListener('mouseup', endListener);
            document.addEventListener('touchend', endListener);

            function createHandler(el, binding, vnode) {
                return function (endEvent) {
                    const t = endEvent.target;
                    if (t[CONTEXT] && t[CONTEXT].group === binding.arg) {
                        return;
                    }
                    if (!el.contains(t)) {
                        vnode.context[binding.expression]();
                    }
                }
            }

            Vue.directive('click-outside', {
                bind(el, binding, vnode) {
                    nodes.push(el);
                    const id = seeds++;

                    el[CONTEXT] = {
                        id,
                        handler: createHandler(el, binding, vnode),
                        group: binding.arg
                    }
                },
                unbind(el) {
                    const id = el[CONTEXT].id;
                    nodes.splice(nodes.findIndex(node => node[CONTEXT].id === id), 1);
                    delete el[CONTEXT];
                },
                update(el, binding, vnode) {
                    el[CONTEXT].handler = createHandler(el, binding, vnode);
                    el[CONTEXT].group = binding.arg;
                }
            });
        }();
    }
}
