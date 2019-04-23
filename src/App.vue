<template>
    <div id="app" :class="appWidthClass">
        <header class="header-bar" v-if="headersSeen">
            <h1 class="header-bar__title">{{title}}
                <span class="header-bar__menu">
                    <img src="./assets/images/baseline-search-24px.svg" alt="Search">
                    <img src="./assets/images/baseline-create-24px.svg" alt="Edit"
                         @click="go('/post-edit')">
                    <img src="./assets/images/logo.png" alt="Logo">
                </span>
            </h1>

            <h3 class="header-bar__subtitle">the blog</h3>
        </header>
        <nav class="header-nav" v-if="headersSeen">
            <div class="header-nav__menu">
                <router-link to="/home" :class="checkedNavTabClass('/home')">主页</router-link>
                <router-link to="/archives" :class="checkedNavTabClass('/archives')">档案
                </router-link>
                <router-link to="/share" :class="checkedNavTabClass('/share')">分享</router-link>
                <router-link to="/about" :class="checkedNavTabClass('/about')">关于</router-link>
            </div>
            <hr>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    const MAIN_VIEW_PATHS = ['/home', '/archives', '/share', '/about'];
    export default {
        data() {
            return {
                currentNavTab: this.$route.path,
                windowWidth: window.innerWidth
            };
        },
        watch: {
            $route(to) {
                this.currentNavTab = to.path;
            }
        },
        computed: {
            checkedNavTabClass() {
                return path => ({"header-nav__item--checked": this.currentNavTab.includes(path)});
            },
            headersSeen() {
                return MAIN_VIEW_PATHS.some(path => this.currentNavTab.includes(path));
            },
            appWidthClass() {
                return ({'app--width-limited': this.headersSeen});
            },
            title() {
                return this.windowWidth <= 450 ? "rf" : "ryougifujino";
            }
        },
        methods: {
            go(location) {
                this.$router.push(location);
            }
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

    .app--width-limited {
        margin: 0 auto;
        max-width: 750px;
    }

    .header-bar {
        padding: 0 16px;
        margin: 32px 0 16px;

        &__title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0;
        }

        &__menu {
            display: inline-flex;
            align-items: center;

            > img {
                width: 24px;
                height: 24px;
                padding: 8px;
                margin-right: 8px;
                border-radius: 50%;

                @include sm("&:active", "&:hover") {
                    cursor: pointer;
                    background-color: $text-color-secondary-light2;
                }

                &:nth-of-type(3) {
                    width: 40px;
                    height: 40px;
                    padding: 0;
                }
            }
        }

        &__subtitle {
            color: $text-color-primary-light;
        }
    }

    .header-nav {
        padding: 0 16px;
        position: sticky;
        top: 0;

        &__menu {
            display: flex;
            justify-content: space-between;
            padding: 16px 0;

            > a {
                text-decoration: none;
                border-radius: 30px;
                padding: 8px 16px;
                color: $text-color-secondary;
                border: $color-accent 1px solid;
                white-space: nowrap;

                @include sm("&:active", "&:hover") {
                    cursor: pointer;
                    border: $text-color-secondary 1px solid;
                }
            }
        }

        &__item--checked {
            background-color: $text-color-secondary-light2;
            color: $text-color-primary;
        }
    }

</style>
