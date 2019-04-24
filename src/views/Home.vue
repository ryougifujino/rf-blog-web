<template>
    <div class="home" v-scroll-bottom:home="loadMore">
        <div v-for="post of posts" :key="post.id">
            <HomePostPreview :post="post"/>
            <hr>
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
    import {mapModuleState} from '@/util/mapStateUtils';
    import {mapActions} from 'vuex';

    export default {
        components: {
            HomePostPreview
        },
        computed: {
            ...mapModuleState('home', ['posts', 'isLoading', 'isShowLoadMoreBar', 'pageNumber'])
        },
        methods: {
            ...mapActions([FETCH_POST_PREVIEWS]),
            loadMore() {
                this[FETCH_POST_PREVIEWS]().catch(() => this.$showToast('加载失败'));
            }
        },
        created() {
            if (this.pageNumber === 1) {
                this.loadMore();
            }
        }
    }
</script>
