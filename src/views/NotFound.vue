<template>
    <div class="not-found">
        <img class="not-found__illustration"
             src="~@/assets/images/404_page_not_found_1.svg"
             @click="$router.replace({path: '/'})">
    </div>
</template>

<style lang="scss">
    @import "~@/assets/styles/mixins";

    .not-found {

        height: 100vh;

        &__illustration {
            width: 250px;
            @extend %center;
            top: 40%;
            cursor: pointer;
        }

    }
</style>
