<template>
    <div :class="['region-mask', {'region-mask--transparent': isTransparent}]">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="v-progress-bar"
             viewBox="0 0 100 100"
             :width="baseSize * scale"
             :height="baseSize * scale"
             preserveAspectRatio="xMidYMid">
            <circle cx="50"
                    cy="50"
                    fill="none"
                    :stroke="strokeColor"
                    stroke-width="10"
                    r="35"
                    stroke-dasharray="164.93361431346415 56.97787143782138"
                    transform="rotate(227.962 50 50)">
                <animateTransform attributeName="transform"
                                  type="rotate"
                                  calcMode="linear"
                                  values="0 50 50;360 50 50"
                                  keyTimes="0;1"
                                  dur="1s"
                                  begin="0s"
                                  repeatCount="indefinite">
                </animateTransform>
            </circle>
        </svg>
    </div>
</template>

<script>
    export default {
        props: {
            scale: {
                type: Number,
                default: 1
            }
        },
        data: () => ({
            isTransparent: false,
            isColored: false,
            baseSize: 50
        }),
        computed: {
            strokeColor() {
                return this.isColored ? "#2196f3" : "#ffffff";
            }
        },
        mounted() {
            this.isTransparent = 'transparent' in this.$attrs;
            this.isColored = 'colored' in this.$attrs;
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/mixins";

    .v-progress-bar {
        @extend %center;
        background: #ff000000;
    }
</style>
