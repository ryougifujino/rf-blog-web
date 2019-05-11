<template>
    <div class="mask">
        <div class="auth-dialog">
            <textarea></textarea>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .auth-dialog {
        @extend %dialog;
        overflow: hidden;
        font-size: 0;

        textarea {
            @extend %scrollbar;
            box-sizing: border-box;
            font-size: 16px;
            padding: 8px 12px;
            width: 100%;
            height: 200px;
            resize: none;
            outline: none;
            border: none;
        }
    }
</style>