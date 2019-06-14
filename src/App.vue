<template>
    <div id="app">
        <header class="header-bar" v-if="headersSeen">
            <h1 class="header-bar__title">{{title}}
                <span class="header-bar__menu">
                    <VIcon name="baseline-search-24px" @click.native="go('/search')"></VIcon>
                    <VIcon v-if="isAuthenticated"
                           name="baseline-create-24px"
                           @click.native="go('/post-edit')">
                    </VIcon>
                    <img @click="executeAuthAction" src="/public/logo-128.png" alt="Logo">
                </span>
            </h1>
        </header>
        <nav class="header-nav" v-if="headersSeen">
            <div class="header-nav__menu">
                <router-link to="/" :class="checkedNavTabClass('/')">主页</router-link>
                <router-link to="/archives" :class="checkedNavTabClass('/archives')">档案
                </router-link>
                <router-link to="/share" :class="checkedNavTabClass('/share')">分享</router-link>
                <router-link to="/about" :class="checkedNavTabClass('/about')">关于</router-link>
            </div>
            <hr>
        </nav>
        <FadeTransition>
            <router-view></router-view>
        </FadeTransition>
        <AuthDialog :visible.sync="isShowAuthDialog"></AuthDialog>
    </div>
</template>

<script>
    import AuthDialog from '@/components/AuthDialog.vue';
    import FadeTransition from "@/components/FadeTransition.vue";
    import {CHECK_AUTH, LOG_OUT} from "@/store/action-types";
    import {mapActions} from "vuex";
    import {mapModuleState} from "@/util/mapStateUtils";

    const MAIN_VIEW_PATHS = new Set(['/', '/archives', '/share', '/about']);
    export default {
        components: {
            AuthDialog,
            FadeTransition
        },
        data() {
            return {
                currentNavTab: this.$route.path,
                windowWidth: window.innerWidth,
                isShowAuthDialog: false
            };
        },
        watch: {
            $route(to) {
                this.currentNavTab = to.path;
            }
        },
        computed: {
            ...mapModuleState('auth', ['isAuthenticated']),
            checkedNavTabClass() {
                return path => (["header-nav__item", {"header-nav__item--checked": this.currentNavTab === path}]);
            },
            headersSeen() {
                return MAIN_VIEW_PATHS.has(this.currentNavTab);
            },
            title() {
                return this.windowWidth <= 450 ? "RF" : "RF's Blog";
            }
        },
        methods: {
            ...mapActions([CHECK_AUTH, LOG_OUT]),
            go(location) {
                this.$router.push(location);
            },
            executeAuthAction() {
                if (!this.isAuthenticated) {
                    this.isShowAuthDialog = true;
                } else {
                    this[LOG_OUT]();
                }
            }
        },
        created() {
            this[CHECK_AUTH]();
        },
        mounted() {
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/base";
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .header-bar {
        @extend %width-limit;
        padding: 0 16px;
        margin: 32px auto 16px;

        &__title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0;
        }

        &__menu {
            display: inline-flex;
            align-items: center;

            > .v-icon {
                @extend %icon;
            }

            > img {
                @extend %icon;
                width: 40px;
                height: 40px;
                padding: 0;
            }
        }
    }

    .header-nav {
        @extend %width-limit;
        z-index: 10;
        padding: 0 16px;
        position: sticky;
        top: 0;

        &__menu {
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
        }

        &__item {
            text-decoration: none;
            border-radius: 30px;
            padding: 8px 16px;
            color: $text-color-secondary;
            font-weight: bold;
            font-size: 1.2em;
            white-space: nowrap;

            @include sm("&:active", "&:hover") {
                cursor: pointer;
            }
        }

        &__item--checked {
            color: $text-color-primary-light;
        }
    }

</style>
