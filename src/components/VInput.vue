<template>
    <input :class="['v-input', {'v-input--max-width': isMaxWidth}]"
           spellcheck="false"
           :value="value"
           @input="$emit('input', $event.target.value)">
</template>

<script>
    export default {
        props: ['value'],
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
        box-sizing: border-box;

        &--max-width {
            width: 100%;
        }
    }
</style>
