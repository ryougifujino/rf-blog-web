<template>
    <div class="post-comment">
        <h4 class="post-comment__from-user">{{comment.from_user}}
            <span class="post-comment__created-on"> · {{comment.created_on | localDate}}</span>
        </h4>
        <div class="post-comment__content">{{comment.content}}</div>
        <div class="post-comment__actions">
            <a @click="reply">回复</a>
            <a @click="del">删除</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            comment: {
                type: Object,
                require: true
            }
        },
        methods: {
            reply() {

            },
            del() {

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
    }
</style>