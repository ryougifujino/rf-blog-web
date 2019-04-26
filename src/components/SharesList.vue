<template>
    <ul class="shares-list">
        <li class="shares-list__specific-category-shares"
            v-for="specificCategoryShares of categorizedShares"
            :key="specificCategoryShares.category">
            <h3>{{specificCategoryShares.category}}</h3>
            <div class="shares-list__link-container"
                 v-for="share of specificCategoryShares.shares"
                 :key="share.id">
                <h4 class="shares-list__link" @click="openLink(share.url)">{{share.title}}</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
            </div>
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

        &__specific-category-shares {
            > h3 {
                margin: 16px 0 4px;
            }
        }

        &__link-container {
            margin-bottom: 4px;
            display: flex;
            align-items: center;

            > svg {
                padding: 4px;
                border-radius: 50%;
                width: 24px;
                height: 24px;
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
