<template>
    <div class="home" v-scroll-bottom="loadMore">
        <div v-for="post of posts" :key="post.id">
            <HomePostPreview :post="post"/>
            <hr class="home__post-divider">
        </div>
        <VLoadMoreBar :is-loading="isLoading"
                      v-if="isShowLoadMoreBar"
                      @click="loadMore">
        </VLoadMoreBar>
    </div>
</template>

<script>
    import HomePostPreview from '@/components/HomePostPreview.vue';
    import {FETCH_POST_PREVIEWS} from '@/store/action-types';
    import {mapModuleState} from '@/util/map-state-utils';
    import {mapActions} from 'vuex';

    export default {
        components: {
            HomePostPreview
        },
        computed: {
            ...mapModuleState('home', ['posts', 'isLoading', 'isShowLoadMoreBar', 'pageNumber',
                'isPostsDirty'])
        },
        methods: {
            ...mapActions([FETCH_POST_PREVIEWS]),
            loadMore(forced) {
                this[FETCH_POST_PREVIEWS](forced).catch(() => this.$showToast('加载失败'));
            }
        },
        created() {
            if (this.pageNumber === 1 || this.isPostsDirty) {
                this.loadMore(true);
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/mixins";

    .home {
        @extend %width-limit;

        &__post-divider {
            margin: 0 16px;
        }
    }

</style>
