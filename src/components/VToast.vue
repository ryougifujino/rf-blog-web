<template>
    <TransitionFade>
        <div class="v-toast" v-show="visible">{{text}}</div>
    </TransitionFade>
</template>

<script>
    import TransitionFade from "@/components/TransitionFade.vue";

    export default {
        components: {
            TransitionFade
        },
        data: () => ({
            text: '',
            visible: false
        }),
        methods: {
            setText(text) {
                this.text = text;
            },
            setVisible(visible) {
                this.visible = !!visible;
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .v-toast {
        position: fixed;
        left: 50%;
        top: 29.2%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.35);
        border-radius: 8px;
        padding: 12px 16px;
        color: white;
        z-index: 9999;
    }

</style>
