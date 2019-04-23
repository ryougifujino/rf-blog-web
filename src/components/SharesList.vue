<template>
    <ul class="shares-list">
        <li class="shares-list__specific-category-shares"
            v-for="specificCategoryShares of categorizedShares"
            :key="specificCategoryShares.category">
            <h3>{{specificCategoryShares.category}}</h3>
            <h4 v-for="share of specificCategoryShares.shares"
                :key="share.id"
                @click="openLink(share.url)">{{share.title}}
            </h4>
        </li>
    </ul>
</template>

<script>
    import {FETCH_SHARES, FETCH_SHARE_CATEGORIES} from '@/store/action-types';
    import {mapActions, mapGetters} from "vuex";

    const RE_URL = /^https?:\/\//;
    export default {
        computed: {
            ...mapGetters(['categorizedShares'])
        },
        methods: {
            ...mapActions([FETCH_SHARES, FETCH_SHARE_CATEGORIES]),
            openLink(url) {
                if (!RE_URL.test(url)) {
                    url = "http://" + url;
                }
                window.open(url);
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
        text-align: center;

        &__specific-category-shares {
            > h3 {
                margin: 16px 0 4px;
            }

            > h4 {
                color: $text-color-primary-light;
                margin-bottom: 4px;
                font-weight: normal;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                line-height: 20px;

                @include sm("&:active", "&:hover") {
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
    }
</style>
