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
        <VProgressBar class="post-edit__progress-bar"
                      v-if="isPostLoading"
                      transparent
                      colored>
        </VProgressBar>
    </div>
</template>

<script>
    import PostEditPublisher from '@/components/PostEditPublisher.vue';
    import {mapModuleState} from '@/util/map-state-utils';
    import {mapActions, mapMutations} from 'vuex';
    import {
        POST_EDIT_SET_TITLE,
        POST_EDIT_SET_BODY,
        POST_EDIT_SAVE_STATE
    } from '@/store/mutation-types';
    import {POST_EDIT_INITIALIZE} from "@/store/action-types";

    export default {
        props: {
            post: {
                type: Object,
                required: false
            }
        },
        components: {
            MarkdownEditor: () => import('@/components/MarkdownEditor.vue'),
            MarkdownPreviewer: () => import("@/components/MarkdownPreviewer.vue"),
            PostEditPublisher
        },
        data: () => ({
            previewerScrollRatio: 0,
            isShowPublisher: false
        }),
        computed: {
            ...mapModuleState('postEdit', ['title', 'body', 'isPostLoading']),
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
            ...mapActions([POST_EDIT_INITIALIZE]),
            ...mapMutations([POST_EDIT_SET_TITLE, POST_EDIT_SET_BODY, POST_EDIT_SAVE_STATE]),
            computeRatio: (t) => t.scrollTop / (t.scrollHeight - t.offsetHeight),
            onInputScroll(scrollPayload) {
                this.previewerScrollRatio = this.computeRatio(scrollPayload);
            },
            showPublisher() {
                if (this._title.trim() === '') {
                    this.$showToast("标题不能为空");
                    return;
                }
                this.isShowPublisher = true;
            },
            trySaveState() {
                !this.$route.params.id && this[POST_EDIT_SAVE_STATE]();
            }
        },
        created() {
            window.addEventListener('beforeunload', this.trySaveState);
            this.$once('hook:beforeDestroy', () => window.removeEventListener('beforeunload', this.trySaveState));

            this[POST_EDIT_INITIALIZE](this.$route.params.id)
                .catch(() => this.$showToast("获取博文信息失败"));
        },
        beforeRouteLeave(to, from, next) {
            this.trySaveState();
            next();
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .post-edit {
        height: 100vh;
        overflow: hidden; // otherwise textarea will expand its container div
        $toolbar-height: 64px;

        &__toolbar {
            height: $toolbar-height;
            border-bottom: 1px solid $color-background-dark;
            padding: 0 16px;
            display: flex;
            align-items: center;
        }

        &__title {
            border: none;
            outline: none;
            font-weight: bold;
            font-size: 24px;
            min-width: 100px;
            flex: 1;
        }

        &__toolbar-right {
            margin-left: 12px;
        }

        %markdown {
            height: calc(100% - #{$toolbar-height});
            width: 50%;
            float: left;
            box-sizing: border-box;
        }

        &__markdown-input {
            @extend %markdown;
            border-right: 1px solid $color-background-dark;
        }

        &__markdown-preview {
            @extend %markdown;
            overflow: auto;
            padding: 0 16px 16px 16px;
        }

        &__progress-bar {
            position: fixed;
        }
    }
</style>
