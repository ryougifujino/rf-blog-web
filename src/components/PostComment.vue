<template>
    <div :class="['post-comment', {'post-comment--collapsed': commentIsDeleting}]">
        <h4 class="post-comment__from-user">{{comment.from_user}}
            <span class="post-comment__created-on"> · {{comment.created_on | localDate}}</span>
        </h4>
        <div class="post-comment__content">{{comment.content}}</div>
        <div class="post-comment__actions">
            <a @click="expandReplyBox(comment.id)">回复</a>
            <a v-if="isAuthenticated"
               :class="deleteButtonClass(comment.id)"
               v-click-outside:delete="deactivateDeleteButton"
               @click="requestDelete(comment.id)">{{deleteButtonText(comment.id)}}</a>
        </div>
        <PostReviewEditor class="post-comment__reply-editor post-comment__reply-editor--text-small"
                          v-if="activeReplyBoxId === String(comment.id)"
                          keyword="回复"
                          content-max-length="1000"
                          from-user-max-length="20"
                          :content.sync="newReply"
                          :from-user.sync="newReplyFrom"
                          :is-publishing="newReplyIsPublishing"
                          @publish="publishReply">
        </PostReviewEditor>
        <div class="post-comment__replies" v-if="comment.replies.length">
            <div class="post-comment__reply" v-for="reply of comment.replies" :key="reply.id">
                <div class="post-comment__reply-content">{{reply.content}}</div>
                <div class="post-comment__reply-footer">
                    <div class="post-comment__reply-from-user">— {{reply.from_user}}</div>
                    {{reply.created_on | localDate}}
                    <span> · </span>
                    <a class="post-comment__reply-action"
                       @click="expandReplyBox(comment.id + '#' + reply.id, reply.from_user)">回复</a>
                    <span v-if="isAuthenticated"> · </span>
                    <a v-if="isAuthenticated"
                       class="post-comment__reply-action"
                       :class="deleteButtonClass(comment.id + '#' + reply.id)"
                       v-click-outside:delete="deactivateDeleteButton"
                       @click="requestDelete(comment.id + '#' + reply.id, reply.id)">
                    {{deleteButtonText(comment.id + '#' + reply.id)}}
                    </a>
                </div>
                <PostReviewEditor class="post-comment__reply-editor"
                                  v-if="activeReplyBoxId === comment.id + '#' + reply.id"
                                  keyword="回复"
                                  content-max-length="1000"
                                  from-user-max-length="20"
                                  :content.sync="newReply"
                                  :from-user.sync="newReplyFrom"
                                  :is-publishing="newReplyIsPublishing"
                                  @publish="publishReply">
                </PostReviewEditor>
            </div>
        </div>
        <VProgressBar v-if="commentIsDeleting"></VProgressBar>
    </div>
</template>

