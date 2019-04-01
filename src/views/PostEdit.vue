<template>
    <div class="post-edit">
        <div class="post-edit__toolbar">
            <input class="post-edit__title" spellcheck="false">
        </div>
        <MarkdownEditor class="post-edit__markdown-input"
                        @input="markdownInput = $event"
                        @scroll="onInputScroll">
        </MarkdownEditor>
        <article class="post-edit__markdown-preview markdown-body"
                 v-html="markdownPreview"
                 ref="preview">
        </article>
    </div>
</template>

<script>
    import hljs from 'highlight.js';
    import 'highlight.js/styles/googlecode.css';
    import MarkdownEditor from '@/components/MarkdownEditor.vue';

    const md = require('markdown-it')({
        highlight(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (__) {
                }
            }
            return ''; // use external default escaping
        }
    });

    export default {
        components: {
            MarkdownEditor
        },
        data() {
            return {
                markdownInput: ''
            };
        },
        computed: {
            markdownPreview() {
                return md.render(this.markdownInput);
            }
        },
        methods: {
            computeCorrespondingHeight: (t1, t2) => {
                const ratio = t1.scrollTop / (t1.scrollHeight - t1.offsetHeight);
                return ratio * (t2.scrollHeight - t2.offsetHeight);
            },
            onInputScroll(scrollPayload) {
                const {preview} = this.$refs;
                preview.scrollTop = this.computeCorrespondingHeight(scrollPayload, preview);
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~github-markdown-css";

    .post-edit {
        * {
            box-sizing: border-box;
            background: none;
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

            ul li {
                list-style: inherit;
            }

            pre, span {
                background-color: $color-accent;
            }

            pre {
                border: 2px dashed $text-color-secondary-light;
            }

            img {
                background-color: $color-accent;
            }
        }

    }
</style>
