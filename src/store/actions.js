import {
    FETCH_ALBUMS,
    CREATE_ALBUM,
    FETCH_POST_TITLES,
    FETCH_TAGS
} from '@/store/action-types';
import {
    fetchAlbums,
    createAlbum,
    fetchPostTitles,
    fetchTags
} from "@/api";
import {
    ADD_ALBUMS,
    ADD_POST_TITLES,
    ADD_TAGS,
    EMPTY_POST_TITLES
} from "@/store/mutation-types";

export default {
    async [FETCH_ALBUMS]({state, commit}) {
        if (state.albums.length !== 0) {
            return;
        }
        const {data: {items: albums}} = await fetchAlbums();
        commit(ADD_ALBUMS, {albums});
    },
    async [CREATE_ALBUM]({state, commit}, {newAlbumName}) {
        const {data: newAlbum} = await createAlbum(newAlbumName);
        state.albums.unshift(newAlbum);
    },
    async [FETCH_POST_TITLES]({state, commit}) {
        if (!state.isPostsDirty || state.isPostsLoading) {
            return;
        }
        commit(EMPTY_POST_TITLES);
        state.isPostsLoading = true;
        try {
            const {data: {items: posts}} = await fetchPostTitles();
            commit(ADD_POST_TITLES, {posts});
            state.isPostsDirty = false;
        } finally {
            state.isPostsLoading = false;
        }
    },
    async [FETCH_TAGS]({state, commit}) {
        if (!state.isTagsDirty) {
            return;
        }
        state.tags = [];
        const {data: {items: tags}} = await fetchTags();
        commit(ADD_TAGS, {tags});
        state.isTagsDirty = false;
    }
};
