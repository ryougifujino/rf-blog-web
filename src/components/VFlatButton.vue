<template>
    <div class="v-flat-button">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .v-flat-button {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 6px;
        background-color: $text-color-secondary-light2;
        color: $text-color-secondary;
        font-weight: bold;
        user-select: none;
    }

    .v-flat-button:hover {
        cursor: pointer;
        background-color: $text-color-secondary-light;
        color: $text-color-primary-light;
    }

</style>
