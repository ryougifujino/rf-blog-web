<template>
    <div class="shares">
        <div class="shares__add-new" @click="isShowPublisher = true">新增分享</div>
        <SharesList></SharesList>
        <SharesPublisher :visible.sync="isShowPublisher"></SharesPublisher>
    </div>
</template>

<script>
    import SharesList from "@/components/SharesList.vue";
    import SharesPublisher from "@/components/SharesPublisher.vue";

    export default {
        components: {
            SharesList,
            SharesPublisher
        },
        data: () => ({
            isShowPublisher: false
        })
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .shares {
        padding: 0 16px 16px;

        &__add-new {
            padding: 8px 16px;
            border-radius: 16px;
            border: 1px solid $color-accent-dark;
            background: $color-accent-dark;
            margin-top: 16px;
            text-align: center;

            @include sm("&:active", "&:hover") {
                cursor: pointer;
                user-select: none;
                border: 1px solid $text-color-secondary;
            }
        }
    }
</style>
