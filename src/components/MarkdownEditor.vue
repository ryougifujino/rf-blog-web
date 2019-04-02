<template>
    <div></div>
</template>

<script>
    import ace from 'ace-builds';
    import 'ace-builds/src-noconflict/ext-searchbox';
    import 'ace-builds/src-noconflict/mode-markdown';
    import 'ace-builds/src-noconflict/theme-dawn'

    let editor;
    export default {
        mounted() {
            editor = ace.edit(this.$el, {
                showLineNumbers: false,
                mode: "ace/mode/markdown",
                theme: 'ace/theme/dawn',
                newLineMode: 'unix',
                fontSize: '15px',
                fontFamily: 'Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", ' +
                    '"Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif',
                wrap: true,
                showGutter: true,
                showPrintMargin: false,
                foldStyle: 'manual',
                useSoftTabs: true,
                scrollPastEnd: true
            });
            const lineHeight = document.querySelector(".ace_active-line").offsetHeight;
            let lastScrollTop;
            editor.session.on("changeScrollTop", scrollTop => {
                if (scrollTop >= 0 && scrollTop !== lastScrollTop) {
                    this.$emit('scroll', {
                        scrollTop,
                        offsetHeight: editor.renderer.getTextAreaContainer().offsetHeight,
                        scrollHeight: editor.session.getScreenLength() * lineHeight
                    });
                    lastScrollTop = scrollTop;
                }
            });

            editor.session.on('change', () => this.$emit('input', editor.getValue()));
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .ace_heading {
        color: black;
        font-weight: bold;
    }

    .ace_content * {
        background-color: transparent;;
    }

    .ace_search {
        background-color: $color-accent;
        padding: 8px;
        position: fixed;
        top: 0;

        .ace_replace_form, .ace_search_options, .ace_button, .ace_search_counter {
            background-color: $color-accent;
        }

        .ace_button {
            border-radius: 3px;
        }

        .ace_search_form, .ace_search_replace {
            white-space: nowrap;
        }

        .ace_search_field {
            min-width: 15em;
            @media screen and (max-width: 360px) {
                min-width: 8em;
            }
        }

    }

    .ace_search.right {
        right: 50%;
        @media screen and (max-width: 500px) {
            right: 0;
        }
        border: 1px solid $text-color-secondary-light2;
        border-radius: 6px;
    }


</style>
