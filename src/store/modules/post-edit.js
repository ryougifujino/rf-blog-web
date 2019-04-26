import Vue from 'vue';
import {
    PUBLISH_POST,
    POST_EDIT_INITIALIZE
} from '@/store/action-types';
import {
    POST_EDIT_SET,
    POST_EDIT_SET_TITLE,
    POST_EDIT_SET_BODY,
    POST_EDIT_SET_IS_PRIVATE,
    POST_EDIT_SET_ALBUM_ID,
    POST_EDIT_ADD_TAG,
    POST_EDIT_REMOVE_TAG,
    POST_EDIT_RESET_STATE
} from '@/store/mutation-types';
import {
    fetchPost,
    createPost,
    updatePost
} from "@/api";
import {difference} from "@/util/set-utils";

const initialState = {
    title: '',
    body: '',
    isPrivate: false,
    albumId: null,
    tagSetChangeTracker: 1,
    tagSet: new Set(),
    isPostLoading: false
};

const state = {...initialState};

const actions = {
    async [PUBLISH_POST]({commit, state: {title, body, isPrivate, albumId, tagSet}, rootState}, postId) {
        if (postId) {
            await updatePost(postId, title, body, isPrivate, albumId, Array.from(tagSet));
            rootState.isPostsDirty = true;
            rootState.home.isPostsDirty = true;
        } else {
            const {data: post} = await createPost(title, body, isPrivate, albumId, Array.from(tagSet));
            if (difference(tagSet, rootState.tags.map(tag => tag.name)).size) {
                rootState.isTagsDirty = true;
            }
            rootState.home.posts.unshift(post);
            const postCopy = Object.create(post);
            delete postCopy.body;
            rootState.posts.unshift(postCopy);
            commit(POST_EDIT_RESET_STATE);
        }
    },
    async [POST_EDIT_INITIALIZE]({state, commit}, postId) {
        commit(POST_EDIT_RESET_STATE);
        if (!postId) {
            return;
        }
        state.isPostLoading = true;
        try {
            const {data: post} = await fetchPost(postId);
            commit(POST_EDIT_SET, {post});
        } finally {
            state.isPostLoading = false;
        }

    }
};

const mutations = {
    [POST_EDIT_SET](state, {post}) {
        state.title = post.title;
        state.body = post.body;
        state.isPrivate = post.is_private;
        state.albumId = post.album ? post.album.id : null;
        post.tags.forEach(tag => state.tagSet.add(tag.name));
        state.tagSetChangeTracker++;
    },
    [POST_EDIT_SET_TITLE](state, title) {
        state.title = title;
    },
    [POST_EDIT_SET_BODY](state, body) {
        state.body = body;
    },
    [POST_EDIT_SET_IS_PRIVATE](state, isPrivate) {
        state.isPrivate = isPrivate;
    },
    [POST_EDIT_SET_ALBUM_ID](state, albumId) {
        state.albumId = albumId;
    },
    [POST_EDIT_ADD_TAG](state, tag) {
        if (!state.tagSet.has(tag)) {
            state.tagSet.add(tag);
            state.tagSetChangeTracker++;
        }
    },
    [POST_EDIT_REMOVE_TAG](state, tag) {
        state.tagSet.delete(tag);
        state.tagSetChangeTracker++;
    },
    [POST_EDIT_RESET_STATE](state) {
        Object.keys(initialState).forEach(key => {
            const value = initialState[key];
            Vue.set(state, key, value instanceof Set ? new Set() : value);
        });
    }
};

export default {
    state,
    actions,
    mutations
}
