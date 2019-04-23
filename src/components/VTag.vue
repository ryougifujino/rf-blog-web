<template>
    <div class="v-tag">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .v-tag {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 16px;
        border: 1px solid $text-color-secondary;
        color: $text-color-secondary;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 200px;
        overflow: hidden;
        user-select: none; //TODO: add prefix: -ms,-moz...

        @include sm("&:active", "&:hover") {
            cursor: pointer;
            border: 1px solid $text-color-primary-light;
            color: $text-color-primary-light;
        }
    }
</style>
