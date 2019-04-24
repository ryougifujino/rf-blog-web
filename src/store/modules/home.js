import {
    FETCH_POST_PREVIEWS
} from '@/store/action-types';
import {
    ADD_POST_PREVIEWS
} from '@/store/mutation-types';
import {
    fetchPostPreviews
} from "@/api";

const LIMIT = 5;

const state = {
    posts: [],
    postIdSet: new Set(),
    pageNumber: 1,
    reachedEnd: false,
    isLoading: false,
    isShowLoadMoreBar: true
};

const actions = {
    async [FETCH_POST_PREVIEWS]({state, commit}) {
        if (state.isLoading || state.reachedEnd) {
            return;
        }
        state.isLoading = true;
        const offset = (state.pageNumber - 1) * LIMIT;
        const {data: {items: posts}} = await fetchPostPreviews(offset, LIMIT);
        state.pageNumber++;
        if (posts.length < LIMIT) {
            state.isShowLoadMoreBar = false;
            state.reachedEnd = true;
        }
        commit(ADD_POST_PREVIEWS, {posts});
        state.isLoading = false;
    }
};

const mutations = {
    [ADD_POST_PREVIEWS](state, {posts}) {
        state.posts.push(...posts.filter(post => !state.postIdSet.has(post.id)));
        posts.forEach(({id}) => state.postIdSet.add(id));
    },
};

export default {
    state,
    actions,
    mutations
}
