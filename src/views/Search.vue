<template>
    <div class="search">
        <div class="search__header">
            <div class="search__input-container">
                <VIcon name="baseline-search-24px"></VIcon>
                <input spellcheck="false" class="search__input">
            </div>
        </div>
        <div class="search__result">
            <div class="search__result-column">
                <h2 class="search__result-title">博文</h2>
                <a class="search__result-post"></a>
            </div>
            <div class="search__result-column">
                <h2 class="search__result-title">分享</h2>
                <a class="search__result-share"></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            const escListener = (evt = window.event) => evt.keyCode === 27 && this.$router.back();
            document.addEventListener('keyup', escListener);
            this.$once('hook:beforeDestroy', () => document.removeEventListener('keyup', escListener));
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
