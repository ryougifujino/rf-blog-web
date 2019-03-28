<template>
    <div class="post-edit">
        <div class="post-edit__toolbar">
            <input class="post-edit__title" spellcheck="false">
        </div>
        <article class="post-edit__markdown-input">
            <textarea v-model="markdownInput" spellcheck="false"
                      v-scroll="onInputScroll" ref="input"></textarea>
        </article>
        <article class="post-edit__markdown-preview markdown-body" v-html="markdownPreview"
                 v-scroll="onPreviewScroll" ref="preview">
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

    const INPUT_REF_NAME = 'input';
    const PREVIEW_REF_NAME = 'preview';
    export default {
        data() {
            return {
                markdownInput: '',
                [INPUT_REF_NAME + 'ScrollControl']: {
                    timer: null,
                    lock: false
                },
                [PREVIEW_REF_NAME + 'ScrollControl']: {
                    timer: null,
                    lock: false
                }
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
            onScroll(t1RefName, t2RefName) {
                const [t1Ctrl, t2Ctrl] = [this[t1RefName + 'ScrollControl'], this[t2RefName + 'ScrollControl']];
                const [t1, t2] = [this.$refs[t1RefName], this.$refs[t2RefName]];

                if (t1Ctrl.lock) return;
                t2Ctrl.lock = true;
                t2.scrollTop = this.computeCorrespondingHeight(t1, t2);

                t1Ctrl.timer && clearTimeout(t1Ctrl.timer);
                t1Ctrl.timer = setTimeout(() => void (t2Ctrl.lock = false), 150);
            },
            onInputScroll() {
                this.onScroll(INPUT_REF_NAME, PREVIEW_REF_NAME);
            },
            onPreviewScroll() {
                this.onScroll(PREVIEW_REF_NAME, INPUT_REF_NAME);
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

            ul li {
                list-style: inherit;
            }

            pre, span {
                background-color: $text-color-secondary-light3;
            }

            img {
                background-color: $color-accent;
            }
        }

    }
</style>