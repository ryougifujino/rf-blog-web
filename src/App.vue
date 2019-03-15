<template>
    <div id="app">
        <header>
            <h1>ryougifujino
                <span>
                    <img src="./assets/images/baseline-search-24px.svg" alt="Search">
                    <img src="./assets/images/baseline-create-24px.svg" alt="Create">
                    <img src="./assets/logo.jpeg" alt="Logo">
                </span>
            </h1>

            <h3>life blog</h3>
        </header>
        <nav>
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

<style>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        margin-left: calc(100vw - 100%);
    }

    #app {
        margin: 0 auto;
        max-width: 700px;
        width: 90%;
    }

    header {
        margin: 32px 0 16px;
    }

    header h1 {
        font-size: 2.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    header h1 span {
        display: inline-flex;
        align-items: center;
    }

    header h1 img:nth-of-type(n) {
        width: 24px;
        height: 24px;
        padding: 8px;
        margin-right: 8px;
        border-radius: 50%;
    }

    header h1 img:nth-of-type(n):hover {
        cursor: pointer;
        background-color: #e0e0e0;
    }

    header h1 img:nth-of-type(3) {
        width: 40px;
        height: 40px;
        padding: 0;
    }

    header h3 {
        color: #484848;
    }

    nav {
        position: sticky;
        top: 0;
        background-color: white;
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
        color: #6d6d6d;
        border: white 1px solid;
        white-space: nowrap;
    }

    .nav-tab-checked {
        background-color: #e0e0e0;
        color: black;
    }

    nav div a:hover {
        cursor: pointer;
        border: #6d6d6d 1px solid;
    }

    hr {
        display: block;
        border: 0;
        border-top: 1px solid #f5f5f5;
    }
</style>