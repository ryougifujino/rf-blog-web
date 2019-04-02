<template>
    <div></div>
</template>

<script>
    import ace from 'ace-builds';
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

<style>
    .ace_heading {
        color: black;
        font-weight: bold;
    }
</style>
