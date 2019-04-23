<template>
    <div class="v-load-more-bar">
        <VProgressBar class="v-load-more-bar__progress-bar"
                      transparent
                      colored
                      v-show="isLoading">
        </VProgressBar>
        <div class="v-load-more-bar__load-more-button"
             v-show="!isLoading"
             @click="$emit('click')">
            点击加载更多
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isLoading: {
                type: Boolean,
                require: true
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/mixins";

    .v-load-more-bar {

        text-align: center;
        $height: 70px;

        &__progress-bar {
            position: relative;
            height: $height;
        }

        &__load-more-button {
            line-height: $height;
            color: #2196f3;
            font-weight: bold;

            @include sm("&:active", "&:hover") {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
</style>
