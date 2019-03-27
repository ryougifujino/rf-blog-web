<template>
    <div class="post-edit">
        <div class="post-edit__toolbar">
            <input class="post-edit__title" spellcheck="false">
        </div>
        <article class="post-edit__markdown-input">
            <textarea v-model="markdownInput" spellcheck="false"></textarea>
        </article>
        <article class="post-edit__markdown-preview markdown-body" v-html="markdownPreview">
        </article>
    </div>
</template>

<script>
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-light.css';

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
        data() {
            return {
                markdownInput: ''
            };
        },
        computed: {
            markdownPreview() {
                return md.render(this.markdownInput);
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

            > textarea {
                height: 100%;
                width: 100%;
                border: none;
                outline: none;
                resize: none;
                padding: 16px;
            }
        }

        &__markdown-preview {
            @extend %markdown;
            overflow: auto;
            padding: 16px;

            pre, span {
                background-color: $text-color-secondary-light3;
            }

            img {
                background-color: $color-accent;
            }
        }

    }
</style>