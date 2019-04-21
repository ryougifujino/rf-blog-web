<template>
    <ul class="share-list">
        <li class="share-list__add-new">新增分享</li>
        <li class="share-list__item" v-for="share of shares">
            <h3 v-if="share.category">{{share.category}}</h3>
            <h4>{{share.title}}</h4>
        </li>
    </ul>
</template>

<script>
    import {FETCH_SHARES} from '@/store/action-types';
    import {mapModuleState} from '@/util/mapStateUtils';

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapModuleState('shares', ['shares'])
        },
        async created() {
            await this.$store.dispatch(FETCH_SHARES, {offset: 0, limit: 20});
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/theme";

    .share-list {
        text-align: center;

        &__add-new {
            padding: 8px 16px;
            border-radius: 16px;
            border: 1px solid $color-accent-dark;
            background: $color-accent-dark;
            margin-top: 16px;

            &:hover {
                cursor: pointer;
                user-select: none;
                border: 1px solid $text-color-secondary;
            }
        }

        &__item {
            > h3 {
                margin: 16px 0 4px;
            }

            > h4 {
                color: $text-color-primary-light;
                margin-bottom: 4px;
                font-weight: normal;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                &:hover {
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
    }


</style>
