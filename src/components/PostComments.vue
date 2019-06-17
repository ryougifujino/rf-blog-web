<template>
    <div class="post-comments" v-scroll-bottom="loadMore">
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
                     :comment="comment"
                     :active-reply-box-id.sync="activeReplyBoxId"
                     :active-delete-button-id.sync="activeDeleteButtonId">
        </PostComment>
        <VLoadMoreBar :is-loading="isLoadingComments"
                      v-if="isShowLoadMoreBar"
                      @click="loadMore">
        </VLoadMoreBar>
    </div>
</template>

<script>
    import PostReviewEditor from '@/components/PostReviewEditor.vue';
    import PostComment from "@/components/PostComment.vue";
    import {mapModuleState} from "@/util/map-state-utils";
    import {CREATE_POST_COMMENT, FETCH_POST_COMMENTS} from "@/store/action-types";
    import {mapActions} from "vuex";
    import {LOCAL_KEY_FROM_USER} from "@/common/constants";

    const DEFAULT_FROM_USER = localStorage.getItem(LOCAL_KEY_FROM_USER) || '';
    export default {
        components: {
            PostComment,
            PostReviewEditor
        },
        data: () => ({
            newComment: '',
            newCommentFrom: DEFAULT_FROM_USER,
            newCommentIsPublishing: false,
            activeReplyBoxId: '',
            activeDeleteButtonId: ''
        }),
        computed: {
            ...mapModuleState('post', ['comments', 'isLoadingComments', 'isShowLoadMoreBar'])
        },
        methods: {
            ...mapActions([CREATE_POST_COMMENT, FETCH_POST_COMMENTS]),
            publishComment() {
                this.newCommentIsPublishing = true;
                this[CREATE_POST_COMMENT]({
                    postId: this.$route.params.id,
                    content: this.newComment,
                    fromUser: this.newCommentFrom
                })
                    .then(() => {
                        this.newComment = '';
                        localStorage.setItem(LOCAL_KEY_FROM_USER, this.newCommentFrom);
                    })
                    .catch(() => this.$showToast('发表评论失败'))
                    .finally(() => this.newCommentIsPublishing = false);
            },
            loadMore() {
                this[FETCH_POST_COMMENTS](this.$route.params.id)
                    .catch(() => this.$showToast('加载评论失败'));
            }
        },
        created() {
            this.loadMore();
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
