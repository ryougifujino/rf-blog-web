<template>
    <div class="v-the-dialog-header">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/dimens";

    .v-the-dialog-header {
        font-size: 16px;
        color: $text-color-primary;
        height: $header-height;
        line-height: $header-height;
        border-radius: $border-radius $border-radius 0 0;
        border-bottom: 1px solid $color-accent-dark;
        text-align: center;
    }
</style>
