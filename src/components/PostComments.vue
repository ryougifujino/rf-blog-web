<template>
    <div class="post-comments">
        <PostReviewEditor keyword="评论"
                          content-max-length="5000"
                          from-user-max-length="20">
        </PostReviewEditor>
    </div>
</template>

<script>
    import PostReviewEditor from '@/components/PostReviewEditor.vue';

    export default {
        components: {
            PostReviewEditor
        }
    }
</script>

<style lang="scss">

    .post-comments {
        max-width: 850px;
        margin: 0 auto;
        padding: 0 16px 16px;
    }
</style>
