import {
    FETCH_POST_PREVIEWS
} from '@/store/action-types';
import {
    ADD_POST_PREVIEWS, HOME_RESET_STATE,
    REMOVE_POST
} from '@/store/mutation-types';
import {
    fetchPostPreviews
} from "@/api";

const LIMIT = 5;

const initialState = {
    posts: [],
    isPostsDirty: true,
    postIdSet: new Set(),
    pageNumber: 1,
    reachedEnd: false,
    isLoading: false,
    isShowLoadMoreBar: true

};

const state = {...initialState};

const actions = {
    async [FETCH_POST_PREVIEWS]({state, commit}, forced) {
        if (state.isLoading) {
            return;
        }
        if (state.reachedEnd && !forced) {
            return;
        }
        if (state.isPostsDirty) {
            commit(HOME_RESET_STATE);
        }

        state.isLoading = true;
        const offset = (state.pageNumber - 1) * LIMIT;
        try {
            const {data: {items: posts}} = await fetchPostPreviews(offset, LIMIT);
            state.pageNumber++;
            if (posts.length < LIMIT) {
                state.isShowLoadMoreBar = false;
                state.reachedEnd = true;
            }
            commit(ADD_POST_PREVIEWS, {posts});
            state.isPostsDirty = false;
        } finally {
            state.isLoading = false;
        }
    }
};

const mutations = {
    [ADD_POST_PREVIEWS](state, {posts}) {
        state.posts.push(...posts.filter(post => !state.postIdSet.has(post.id)));
        posts.forEach(({id}) => state.postIdSet.add(id));
    },
    [REMOVE_POST]({posts}, postId) {
        postId = parseInt(postId);
        const index = posts.findIndex(post => post.id === postId);
        index !== -1 && posts.splice(index, 1);
    },
    [HOME_RESET_STATE](state) {
        Object.keys(initialState).forEach(key => {
            let value = initialState[key];
            if (Array.isArray(value)) {
                value = [];
            } else if (value instanceof Set) {
                value = new Set();
            }
            state[key] = value;
        });
    }
};

export default {
    state,
    actions,
    mutations
}
