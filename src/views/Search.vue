<template>
    <div class="search">
        <div class="search__header">
            <div class="search__input-container">
                <VIcon name="baseline-search-24px"></VIcon>
                <input ref="input" v-model="searchKey" spellcheck="false" class="search__input">
            </div>
        </div>
        <div class="search__result">
            <div class="search__result-column" v-if="filteredPosts.length">
                <h2 class="search__result-title">博文</h2>
                <router-link class="search__result-post"
                             v-for="post of filteredPosts"
                             :key="post.id"
                             :to="'/post/' + post.id">{{post.title}}
                </router-link>
            </div>
            <div class="search__result-column" v-if="filteredShares.length">
                <h2 class="search__result-title">分享</h2>
                <a class="search__result-share"
                   v-for="share of filteredShares"
                   :key="share.id"
                   @click.prevent="openShareLink(share.url)">{{share.title}}
                </a>
            </div>
        </div>
        <VProgressBar v-if="isLoading" colored transparent></VProgressBar>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import {mapModuleState} from "@/util/mapStateUtils";
    import {FETCH_POST_TITLES, FETCH_SHARES} from "@/store/action-types";

    const RE_URL = /^https?:\/\//;
    const RESULT_LIMIT = 20;
    export default {
        data: () => ({
            searchKey: '',
            isLoading: true
        }),
        computed: {
            ...mapState(['posts']),
            ...mapModuleState('shares', ['shares']),
            searchKeyRE() {
                return new RegExp(this.searchKey.trim(), 'i');
            },
            filteredPosts() {
                return this.posts.filter(({title}) => this.searchKeyRE.test(title)).slice(0, RESULT_LIMIT);
            },
            filteredShares() {
                return this.shares.filter(({title}) => this.searchKeyRE.test(title)).slice(0, RESULT_LIMIT);
            }
        },
        methods: {
            ...mapActions([FETCH_POST_TITLES, FETCH_SHARES]),
            openShareLink(url) {
                if (!RE_URL.test(url)) {
                    url = "http://" + url;
                }
                window.open(url);
            }
        },
        created() {
            const escListener = (evt = window.event) => evt.keyCode === 27 && this.$router.back();
            document.addEventListener('keyup', escListener);
            this.$once('hook:beforeDestroy', () => document.removeEventListener('keyup', escListener));

            Promise.all([this[FETCH_POST_TITLES](), this[FETCH_SHARES]()])
                .catch(() => this.$showToast("加载结果失败"))
                .finally(() => this.isLoading = false);
        },
        mounted() {
            this.$refs.input.focus();
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/dimens";
    @import "~@/assets/styles/mixins";

    .search {
        &__header {
            height: $view-header-height;
            position: relative;
            margin: 0 16px;
        }

        &__input-container {
            @extend %center;
            max-width: 750px;
            width: 100%;
            height: 44px;
            background-color: $color-accent-dark;
            border-radius: 16px;
            display: flex;
            align-items: center;

            .v-icon {
                background-color: $color-accent-dark;
                margin-left: 8px;
            }
        }

        &__input {
            flex: 1;
            margin: 0 16px 0 8px;
            outline: none;
            border: none;
            line-height: 20px;
            background: $color-accent-dark;
        }

        &__result {
            display: flex;
            max-width: 850px;
            width: 100%;
            margin: 0 auto;

            a {
                @extend %word-break;
                display: block;
                text-align: center;
                font-size: 18px;
                padding: 4px;
                color: $text-color-primary-light;
                text-decoration: none;

                @include sm("&:active", "&:hover") {
                    cursor: pointer;
                    background-color: $color-accent-dark;
                    border-radius: 8px;
                }
            }

            &-title {
                margin-top: 8px;
                text-align: center;
                font-weight: normal;
            }

            &-column {
                flex: 1;
                margin: 8px;
            }

        }
    }
</style>
