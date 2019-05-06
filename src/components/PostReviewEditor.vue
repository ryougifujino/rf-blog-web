<template>
    <div class="post-review-editor">
        <div class="post-review-editor__editor-container">
            <textarea class="post-review-editor__editor"
                      :placeholder="'新增' + keyword"
                      :maxlength="contentMaxLength"
                      :value="content"
                      @input="$emit('update:content', $event.target.value)"
                      spellcheck="false">
            </textarea>
        </div>
        <div class="post-review-editor__footer">
            <input class="post-review-editor__from-user"
                   :placeholder="keyword + '昵称'"
                   :maxlength="fromUserMaxLength"
                   :value="fromUser"
                   @input="$emit('update:fromUser', $event.target.value)"
                   spellcheck="false">
            <VButtonFlat @click.native="publish">发表</VButtonFlat>
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
        },
        methods: {
            publish() {
                if (!this.content) {
                    this.$showToast(this.keyword + '不能为空');
                    return;
                }
                if (!this.fromUser) {
                    this.$showToast(this.keyword + '昵称不能为空');
                    return;
                }
                this.$emit('publish');
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .post-review-editor {
        position: relative;

        &__editor-container {
            overflow: hidden;
            border-radius: 16px;
            border: 1px solid $text-color-secondary-light;
        }

        &__editor {
            width: 100%;
            box-sizing: border-box;
            height: 135px;
            padding: 12px;
            border: none;
            resize: none;
            outline: none;
            @extend %scrollbar;
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
