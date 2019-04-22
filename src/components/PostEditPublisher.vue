<template>
    <div class="mask" v-if="visible">
        <div class="post-edit-publisher">
            <VTheDialogHeader>发布博文</VTheDialogHeader>
            <div class="post-edit-publisher__form">
                <div class="post-edit-publisher__item">
                    <VRadioGroup class="post-edit-publisher__privacy"
                                 :items="privacyItems"
                                 v-model="_isPrivate">
                    </VRadioGroup>
                </div>
                <div class="post-edit-publisher__item">
                    <div class="post-edit-publisher__item-title">专辑</div>
                    <VSelect v-model="_albumId"
                             keyword="专辑"
                             :maxlength="200"
                             :items="albums"
                             @add-new="createAlbum">
                    </VSelect>
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
            <VTheDialogFooter @cancel="cancel" @confirm="confirm"></VTheDialogFooter>
            <VProgressBar class="post-edit-publisher__progress-bar"
                          v-if="isPublishing"></VProgressBar>
        </div>
    </div>
</template>

<script>
    import {CREATE_POST, FETCH_ALBUMS, CREATE_ALBUM} from '@/store/action-types';
    import {mapActions, mapMutations, mapState} from 'vuex';
    import {mapModuleState} from '@/util/mapStateUtils';
    import {
        POST_EDIT_SET_IS_PRIVATE,
        POST_EDIT_SET_ALBUM_ID,
        POST_EDIT_ADD_TAG,
        POST_EDIT_REMOVE_TAG
    } from '@/store/mutation-types';

    export default {
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
            ...mapState(['albums']),
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
            ...mapActions([CREATE_POST, FETCH_ALBUMS, CREATE_ALBUM]),
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
            },
            createAlbum(newAlbumName, callback) {
                callback(this[CREATE_ALBUM]({newAlbumName}));
            }
        },
        created() {
            this[FETCH_ALBUMS]();
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";
    @import "~@/assets/styles/dimens";

    .post-edit-publisher {
        @extend %dialog;

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

        &__progress-bar {
            border-radius: $border-radius;
        }
    }
</style>
