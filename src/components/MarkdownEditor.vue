<template>
    <div></div>
</template>

<script>
    import ace from 'ace-builds';
    import 'ace-builds/src-noconflict/ext-searchbox';
    import 'ace-builds/src-noconflict/mode-markdown';
    import 'ace-builds/src-noconflict/theme-dawn';

    let editor;
    export default {
        props: ['value'],
        watch: {
            value(newValue) {
                if (newValue !== editor.getValue()) {
                    editor.session.setValue(newValue);
                }
            }
        },
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
            editor.container.style.lineHeight = "1.25";
            editor.renderer.updateFontSize();
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

            // 在 mounted 之前value发生变化并不会引起 watch 中方法的调用，所以要在这设定初始值
            editor.session.setValue(this.value);

            editor.session.on('change', () => this.$emit('input', editor.getValue()));
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .ace_heading {
        color: black;
        font-weight: bold;
    }

    .ace_content * {
        background-color: transparent;;
    }

    .ace_search {
        background-color: $color-background;
        padding: 8px;
        position: fixed;
        top: 0;

        .ace_replace_form, .ace_search_options, .ace_button, .ace_search_counter {
            background-color: $color-background;
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

    .ace_scrollbar-v {
        @extend %scrollbar;
    }

</style>
