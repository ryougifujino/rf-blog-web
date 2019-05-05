<template>
    <div class="post-comments">
        <PostReviewEditor class="post-comments__comment-editor"
                          keyword="评论"
                          content-max-length="5000"
                          from-user-max-length="20"
                          :content.sync="newComment"
                          :from-user.sync="newCommentFrom"
                          :is-publishing="newCommentIsPublishing"
                          @publish="publishComment">
        </PostReviewEditor>
        <PostComment v-for="comment of comments"
                     :key="comment.id"
                     :comment="comment">
        </PostComment>
    </div>
</template>

<script>
    import PostReviewEditor from '@/components/PostReviewEditor.vue';
    import PostComment from "@/components/PostComment.vue";
    import {mapModuleState} from "@/util/mapStateUtils";
    import {CREATE_POST_COMMENT, FETCH_POST_COMMENTS} from "@/store/action-types";
    import {mapActions} from "vuex";

    const FROM_USER_LOCAL_KEY = "FROM_USER_LOCAL_KEY";
    const DEFAULT_FROM_USER = localStorage.getItem(FROM_USER_LOCAL_KEY) || '';
    export default {
        components: {
            PostComment,
            PostReviewEditor
        },
        data: () => ({
            newComment: '',
            newCommentFrom: DEFAULT_FROM_USER,
            newCommentIsPublishing: false,
            newReply: '',
            newReplyFrom: DEFAULT_FROM_USER,
            newReplyIsPublishing: false
        }),
        computed: {
            ...mapModuleState('post', ['comments'])
        },
        methods: {
            ...mapActions([CREATE_POST_COMMENT, FETCH_POST_COMMENTS]),
            publishComment() {
                if (!this.newComment) {
                    this.$showToast('评论不能为空');
                    return;
                }
                if (!this.newCommentFrom) {
                    this.$showToast('评论昵称不能为空');
                    return;
                }
                this.newCommentIsPublishing = true;
                this[CREATE_POST_COMMENT]({
                    postId: this.$route.params.id,
                    content: this.newComment,
                    fromUser: this.newCommentFrom
                })
                    .then(() => {
                        this.newComment = '';
                        localStorage.setItem(FROM_USER_LOCAL_KEY, this.newCommentFrom);
                    })
                    .catch(() => this.$showToast('发表评论失败'))
                    .finally(() => this.newCommentIsPublishing = false);
            },
            publishReply(content, fromUser) {

            }
        },
        created() {
            this[FETCH_POST_COMMENTS](this.$route.params.id)
                .catch(() => this.$showToast('加载评论失败'));
        }

    }
</script>

<style lang="scss">

    .post-comments {
        max-width: 850px;
        margin: 0 auto;
        padding: 0 16px 16px;

        &__comment-editor {
            margin-bottom: 16px;
        }
    }

</style>
