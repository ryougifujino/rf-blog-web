<template>
    <div class="markdown-previewer__content markdown-body"
         v-html="markdownPreview"></div>
</template>

<script>
    import 'highlight.js/styles/googlecode.css';
    import hljs from 'highlight.js/lib/highlight';
    import accesslog from 'highlight.js/lib/languages/accesslog';
    import actionscript from 'highlight.js/lib/languages/actionscript';
    import apache from 'highlight.js/lib/languages/apache';
    import applescript from 'highlight.js/lib/languages/applescript';
    import bash from 'highlight.js/lib/languages/bash';
    import basic from 'highlight.js/lib/languages/basic';
    import cmake from 'highlight.js/lib/languages/cmake';
    import coffeescript from 'highlight.js/lib/languages/coffeescript';
    import cpp from 'highlight.js/lib/languages/cpp';
    import css from 'highlight.js/lib/languages/css';
    import dart from 'highlight.js/lib/languages/dart';
    import delphi from 'highlight.js/lib/languages/delphi';
    import diff from 'highlight.js/lib/languages/diff';
    import django from 'highlight.js/lib/languages/django';
    import dns from 'highlight.js/lib/languages/dns';
    import dockerfile from 'highlight.js/lib/languages/dockerfile';
    import dos from 'highlight.js/lib/languages/dos';
    import dust from 'highlight.js/lib/languages/dust';
    import erlang from 'highlight.js/lib/languages/erlang';
    import excel from 'highlight.js/lib/languages/excel';
    import fortran from 'highlight.js/lib/languages/fortran';
    import fsharp from 'highlight.js/lib/languages/fsharp';
    import go from 'highlight.js/lib/languages/go';
    import gradle from 'highlight.js/lib/languages/gradle';
    import groovy from 'highlight.js/lib/languages/groovy';
    import haskell from 'highlight.js/lib/languages/haskell';
    import htmlbars from 'highlight.js/lib/languages/htmlbars';
    import http from 'highlight.js/lib/languages/http';
    import java from 'highlight.js/lib/languages/java';
    import javascript from 'highlight.js/lib/languages/javascript';
    import json from 'highlight.js/lib/languages/json';
    import kotlin from 'highlight.js/lib/languages/kotlin';
    import less from 'highlight.js/lib/languages/less';
    import lisp from 'highlight.js/lib/languages/lisp';
    import livescript from 'highlight.js/lib/languages/livescript';
    import llvm from 'highlight.js/lib/languages/llvm';
    import lua from 'highlight.js/lib/languages/lua';
    import makefile from 'highlight.js/lib/languages/makefile';
    import markdown from 'highlight.js/lib/languages/markdown';
    import matlab from 'highlight.js/lib/languages/matlab';
    import moonscript from 'highlight.js/lib/languages/moonscript';
    import nginx from 'highlight.js/lib/languages/nginx';
    import objectivec from 'highlight.js/lib/languages/objectivec';
    import perl from 'highlight.js/lib/languages/perl';
    import php from 'highlight.js/lib/languages/php';
    import plaintext from 'highlight.js/lib/languages/plaintext';
    import powershell from 'highlight.js/lib/languages/powershell';
    import profile from 'highlight.js/lib/languages/profile';
    import prolog from 'highlight.js/lib/languages/prolog';
    import protobuf from 'highlight.js/lib/languages/protobuf';
    import python from 'highlight.js/lib/languages/python';
    import r from 'highlight.js/lib/languages/r';
    import ruby from 'highlight.js/lib/languages/ruby';
    import rust from 'highlight.js/lib/languages/rust';
    import scala from 'highlight.js/lib/languages/scala';
    import scheme from 'highlight.js/lib/languages/scheme';
    import scss from 'highlight.js/lib/languages/scss';
    import shell from 'highlight.js/lib/languages/shell';
    import smali from 'highlight.js/lib/languages/smali';
    import smalltalk from 'highlight.js/lib/languages/smalltalk';
    import sql from 'highlight.js/lib/languages/sql';
    import stylus from 'highlight.js/lib/languages/stylus';
    import swift from 'highlight.js/lib/languages/swift';
    import taggerscript from 'highlight.js/lib/languages/taggerscript';
    import typescript from 'highlight.js/lib/languages/typescript';
    import vbscript from 'highlight.js/lib/languages/vbscript';
    import vim from 'highlight.js/lib/languages/vim';
    import xml from 'highlight.js/lib/languages/xml';
    import yaml from 'highlight.js/lib/languages/yaml';

    hljs.registerLanguage('accesslog', accesslog);
    hljs.registerLanguage('actionscript', actionscript);
    hljs.registerLanguage('apache', apache);
    hljs.registerLanguage('applescript', applescript);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('basic', basic);
    hljs.registerLanguage('cmake', cmake);
    hljs.registerLanguage('coffeescript', coffeescript);
    hljs.registerLanguage('cpp', cpp);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('dart', dart);
    hljs.registerLanguage('delphi', delphi);
    hljs.registerLanguage('diff', diff);
    hljs.registerLanguage('django', django);
    hljs.registerLanguage('dns', dns);
    hljs.registerLanguage('dockerfile', dockerfile);
    hljs.registerLanguage('dos', dos);
    hljs.registerLanguage('dust', dust);
    hljs.registerLanguage('erlang', erlang);
    hljs.registerLanguage('excel', excel);
    hljs.registerLanguage('fortran', fortran);
    hljs.registerLanguage('fsharp', fsharp);
    hljs.registerLanguage('go', go);
    hljs.registerLanguage('gradle', gradle);
    hljs.registerLanguage('groovy', groovy);
    hljs.registerLanguage('haskell', haskell);
    hljs.registerLanguage('htmlbars', htmlbars);
    hljs.registerLanguage('http', http);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('kotlin', kotlin);
    hljs.registerLanguage('less', less);
    hljs.registerLanguage('lisp', lisp);
    hljs.registerLanguage('livescript', livescript);
    hljs.registerLanguage('llvm', llvm);
    hljs.registerLanguage('lua', lua);
    hljs.registerLanguage('makefile', makefile);
    hljs.registerLanguage('markdown', markdown);
    hljs.registerLanguage('matlab', matlab);
    hljs.registerLanguage('moonscript', moonscript);
    hljs.registerLanguage('nginx', nginx);
    hljs.registerLanguage('objectivec', objectivec);
    hljs.registerLanguage('perl', perl);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('plaintext', plaintext);
    hljs.registerLanguage('powershell', powershell);
    hljs.registerLanguage('profile', profile);
    hljs.registerLanguage('prolog', prolog);
    hljs.registerLanguage('protobuf', protobuf);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('r', r);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('scala', scala);
    hljs.registerLanguage('scheme', scheme);
    hljs.registerLanguage('scss', scss);
    hljs.registerLanguage('shell', shell);
    hljs.registerLanguage('smali', smali);
    hljs.registerLanguage('smalltalk', smalltalk);
    hljs.registerLanguage('sql', sql);
    hljs.registerLanguage('stylus', stylus);
    hljs.registerLanguage('swift', swift);
    hljs.registerLanguage('taggerscript', taggerscript);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('vbscript', vbscript);
    hljs.registerLanguage('vim', vim);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('yaml', yaml);
    import taskLists from 'markdown-it-task-lists';

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
    })
        .use(taskLists);

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
    @import "~@/assets/styles/mixins";
    @import "~github-markdown-css";

    .markdown-previewer__content {

        ul li {
            list-style: inherit;
        }

        pre, span {
            background-color: $color-background;
        }

        pre {
            border: 2px dashed $text-color-secondary-light;
            @extend %scrollbar;
        }

        img {
            background-color: $color-background;
        }

        @extend %scrollbar;
    }

</style>
