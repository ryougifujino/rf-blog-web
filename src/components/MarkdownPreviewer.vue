<template>
    <div class="markdown-previewer__content markdown-body"
         v-html="markdownPreview"></div>
</template>

<script>
    import hljs from 'highlight.js';
    import 'highlight.js/styles/googlecode.css';

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
        props: {
            markdownInput: {
                type: String,
                required: true
            },
            scrollRatio: {
                type: Number,
                default: 0
            }
        },
        watch: {
            scrollRatio(ratio) {
                const {$el} = this;
                $el.scrollTop = ($el.scrollHeight - $el.offsetHeight) * ratio;
            }
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

    .markdown-previewer__content {

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

</style>
