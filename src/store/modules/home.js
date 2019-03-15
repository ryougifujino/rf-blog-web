import {
    FETCH_POST_PREVIEWS
} from '@/store/action-types';
import {
    ADD_POST_PREVIEWS
} from '@/store/mutation-types';
import {
    fetchPostPreviews
} from "@/api";

const state = {
    posts: []
};

const actions = {
    async [FETCH_POST_PREVIEWS]({commit}, pageNumber) {
        let posts = await fetchPostPreviews(pageNumber);
        commit(ADD_POST_PREVIEWS, {posts});
    }
};

const mutations = {
    [ADD_POST_PREVIEWS](state, {posts}) {
        state.posts.push(...posts);
    }
};

export default {
    state,
    actions,
    mutations
}