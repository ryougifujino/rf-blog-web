import {
    FETCH_POST_PREVIEWS
} from '@/store/action-types';
import {
    ADD_POST_PREVIEWS,
    HOME_RESET_STATE
} from '@/store/mutation-types';
import {
    fetchPostPreviews
} from "@/api";
import Vue from "vue";

const LIMIT = 5;

const initialState = {
    posts: [],
    isLoading: false,
    isShowLoadMoreBar: true
};

const state = {...initialState};

const actions = {
    async [FETCH_POST_PREVIEWS]({state, commit}, pageNumber) {
        if (state.isLoading) {
            return;
        }
        state.isLoading = true;
        if (pageNumber === 1) {
            commit(HOME_RESET_STATE);
        }
        const offset = (pageNumber - 1) * LIMIT;
        const {data: {items: posts}} = await fetchPostPreviews(offset, LIMIT);
        if (posts.length < LIMIT) {
            state.isShowLoadMoreBar = false;
        }
        commit(ADD_POST_PREVIEWS, {posts});
        state.isLoading = false;
    }
};

const mutations = {
    [ADD_POST_PREVIEWS](state, {posts}) {
        state.posts.push(...posts);
    },
    [HOME_RESET_STATE](state) {
        Object.keys(state).forEach(key => {
            const value = initialState[key];
            Vue.set(state, key, Array.isArray(value) ? [] : value);
        });
    }
};

export default {
    state,
    actions,
    mutations
}
