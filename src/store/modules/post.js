import {
    FETCH_POST,
    FETCH_POST_COMMENTS,
    DELETE_POST,
    CREATE_POST_COMMENT
} from '@/store/action-types';
import {
    POST_SET,
    POST_RESET_STATE,
    REMOVE_POST
} from '@/store/mutation-types';
import {
    fetchPost,
    fetchPostComments,
    deletePost,
    createPostComment
} from "@/api";

const COMMENTS_LIMIT = 5;
const initialState = {
    title: '',
    body: '',
    isPrivate: null,
    album: null,
    createdOn: null,
    tags: [],
    isLoading: true,
    comments: [],
    commentIdSet: new Set(),
    commentPageNumber: 1
};

const state = {...initialState};

const actions = {
    async [FETCH_POST]({state, commit}, {postId}) {
        commit(POST_RESET_STATE);
        try {
            const {data: post} = await fetchPost(postId);
            commit(POST_SET, {post});
        } finally {
            state.isLoading = false;
        }

    },
    async [DELETE_POST]({commit, rootState}, postId) {
        await deletePost(postId);
        commit(REMOVE_POST, postId);
        rootState.home.isPostsDirty = true;
        rootState.isPostsDirty = true;
    },
    async [FETCH_POST_COMMENTS]({state, commit}, postId) {
        const offset = (state.commentPageNumber - 1) * COMMENTS_LIMIT;
        const {data: {items: comments}} = await fetchPostComments(postId, offset, COMMENTS_LIMIT);
        const filteredComments = comments.filter(({id}) => !state.commentIdSet.has(id));
        filteredComments.forEach(({id}) => state.commentIdSet.add(id));
        state.comments.push(...filteredComments);
    },
    async [CREATE_POST_COMMENT]({state}, {postId, content, fromUser}) {
        const {data: comment} = await createPostComment(postId, content, fromUser);
        state.comments.unshift(comment);
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
            if (Array.isArray(value)) {
                state[key] = [];
            } else if (value instanceof Set) {
                state[key] = new Set();
            } else {
                state[key] = initialState[key];
            }
        });
    }
};

export default {
    state,
    actions,
    mutations
};
