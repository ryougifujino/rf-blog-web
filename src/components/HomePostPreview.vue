<template>
    <section class="home-post-preview">
        <h2 class="home-post-preview__title">{{post.title}}</h2>
        <div class="home-post-preview__body">
            {{bodyPreview}}
        </div>
    </section>
</template>

<script>
    const BODY_MAX_LENGTH = 200;

    export default {
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        computed: {
            bodyPreview() {
                return this.post.body.substring(0, BODY_MAX_LENGTH);
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .home-post-preview {
        padding: 16px;

        &__title {
            margin-bottom: 16px;
            color: $text-color-primary;
        }

        &__body {
            color: $text-color-primary-light;
            font-size: 18px;
        }
    }

</style>
