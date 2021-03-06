import {
    ADD_ALBUMS,
    ADD_POST_TITLES,
    ADD_TAGS,
    REMOVE_POST,
    EMPTY_POST_TITLES
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
    },
    [EMPTY_POST_TITLES](state) {
        state.posts = [];
    },
    [REMOVE_POST]({posts}, postId) {
        postId = parseInt(postId);
        const index = posts.findIndex(post => post.id === postId);
        index !== -1 && posts.splice(index, 1);
    }
};
