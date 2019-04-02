<template>
    <div class="post-edit">
        <div class="post-edit__toolbar">
            <input class="post-edit__title" spellcheck="false" placeholder="添加标题" maxlength="200">
            <div class="post-edit__toolbar-right">
                <FlatButton class="post-edit__publish">发布</FlatButton>
            </div>
        </div>
        <MarkdownEditor class="post-edit__markdown-input"
                        @input="markdownInput = $event"
                        @scroll="onInputScroll">
        </MarkdownEditor>
        <MarkdownPreviewer class="post-edit__markdown-preview"
                           :markdown-input="markdownInput"
                           :scroll-ratio="previewerScrollRatio">
        </MarkdownPreviewer>
    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor.vue';
    import MarkdownPreviewer from '@/components/MarkdownPreviewer.vue';
    import FlatButton from '@/components/FlatButton.vue';

    export default {
        components: {
            MarkdownEditor,
            MarkdownPreviewer,
            FlatButton
        },
        data() {
            return {
                markdownInput: '',
                previewerScrollRatio: 0
            };
        },
        methods: {
            computeRatio: (t) => {
                return t.scrollTop / (t.scrollHeight - t.offsetHeight);
            },
            onInputScroll(scrollPayload) {
                this.previewerScrollRatio = this.computeRatio(scrollPayload);
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .post-edit {
        * {
            box-sizing: border-box;
        }

        height: 100vh;
        overflow: hidden; // otherwise textarea will expand its container div
        $toolbar-height: 64px;

        &__toolbar {
            height: $toolbar-height;
            border-bottom: 1px solid $color-accent-dark;
            padding: 0 16px;
            font-size: 0;
        }

        $toolbar-right-width: 64px + 8px;

        &__toolbar-right {
            display: inline-block;
            vertical-align: middle;
            text-align: right;
            width: $toolbar-right-width;
        }

        &__title {
            border: none;
            outline: none;
            font-weight: bold;
            font-size: 24px;
            height: 100%;
            width: calc(100% - #{$toolbar-right-width});
            vertical-align: middle;
        }

        &__publish {
            font-size: 16px;
        }

        %markdown {
            height: calc(100% - #{$toolbar-height});
            width: 50%;
            float: left;
        }

        &__markdown-input {
            @extend %markdown;
            border-right: 1px solid $color-accent-dark;
        }

        &__markdown-preview {
            @extend %markdown;
            overflow: auto;
            padding: 0 16px 16px 16px;
        }

    }
</style>
