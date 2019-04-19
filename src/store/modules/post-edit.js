import Vue from 'vue';
import {
    CREATE_POST
} from '@/store/action-types';
import {
    POST_EDIT_SET_TITLE,
    POST_EDIT_SET_BODY,
    POST_EDIT_SET_IS_PRIVATE,
    POST_EDIT_SET_ALBUM_ID,
    POST_EDIT_ADD_TAG,
    POST_EDIT_REMOVE_TAG,
    POST_EDIT_RESET_STATE
} from '@/store/mutation-types';
import {
    createPost
} from "@/api";
import {difference} from "@/util/set-utils";

const initialState = {
    title: '',
    body: '',
    isPrivate: false,
    albumId: null,
    tagSetChangeTracker: 1,
    tagSet: new Set(),
};

const state = {...initialState};

const actions = {
    async [CREATE_POST]({commit, state: {title, body, isPrivate, albumId, tagSet}, rootState}) {
        await createPost(title, body, isPrivate, albumId, Array.from(tagSet));
        if (difference(tagSet, rootState.tags.map(tag => tag.name)).size) {
            rootState.isTagsDirty = true;
        }
        commit(POST_EDIT_RESET_STATE);
    }
};

const mutations = {
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
        Object.keys(state).forEach(key => {
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
