<template>
    <div class="home" v-scroll-bottom:home="loadMore">
        <template v-for="post of posts">
            <HomePostPreview :post="post"/>
            <hr>
        </template>
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
        data: () => ({
            pageNumber: 1,
        }),
        computed: {
            ...mapModuleState('home', ['posts', 'isLoading', 'isShowLoadMoreBar'])
        },
        methods: {
            ...mapActions([FETCH_POST_PREVIEWS]),
            loadMore() {
                this[FETCH_POST_PREVIEWS](this.pageNumber)
                    .then(() => this.pageNumber++)
                    .catch(() => this.$showToast('加载失败'));
            }
        },
        created() {
            this.loadMore();
        }
    }
</script>
