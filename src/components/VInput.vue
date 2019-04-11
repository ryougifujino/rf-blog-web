<template>
    <input :class="['v-input', {'v-input--max-width': isMaxWidth}]" spellcheck="false">
</template>

<script>
    export default {
        data: () => ({
            isMaxWidth: false
        }),
        mounted() {
            this.isMaxWidth = typeof this.$attrs['max-width'] === 'string';
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .v-input {
        outline: none;
        border: 1px solid $text-color-secondary;
        border-radius: 9999px;
        padding: 8px 12px;

        &--max-width {
            width: 100%;
        }
    }
</style>