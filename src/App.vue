<template>
    <div id="app">
        <header class="horizontal-padding">
            <h1 class="header-title">ryougifujino
                <span>
                    <img src="./assets/images/baseline-search-24px.svg" alt="Search">
                    <img src="./assets/images/baseline-create-24px.svg" alt="Create">
                    <img src="./assets/images/logo.png" alt="Logo">
                </span>
            </h1>

            <h3 class="header-subtitle">the blog</h3>
        </header>
        <nav class="horizontal-padding">
            <div>
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
    export default {
        data() {
            return {
                currentNavTab: this.$route.path
            };
        },
        watch: {
            $route(to) {
                this.currentNavTab = to.path;
            }
        },
        computed: {
            checkedNavTabClass() {
                return path => ({"nav-tab-checked": this.currentNavTab.includes(path)});
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/base";
    @import "~@/assets/styles/theme";

    #app {
        margin: 0 auto;
        max-width: 750px;
    }

    header {
        margin: 32px 0 16px;
    }

    .header-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0;
    }

    .header-title > span {
        display: inline-flex;
        align-items: center;
    }

    .header-title img {
        width: 24px;
        height: 24px;
        padding: 8px;
        margin-right: 8px;
        border-radius: 50%;
    }

    .header-title img:hover {
        cursor: pointer;
        background-color: $text-color-secondary-light2;
    }

    .header-title img:nth-of-type(3) {
        width: 40px;
        height: 40px;
        padding: 0;
    }

    .header-subtitle {
        color: $text-color-primary-light;
    }

    .app-nav {

    }

    nav {
        position: sticky;
        top: 0;
    }

    nav div {
        display: flex;
        justify-content: space-between;
        padding: 16px 0;
    }

    nav div a {
        text-decoration: none;
        border-radius: 30px;
        padding: 8px 16px;
        color: $text-color-secondary;
        border: $color-accent 1px solid;
        white-space: nowrap;
    }

    .nav-tab-checked {
        background-color: $text-color-secondary-light2;
        color: $text-color-primary;
    }

    nav div a:hover {
        cursor: pointer;
        border: $text-color-secondary 1px solid;
    }

    hr {
        display: block;
        border: 0;
        border-top: 1px solid $color-accent-dark;
    }

    .horizontal-padding {
        padding: 0 16px;
    }

    .title-text {
        color: $text-color-primary;
    }

    .body-text {
        color: $text-color-primary-light;
        font-size: 18px;
    }

</style>