import {
    FETCH_POST
} from '@/store/action-types';
import {
    POST_SET,
    POST_RESET_STATE
} from '@/store/mutation-types';
import {
    fetchPost
} from "@/api";

const initialState = {
    title: '',
    body: '',
    isPrivate: null,
    album: null,
    createdOn: null,
    tags: [],
    isLoading: true
};

const state = {...initialState};

const actions = {
    async [FETCH_POST]({state, commit}, {postId}) {
        commit(POST_RESET_STATE);
        const {data: post} = await fetchPost(postId);
        commit(POST_SET, {post});
        state.isLoading = false;
    }
};

const mutations = {
    [POST_SET](state, {post: {title, body, is_private, album, created_on, tags} = {}}) {
        state.title = title;
        state.body = body;
        state.isPrivate = is_private;
        state.album = album;
        state.createdOn = created_on;
        state.tags = tags;
    },
    [POST_RESET_STATE](state) {
        Object.keys(state).forEach(key => {
            const value = state[key];
            state[key] = Array.isArray(value) ? [] : initialState[key];
        });
    }
};

export default {
    state,
    actions,
    mutations
};
