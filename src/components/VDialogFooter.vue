<template>
    <div class="v-dialog-footer">
        <div class="v-dialog-footer__buttons-container">
            <VButtonFlat @click.native="$emit('cancel')">取消</VButtonFlat>
            <VButtonFlat @click.native="$emit('confirm')">确认</VButtonFlat>
        </div>
    </div>
</template>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/dimens";
    @import "~@/assets/styles/mixins";

    .v-dialog-footer {
        height: $dialog-header-height;
        border-radius: 0 0 $border-radius $border-radius;

        &__buttons-container {
            display: inline-block;
            position: absolute;
            right: 16px;

            > div {
                background-color: $color-accent;
                font-weight: normal;
                font-size: 14px;
            }

            @include sm("> div:active", "> div:hover") {
                background-color: $color-accent-dark;
                color: $text-color-secondary;
            }
        }
    }
</style>
