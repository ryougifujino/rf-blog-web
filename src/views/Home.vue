<template>
    <div>
        <HomePostPreview v-for="post of posts" :post="post"/>
    </div>
</template>

<script>
    import HomePostPreview from '@/components/HomePostPreview.vue';
    import {FETCH_POST_PREVIEWS} from '@/store/action-types';
    import {mapModuleState} from '@/util/mapStateUtils';

    export default {
        components: {
            HomePostPreview
        },
        computed: {
            ...mapModuleState('home', ['posts'])
        },
        async created() {
            await this.$store.dispatch(FETCH_POST_PREVIEWS, 1);
        }
    }
</script>

<style>

</style>