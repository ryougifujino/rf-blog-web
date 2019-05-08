<template>
    <div>
        <ul class="shares-list">
            <li class="shares-list__specific-category-shares"
                v-for="specificCategoryShares of categorizedShares"
                :key="specificCategoryShares.category">
                <h3>{{specificCategoryShares.category}}</h3>
                <div class="shares-list__link-container"
                     v-for="share of specificCategoryShares.shares"
                     :key="share.id">
                    <h4 class="shares-list__link" @click="openLink(share.url)">{{share.title}}</h4>
                    <VIcon name="baseline-delete-24px"
                           @click.native="showDeleteConfirm(share.id)">
                    </VIcon>
                    <VIcon name="baseline-edit-24px" @click.native="showShareEdit(share)"></VIcon>
                </div>
            </li>
        </ul>
        <VDialogSimple :visible.sync="isShowDeleteConfirm" @confirm="deleteTheShare">
            <template v-slot:header>删除确认</template>
            <template v-slot:body>确定要删除本分享吗？</template>
        </VDialogSimple>
    </div>
</template>

<script>
    import {FETCH_SHARES, FETCH_SHARE_CATEGORIES, DELETE_SHARE} from '@/store/action-types';
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {
        SHARES_SET_PUBLISHER_VISIBLE,
        SHARES_SET_PUBLISHING_SHARE_ID,
        SHARES_SET_SHARE_CATEGORY_ID,
        SHARES_SET_TITLE,
        SHARES_SET_URL
    } from "@/store/mutation-types";

    const RE_URL = /^https?:\/\//;
    export default {
        data: () => ({
            isShowDeleteConfirm: false,
            deletingShareId: ''
        }),
        computed: {
            ...mapGetters(['categorizedShares'])
        },
        methods: {
            ...mapActions([FETCH_SHARES, FETCH_SHARE_CATEGORIES, DELETE_SHARE]),
            ...mapMutations([SHARES_SET_PUBLISHER_VISIBLE, SHARES_SET_SHARE_CATEGORY_ID,
                SHARES_SET_TITLE, SHARES_SET_URL, SHARES_SET_PUBLISHING_SHARE_ID]),
            openLink(url) {
                if (!RE_URL.test(url)) {
                    url = "http://" + url;
                }
                window.open(url);
            },
            showDeleteConfirm(shareId) {
                this.deletingShareId = shareId;
                this.isShowDeleteConfirm = true;
            },
            deleteTheShare() {
                if (!this.deletingShareId) {
                    console.error('Unexpected share id:', this.deletingShareId);
                    return;
                }
                this.isShowDeleteConfirm = false;
                this[DELETE_SHARE](this.deletingShareId)
                    .then(() => this.$showToast('删除成功'))
                    .catch(() => this.$showToast('删除失败'));
            },
            showShareEdit({id, share_category_id, title, url}) {
                this[SHARES_SET_PUBLISHING_SHARE_ID](id);
                this[SHARES_SET_SHARE_CATEGORY_ID](share_category_id);
                this[SHARES_SET_TITLE](title);
                this[SHARES_SET_URL](url);
                this[SHARES_SET_PUBLISHER_VISIBLE](true);
            }
        },
        created() {
            const promises = [this[FETCH_SHARE_CATEGORIES](), this[FETCH_SHARES]()];
            Promise.all(promises).catch(() => this.$showToast('加载分享失败'));
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .shares-list {

        &__specific-category-shares {
            > h3 {
                margin: 16px 0 4px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        &__link-container {
            margin-bottom: 4px;
            display: flex;
            align-items: center;

            .v-icon {
                padding: 4px;
                border-radius: 50%;
                fill: $text-color-secondary;

                @include sm("&:active", "&:hover") {
                    cursor: pointer;
                    fill: $text-color-primary-light;
                    background: $text-color-secondary-light2;
                }
            }
        }

        &__link {
            color: $text-color-primary-light;
            font-weight: normal;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 20px;
            margin-right: 4px;
            flex: 1;

            @include sm("&:active", "&:hover") {
                text-decoration: underline;
                cursor: pointer;
            }
        }

    }
</style>
