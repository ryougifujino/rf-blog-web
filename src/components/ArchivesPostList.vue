<template>
    <div>
        <ul>
            <li class="post-list__item" v-for="post of posts"><h3>{{post.title}}</h3></li>
        </ul>
    </div>
</template>

<script>
    import {mapModuleState} from '@/util/mapStateUtils';
    import {FETCH_POST_TITLES} from '@/store/action-types';


    export default {
        computed: {
            ...mapModuleState('archives', ['posts'])
        },
        async created() {
            await this.$store.dispatch(FETCH_POST_TITLES, {offset: 0, limit: 20})
        }
    }
</script>

<style lang="scss">

    .post-list {
        &__item {
            margin-bottom: 8px;
            cursor: pointer;
        }
    }

</style>