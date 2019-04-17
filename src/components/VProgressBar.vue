<template>
    <div :class="['region-mask', {'region-mask--transparent': isTransparent}]">
        <img src="../assets/images/progress-bar.svg" class="v-progress-bar">
    </div>
</template>

<script>
    export default {
        data: () => ({
            isTransparent: false
        }),
        mounted() {
            this.isTransparent = typeof this.$attrs['transparent'] === 'string';
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/mixins";

    .v-progress-bar {
        @extend %center;
        background: #ff000000;
        width: 50px;
        height: 50px;
    }
</style>
