<template>
    <div class="post-edit">
        <div class="post-edit__toolbar">
            <input class="post-edit__title">
        </div>
        <div class="post-edit__markdown-input">

        </div>
        <div class="post-edit__markdown-preview">

        </div>
    </div>
</template>

<script>

    export default {}
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .post-edit {
        * {
            box-sizing: border-box;
        }

        height: 100vh;
        $toolbar-height: 64px;

        &__toolbar {
            padding: 16px;
            height: $toolbar-height;
            border-bottom: 1px solid $color-accent-dark;
        }

        &__title {
            border: none;
            outline: none;
            font-weight: bold;
            font-size: 24px;
            line-height: 32px;
        }

        %markdown {
            height: calc(100% - #{$toolbar-height});
            width: 50%;
            float: left;
        }

        &__markdown-input {
            @extend %markdown;
            border-right: 1px solid $color-accent-dark;
        }

        &__markdown-preview {
            @extend %markdown;
        }
    }
</style>