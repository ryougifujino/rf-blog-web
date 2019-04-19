import {} from '@/store/action-types';
import {
    ARCHIVES_CHECK_ALBUM,
    ARCHIVES_CHECK_TAG
} from '@/store/mutation-types';
import {} from "@/api";

const initialState = {
    checkedAlbumId: null,
    checkedTagId: null
};

const state = {...initialState};

const actions = {};

const mutations = {
    [ARCHIVES_CHECK_ALBUM](state, checkedId) {
        state.checkedAlbumId = checkedId === state.checkedAlbumId ? null : checkedId;
    },
    [ARCHIVES_CHECK_TAG](state, checkedId) {
        state.checkedTagId = checkedId === state.checkedTagId ? null : checkedId;
    }
};

const getters = {
    filteredPosts({checkedAlbumId, checkedTagId}, getters, {posts}) {
        if (checkedAlbumId !== null) {
            posts = posts.filter(({album_id}) => album_id === checkedAlbumId);
        }
        if (checkedTagId !== null) {
            posts = posts.filter(({tags}) => tags.some(tag => tag.id === checkedTagId));
        }
        return posts;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