<script>
    import PostReviewEditor from "@/components/PostReviewEditor.vue";
    import {LOCAL_KEY_FROM_USER} from "@/common/constants";
    import {mapModuleState} from "@/util/mapStateUtils";
    import {mapActions} from "vuex";
    import {CREATE_POST_REPLY, DELETE_POST_COMMENT, DELETE_POST_REPLY} from "@/store/action-types";

    const DEFAULT_FROM_USER = localStorage.getItem(LOCAL_KEY_FROM_USER) || '';
    export default {
        components: {
            PostReviewEditor
        },
        props: {
            comment: {
                type: Object,
                require: true
            },
            activeReplyBoxId: {
                type: String,
                require: true
            },
            activeDeleteButtonId: {
                type: String,
                require: true
            }
        },
        data: () => ({
            newReply: '',
            newReplyFrom: DEFAULT_FROM_USER,
            newReplyIsPublishing: false,
            commentIsDeleting: false
        }),
        computed: {
            ...mapModuleState('auth', ['isAuthenticated']),
            deleteButtonClass() {
                return deleteButtonId => {
                    const isActive = this.activeDeleteButtonId === String(deleteButtonId);
                    return {'post-comment__delete-confirm': isActive};
                };
            },
            deleteButtonText() {
                return deleteButtonId =>
                    this.activeDeleteButtonId === String(deleteButtonId) ? "确认" : "删除";
            }
        },
        methods: {
            ...mapActions([CREATE_POST_REPLY, DELETE_POST_REPLY, DELETE_POST_COMMENT]),
            expandReplyBox(boxId, replyTo) {
                if (this.newReplyIsPublishing) {
                    this.$showToast('正在发布回复中，请稍后再试');
                    return;
                }
                if (boxId !== this.activeReplyBoxId) {
                    this.newReply = replyTo ? `回复 ${replyTo}：` : '';
                }
                this.$emit('update:activeReplyBoxId', String(boxId));
            },
            publishReply() {
                this.newReplyIsPublishing = true;
                this[CREATE_POST_REPLY]({
                    commentId: this.comment.id,
                    content: this.newReply,
                    fromUser: this.newReplyFrom
                })
                    .then(() => {
                        this.newReply = '';
                        this.$emit('update:activeReplyBoxId', '');
                        this.$showToast('回复成功');
                        localStorage.setItem(LOCAL_KEY_FROM_USER, this.newReplyFrom);
                    })
                    .catch(() => this.$showToast('发表回复失败'))
                    .finally(() => this.newReplyIsPublishing = false);
            },
            requestDelete(deleteButtonId, replyId) {
                deleteButtonId = String(deleteButtonId);
                if (this.activeDeleteButtonId === deleteButtonId) {
                    if (!replyId) {
                        this.deleteComment();
                    } else {
                        this.deleteReply(replyId);
                    }
                } else {
                    this.$emit('update:activeDeleteButtonId', deleteButtonId);
                }
            },
            deleteComment() {
                if (this.newReplyIsPublishing) {
                    this.$showToast('正在发布回复中，请稍后再试');
                    return;
                }
                this.commentIsDeleting = true;
                this[DELETE_POST_COMMENT](this.comment.id)
                    .then(() => this.$showToast('删除成功'))
                    .catch(() => this.$showToast('删除失败'))
                    .finally(() => this.commentIsDeleting = false);

            },
            deleteReply(replyId) {
                this[DELETE_POST_REPLY]({commentId: this.comment.id, replyId})
                    .then(() => this.$showToast('删除成功'))
                    .catch(() => this.$showToast('删除失败'));
            },
            deactivateDeleteButton() {
                this.$emit('update:activeDeleteButtonId', '');
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .post-comment--collapsed {
        position: relative;
        height: 100px;
        overflow: hidden;
        border-radius: 16px;
    }

    .post-comment {
        padding: 12px 8px;
        border-top: 1px solid $text-color-secondary-light2;

        &__from-user {
            color: $text-color-primary;
            font-weight: 500;
        }

        &__created-on {
            color: $text-color-secondary;
            font-weight: normal;
            font-size: 0.7em;
        }

        &__content {
            color: $text-color-primary-light;
            margin: 8px 0;
            font-size: 0.9em;
            white-space: pre-wrap;
        }

        &__actions {
            color: $text-color-secondary;
            font-size: 0.9em;

            > a {
                margin-right: 8px;
                cursor: pointer;
                @include sm("&:active", "&:hover") {
                    color: $text-color-primary-light;
                }
            }
        }

        &__reply-editor {
            margin-top: 12px;

            .post-review-editor__editor {
                height: 100px;
            }

            &--text-small {
                font-size: 0.9em;
            }

            .region-mask--transparent {
                background: #ff000000;
            }
        }

        &__replies {
            margin-top: 12px;
            border-radius: 8px;
            overflow: hidden;
            font-size: 0.9em;
            padding: 12px 0;
            background-color: $color-background-dark;

            * {
                background-color: $color-background-dark;
            }
        }

        &__reply {
            padding: 8px 12px 8px 10%;

            &-content {
                color: $text-color-primary-light;
                white-space: pre-line;
                @extend %word-break;
            }

            &-footer {
                font-size: 0.9em;
                color: $text-color-secondary;
                margin-top: 4px;
            }

            &-from-user {
                margin-bottom: 4px;
            }

            &-action {
                cursor: pointer;
                @include sm("&:active", "&:hover") {
                    color: $text-color-primary-light;
                }
            }
        }

        &__delete-confirm {
            color: $color-danger;

            @include sm("&:active", "&:hover") {
                color: $color-danger !important;
            }
        }
    }
</style>
