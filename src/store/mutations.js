import {
    ADD_ALBUMS,
    ADD_POST_TITLES,
    ADD_TAGS
} from '@/store/mutation-types';

export default {
    [ADD_ALBUMS](state, {albums}) {
        state.albums.push(...albums);
    },
    [ADD_POST_TITLES](state, {posts}) {
        state.posts.push(...posts);
    },
    [ADD_TAGS](state, {tags}) {
        state.tags.push(...tags);
    }
};
