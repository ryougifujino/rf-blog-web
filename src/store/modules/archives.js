import {
    FETCH_POST_TITLES,
    FETCH_ALBUMS,
    FETCH_TAGS
} from '@/store/action-types';
import {
    ADD_POST_TITLES,
    ADD_ALBUMS,
    ADD_TAGS
} from '@/store/mutation-types';
import {
    fetchAlbums,
    fetchPostTitles,
    fetchTags
} from "@/api";

const state = {
    posts: [],
    albums: [],
    tags: []
};

const actions = {
    async [FETCH_POST_TITLES]({commit}, {offset, limit}) {
        let posts = await fetchPostTitles(offset, limit);
        commit(ADD_POST_TITLES, {posts});
    },
    async [FETCH_ALBUMS]({commit}, {offset, limit}) {
        let albums = await fetchAlbums(offset, limit);
        commit(ADD_ALBUMS, {albums});
    },
    async [FETCH_TAGS]({commit}, {offset, limit}) {
        let tags = await fetchTags(offset, limit);
        commit(ADD_TAGS, {tags});
    },

};

const mutations = {
    [ADD_POST_TITLES](state, {posts}) {
        state.posts.push(...posts);
    },
    [ADD_ALBUMS](state, {albums}) {
        state.albums.push(...albums);
    },
    [ADD_TAGS](state, {tags}) {
        state.tags.push(...tags);
    },
};

export default {
    state,
    actions,
    mutations
}