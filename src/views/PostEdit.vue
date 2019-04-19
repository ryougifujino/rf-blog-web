<template>
    <div class="post-edit">
        <div class="post-edit__toolbar">
            <input class="post-edit__title"
                   spellcheck="false"
                   placeholder="添加标题"
                   maxlength="200"
                   v-model="_title">
            <div class="post-edit__toolbar-right">
                <VButtonFlat @click.native="showPublisher">发布</VButtonFlat>
            </div>
        </div>
        <MarkdownEditor class="post-edit__markdown-input"
                        v-model="_body"
                        @scroll="onInputScroll">
        </MarkdownEditor>
        <MarkdownPreviewer class="post-edit__markdown-preview"
                           :markdown-input="_body"
                           :scroll-ratio="previewerScrollRatio">
        </MarkdownPreviewer>
        <PostEditPublisher :visible.sync="isShowPublisher"></PostEditPublisher>
    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor.vue';
    import MarkdownPreviewer from '@/components/MarkdownPreviewer.vue';
    import PostEditPublisher from '@/components/PostEditPublisher.vue';
    import {mapModuleState} from '@/util/mapStateUtils';
    import {mapMutations} from 'vuex';
    import {POST_EDIT_SET_TITLE, POST_EDIT_SET_BODY} from '@/store/mutation-types';

    export default {
        components: {
            MarkdownEditor,
            MarkdownPreviewer,
            PostEditPublisher
        },
        data: () => ({
            previewerScrollRatio: 0,
            isShowPublisher: false
        }),
        computed: {
            ...mapModuleState('postEdit', ['title', 'body']),
            _title: {
                get() {
                    return this.title;
                },
                set(value) {
                    this[POST_EDIT_SET_TITLE](value);
                }
            },
            _body: {
                get() {
                    return this.body;
                },
                set(value) {
                    this[POST_EDIT_SET_BODY](value);
                }
            }
        },
        methods: {
            ...mapMutations([POST_EDIT_SET_TITLE, POST_EDIT_SET_BODY]),
            computeRatio: (t) => {
                return t.scrollTop / (t.scrollHeight - t.offsetHeight);
            },
            onInputScroll(scrollPayload) {
                this.previewerScrollRatio = this.computeRatio(scrollPayload);
            },
            showPublisher() {
                if (this._title.trim() === '') {
                    this.$showToast("标题不能为空");
                    return;
                }
                this.isShowPublisher = true;
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
        $toolbar-right-width: 64px + 8px;

        &__toolbar {
            height: $toolbar-height;
            border-bottom: 1px solid $color-accent-dark;
            padding: 0 16px;
            font-size: 0;
        }

        &__title {
            border: none;
            outline: none;
            font-weight: bold;
            font-size: 24px;
            width: calc(100% - #{$toolbar-right-width});
            line-height: $toolbar-height;
            vertical-align: middle;
        }

        &__toolbar-right {
            display: inline-block;
            vertical-align: middle;
            text-align: right;
            width: $toolbar-right-width;
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