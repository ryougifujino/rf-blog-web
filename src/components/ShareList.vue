<template>
    <ul>
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

    .share-list__item {
        > h3 {
            margin: 16px 0 4px;
            text-align: center;
        }

        > h4 {
            color: $text-color-primary-light;
            margin-bottom: 4px;
            font-weight: normal;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }

</style>
