<template>
    <ul>
        <li class="share-item" v-for="share of shares">
            <h1 v-if="share.category">{{share.category}}</h1>
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

<style scoped>
    .share-item > h1 {
        margin: 16px 0 4px;
    }

    .share-item > h4 {
        color: #484848;
        margin-bottom: 4px;
    }

</style>