<template>
    <div class="mask" v-if="visible">
        <div class="v-simple-dialog">
            <VDialogHeader>
                <slot name="header"></slot>
            </VDialogHeader>
            <div class="v-simple-dialog__body">
                <slot name="body"></slot>
            </div>
            <VDialogFooter @cancel="$emit('update:visible', false)"
                           @confirm="$emit('confirm')">
            </VDialogFooter>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/mixins";

    .v-simple-dialog {
        @extend %center;
        border-radius: $border-radius;
        width: 300px;

        &__body {
            min-height: 50px;
            padding: 16px;
        }
    }
</style>
