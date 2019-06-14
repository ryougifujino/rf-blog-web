<template>
    <section class="home-post-preview" @click="showPost(post.id)">
        <h2 class="home-post-preview__title">{{post.title}}</h2>
        <div class="home-post-preview__body" v-if="bodyPreview">
            <MarkdownPreviewer :markdown-input="bodyPreview"></MarkdownPreviewer>
        </div>
    </section>
</template>

<script>

    import MarkdownPreviewer from "@/components/MarkdownPreviewer.vue";

    const BODY_MAX_LENGTH = 200;

    export default {
        components: {
            MarkdownPreviewer
        },
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        computed: {
            bodyPreview() {
                return this.post.body.substring(0, BODY_MAX_LENGTH).trim();
            }
        },
        methods: {
            showPost(postId) {
                this.$router.push({path: `/post/${postId}`});
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .home-post-preview {
        padding: 16px;

        @include sm("&:active, &:active *", "&:hover, &:hover *") {
            cursor: pointer;
            background: $color-background-dark;
        }

        @include sm("&:active", "&:hover") {
            border-radius: 16px;
        }

        &__title {
            margin-bottom: 16px;
            color: $text-color-primary;
        }

        &__body {
            border: 1px solid $text-color-secondary-light;
            border-radius: 16px;
            padding: 16px;
        }
    }

</style>
