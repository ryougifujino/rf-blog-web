<template>
    <div class="shares">
        <div v-if="isAuthenticated" class="shares__add-new" @click="showPublisher">新增分享</div>
        <SharesList></SharesList>
        <SharesPublisher></SharesPublisher>
    </div>
</template>

<script>
    import SharesList from "@/components/SharesList.vue";
    import SharesPublisher from "@/components/SharesPublisher.vue";
    import {mapModuleState} from "@/util/mapStateUtils";
    import {mapMutations} from "vuex";
    import {
        SHARES_SET_PUBLISHING_SHARE_ID,
        SHARES_RESET_PUBLISHER_STATE,
        SHARES_SET_PUBLISHER_VISIBLE
    } from "@/store/mutation-types";

    export default {
        components: {
            SharesList,
            SharesPublisher
        },
        computed: {
            ...mapModuleState('auth', ['isAuthenticated'])
        },
        methods: {
            ...mapMutations([SHARES_SET_PUBLISHER_VISIBLE, SHARES_RESET_PUBLISHER_STATE,
                SHARES_SET_PUBLISHING_SHARE_ID]),
            showPublisher() {
                this[SHARES_SET_PUBLISHER_VISIBLE](true);
                this[SHARES_RESET_PUBLISHER_STATE]();
                this[SHARES_SET_PUBLISHING_SHARE_ID]();
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";
    @import "~@/assets/styles/mixins";

    .shares {
        padding: 0 16px 16px;

        &__add-new {
            padding: 8px 16px;
            border-radius: 16px;
            border: 1px solid $color-background-dark;
            background: $color-background-dark;
            margin-top: 16px;
            text-align: center;

            @include sm("&:active", "&:hover") {
                cursor: pointer;
                user-select: none;
                border: 1px solid $text-color-secondary;
            }
        }
    }
</style>
