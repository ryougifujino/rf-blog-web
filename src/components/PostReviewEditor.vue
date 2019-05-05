<template>
    <div class="post-review-editor">
        <textarea class="post-review-editor__editor"
                  :placeholder="'新增' + keyword"
                  :maxlength="contentMaxLength"
                  :value="content"
                  spellcheck="false">
        </textarea>
        <div class="post-review-editor__footer">
            <input class="post-review-editor__from-user"
                   :placeholder="keyword + '昵称'"
                   :maxlength="fromUserMaxLength"
                   :value="fromUser"
                   spellcheck="false">
            <VButtonFlat @click="$emit('publish', content, fromUser)">发表</VButtonFlat>
        </div>
        <VProgressBar transparent colored v-if="isPublishing"></VProgressBar>
    </div>
</template>

<script>
    export default {
        props: {
            keyword: {
                type: String,
                required: true
            },
            contentMaxLength: {
                type: String,
                required: true
            },
            fromUserMaxLength: {
                type: String,
                required: true
            },
            content: {
                type: String,
                default: ''
            },
            fromUser: {
                type: String,
                default: ''
            },
            isPublishing: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .post-review-editor {
        position: relative;

        &__editor {
            width: 100%;
            box-sizing: border-box;
            height: 135px;
            padding: 12px;
            border-radius: 16px;
            border-color: $text-color-secondary-light;
            resize: none;
            outline: none;
        }

        &__footer {
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__from-user {
            outline: none;
            box-sizing: border-box;
            max-width: 200px;
            width: 100%;
            border: 1px solid $text-color-secondary-light;
            border-radius: 16px;
            padding: 8px 12px;
            margin-right: 8px;
        }

    }
</style>
