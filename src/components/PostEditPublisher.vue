<template>
    <div class="mask" v-if="visible">
        <div class="post-edit-publisher">
            <div class="post-edit-publisher__header">发布博文</div>
            <div class="post-edit-publisher__form">
                <div class="post-edit-publisher__item">
                    <VRadioGroup class="post-edit-publisher__privacy"
                                 :items="privacyItems"
                                 v-model="_isPrivate"></VRadioGroup>
                </div>
                <div class="post-edit-publisher__item">
                    <div class="post-edit-publisher__item-title">专辑</div>
                    <AlbumsSelect v-model="_albumId"></AlbumsSelect>
                </div>
                <div class="post-edit-publisher__item">
                    <div class="post-edit-publisher__item-title">标签</div>
                    <div class="post-edit-publisher__tag-input-container">
                        <VInput placeholder="添加标签"
                                maxlength="20"
                                max-width
                                v-model="tagInput"
                                @keyup.enter.native="confirmTag"></VInput>
                        <div class="post-edit-publisher__tag-confirm-container">
                            <VButtonFlat @click.native="confirmTag">确认</VButtonFlat>
                        </div>
                    </div>
                </div>
                <div class="post-edit-publisher__item post-edit-publisher__tags">
                    <VTag class="post-edit-publisher__tag"
                          v-for="tag of tags"
                          :key="tag"
                          @click.native="removeTag(tag)">{{tag}}
                    </VTag>
                </div>
            </div>
            <div class="post-edit-publisher__footer">
                <div class="post-edit-publisher__buttons-container">
                    <VButtonFlat @click.native="cancel">取消</VButtonFlat>
                    <VButtonFlat @click.native="confirm">确认</VButtonFlat>
                </div>
            </div>
            <VProgressBar class="post-edit-publisher__progress-bar"
                          v-if="isPublishing"></VProgressBar>
        </div>
    </div>
</template>

<script>
    import AlbumsSelect from "@/components/AlbumsSelect.vue";
    import {CREATE_POST} from '@/store/action-types';
    import {mapActions, mapMutations} from 'vuex';
    import {mapModuleState} from '@/util/mapStateUtils';
    import {
        POST_EDIT_SET_IS_PRIVATE,
        POST_EDIT_SET_ALBUM_ID,
        POST_EDIT_ADD_TAG,
        POST_EDIT_REMOVE_TAG
    } from '@/store/mutation-types';

    export default {
        components: {
            AlbumsSelect
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            privacyItems: [{name: "公开", value: false}, {name: "私有", value: true}],
            tagInput: '',
            isPublishing: false
        }),
        computed: {
            ...mapModuleState('postEdit', ['isPrivate', 'albumId', 'tagSetChangeTracker', 'tagSet']),
            _isPrivate: {
                get() {
                    return this.isPrivate;
                },
                set(value) {
                    this[POST_EDIT_SET_IS_PRIVATE](value);
                }
            },
            _albumId: {
                get() {
                    return this.albumId;
                },
                set(value) {
                    this[POST_EDIT_SET_ALBUM_ID](value);
                }
            },
            tags() {
                return this.tagSetChangeTracker && Array.from(this.tagSet);
            }
        },
        methods: {
            ...mapActions([CREATE_POST]),
            ...mapMutations([POST_EDIT_SET_IS_PRIVATE, POST_EDIT_SET_ALBUM_ID, POST_EDIT_ADD_TAG,
                POST_EDIT_REMOVE_TAG]),
            cancel() {
                this.$emit('update:visible', false);
            },
            confirm() {
                this.isPublishing = true;
                this[CREATE_POST]()
                    .then(() => {
                        this.$showToast("发布成功");
                        this.$router.replace('/home');
                    })
                    .catch(() => this.$showToast("发布失败"))
                    .finally(() => this.isPublishing = false);
            },
            addTag(newTag) {
                this[POST_EDIT_ADD_TAG](newTag);
            },
            removeTag(oldTag) {
                this[POST_EDIT_REMOVE_TAG](oldTag);
            },
            confirmTag() {
                const tagInput = this.tagInput.trim();
                if (tagInput === '') {
                    return;
                }
                this.addTag(tagInput);
                this.tagInput = '';
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    $header-height: 50px;
    $border-radius: 16px;

    .post-edit-publisher {
        @extend %center;
        width: 450px;
        @media screen and (max-width: 450px) {
            width: 90%;
            min-width: 300px;
        }
        border-radius: $border-radius;
        position: relative;

        &__header {
            font-size: 16px;
            color: $text-color-primary;
            height: $header-height;
            line-height: $header-height;
            border-radius: $border-radius $border-radius 0 0;
            border-bottom: 1px solid $color-accent-dark;
            text-align: center;
        }

        &__form {
            padding: 0 16px;
        }

        &__item {
            margin: 16px 0;
        }

        &__item:after {
            display: block;
            content: '';
            clear: both;
        }

        &__item-title {
            color: $text-color-primary-light;
            padding: 8px 4px;
        }

        &__privacy {
            float: right;
        }

        &__tag-input-container {
            display: table;
            width: 100%;
            font-size: 0.9em;

            > * {
                display: table-cell;
                vertical-align: middle;
            }
        }

        &__tag-confirm-container {
            width: 72px;
            text-align: right;
        }

        &__tags {
            font-size: 0;
            height: 200px;
            overflow: auto;
            @extend %scrollbar;
        }

        &__tag {
            font-size: 14px;
            margin-right: 8px;
            margin-bottom: 8px;
        }

        &__footer {
            height: $header-height;
            border-radius: 0 0 $border-radius $border-radius;
        }

        &__buttons-container {
            display: inline-block;
            position: absolute;
            right: 16px;

            > div {
                background-color: $color-accent;
                font-weight: normal;
                font-size: 14px;
            }

            > div:hover {
                background-color: $color-accent-dark;
                color: $text-color-secondary;
            }
        }

        &__progress-bar {
            border-radius: $border-radius;
        }
    }


</style>
