<template>
    <TransitionFade>
        <div class="mask" v-if="isPublisherVisible">
            <div class="shares-publisher">
                <VDialogHeader>发布分享</VDialogHeader>
                <div class="shares-publisher__form">
                    <div class="shares-publisher__item">
                        <div class="shares-publisher__item-title">分类</div>
                        <VSelect v-model="_shareCategoryId"
                                 :items="shareCategories"
                                 keyword="分类"
                                 :maxlength="100"
                                 @add-new="createShareCategory">
                        </VSelect>
                    </div>
                    <div class="shares-publisher__item">
                        <div class="shares-publisher__item-title">分享标题</div>
                        <VInput v-model="_title"
                                class="shares-publisher__item-input"
                                placeholder="添加分享标题"
                                max-width
                                maxlength="200">
                        </VInput>
                    </div>
                    <div class="shares-publisher__item">
                        <div class="shares-publisher__item-title">分享URL</div>
                        <VInput v-model="_url"
                                class="shares-publisher__item-input"
                                placeholder="添加分享URL"
                                max-width>
                        </VInput>
                    </div>
                </div>
                <VDialogFooter @cancel="cancel" @confirm="confirm"></VDialogFooter>
                <VProgressBar class="shares-publisher__progress-bar"
                              v-if="isPublishing"></VProgressBar>
            </div>
        </div>
    </TransitionFade>
</template>

<script>
    import TransitionFade from "@/components/TransitionFade.vue";
    import {mapModuleState} from "@/util/map-state-utils";
    import {mapActions, mapMutations} from "vuex";
    import {
        SHARES_SET_PUBLISHER_VISIBLE,
        SHARES_SET_SHARE_CATEGORY_ID,
        SHARES_SET_TITLE,
        SHARES_SET_URL
    } from "@/store/mutation-types";
    import {PUBLISH_SHARE, CREATE_SHARE_CATEGORY} from "@/store/action-types";

    export default {
        components: {
            TransitionFade
        },
        data: () => ({
            isPublishing: false
        }),
        computed: {
            ...mapModuleState('shares', ['shareCategories', 'shareCategoryId', 'title', 'url',
                'isPublisherVisible']),
            _shareCategoryId: {
                get() {
                    return this.shareCategoryId;
                },
                set(value) {
                    this[SHARES_SET_SHARE_CATEGORY_ID](value);
                }
            },
            _title: {
                get() {
                    return this.title;
                },
                set(value) {
                    this[SHARES_SET_TITLE](value);
                }
            },
            _url: {
                get() {
                    return this.url;
                },
                set(value) {
                    this[SHARES_SET_URL](value);
                }
            }
        },
        methods: {
            ...mapActions([PUBLISH_SHARE, CREATE_SHARE_CATEGORY]),
            ...mapMutations([SHARES_SET_SHARE_CATEGORY_ID, SHARES_SET_TITLE, SHARES_SET_URL,
                SHARES_SET_PUBLISHER_VISIBLE]),
            cancel() {
                this[SHARES_SET_PUBLISHER_VISIBLE](false);
            },
            confirm() {
                if (!this.title.trim()) {
                    this.$showToast("请输入分享标题");
                    return;
                }
                if (!this.url.trim()) {
                    this.$showToast("请输入分享URL");
                    return;
                }
                this.isPublishing = true;
                this[PUBLISH_SHARE]()
                    .then(() => {
                        this.$showToast("发布成功");
                        this[SHARES_SET_PUBLISHER_VISIBLE](false);
                    })
                    .catch(() => this.$showToast("发布失败"))
                    .finally(() => this.isPublishing = false);
            },
            createShareCategory(newShareCategoryName, callback) {
                callback(this[CREATE_SHARE_CATEGORY]({newShareCategoryName}));
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";
    @import "~@/assets/styles/dimens";

    .shares-publisher {
        @extend %dialog;

        &__form {
            padding: 0 16px 16px;
        }

        &__item {
            margin-top: 16px;
        }

        &__item-title {
            color: $text-color-primary-light;
            padding: 8px 4px;
        }

        &__item-input {
            font-size: 0.9em;
        }

        &__progress-bar {
            border-radius: $border-radius;
        }
    }
</style>
