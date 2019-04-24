<template>
    <div class="v-dialog-header">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/dimens";

    .v-dialog-header {
        font-size: 16px;
        color: $text-color-primary;
        height: $dialog-header-height;
        line-height: $dialog-header-height;
        border-radius: $border-radius $border-radius 0 0;
        border-bottom: 1px solid $color-accent-dark;
        text-align: center;
    }
</style>
