<template>
    <div class="post-comment">
        <h4 class="post-comment__from-user">{{comment.from_user}}
            <span class="post-comment__created-on"> · {{comment.created_on | localDate}}</span>
        </h4>
        <div class="post-comment__content">{{comment.content}}</div>
        <div class="post-comment__actions">
            <a @click="expandReplyBox(comment.id)">回复</a>
            <a @click="deletePost">删除</a>
        </div>
        <PostReviewEditor class="post-comment__reply-editor"
                          v-if="activeReplyBoxId === String(comment.id)"
                          keyword="回复"
                          content-max-length="1000"
                          from-user-max-length="20"
                          :content.sync="newReply"
                          :from-user.sync="newReplyFrom"
                          :is-publishing="newReplyIsPublishing"
                          @publish="publishReply">
        </PostReviewEditor>
        <div class="post-comment__replies">

        </div>
    </div>
</template>

<script>
    import PostReviewEditor from "@/components/PostReviewEditor.vue";
    import {LOCAL_KEY_FROM_USER} from "@/common/constants";

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
            }
        },
        data: () => ({
            newReply: '',
            newReplyFrom: DEFAULT_FROM_USER,
            newReplyIsPublishing: false
        }),
        methods: {
            expandReplyBox(boxId) {
                if (this.newReplyIsPublishing){
                    this.$showToast('正在发布回复中，请稍后再试');
                    return;
                }
                if (boxId !== this.activeReplyBoxId) {
                    this.newReply = '';
                    this.newReplyFrom = '';
                }
                this.$emit('update:activeReplyBoxId', String(boxId));
            },
            publishReply() {

            },
            deletePost() {

            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

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
            cursor: pointer;

            > a {
                margin-right: 8px;
                @include sm("&:active", "&:hover") {
                    color: $text-color-primary-light;
                }
            }
        }

        &__reply-editor {
            margin-top: 12px;
        }

        &__replies {
            background-color: $color-background-dark;
        }
    }
</style>
