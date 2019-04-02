<template>
    <div class="post-edit">
        <div class="post-edit__toolbar">
            <input class="post-edit__title" spellcheck="false">
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

    export default {
        components: {
            MarkdownEditor,
            MarkdownPreviewer
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
            padding: 16px;
            height: $toolbar-height;
            border-bottom: 1px solid $color-accent-dark;
        }

        &__title {
            border: none;
            outline: none;
            font-weight: bold;
            font-size: 24px;
            line-height: 32px;
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
