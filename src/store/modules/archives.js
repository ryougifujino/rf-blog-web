import {
    FETCH_POST_TITLES,
    FETCH_TAGS
} from '@/store/action-types';
import {
    ADD_POST_TITLES,
    ADD_TAGS
} from '@/store/mutation-types';
import {
    fetchPostTitles,
    fetchTags
} from "@/api";

const state = {
    posts: [],
    tags: []
};

const actions = {
    async [FETCH_POST_TITLES]({commit}, {offset, limit}) {
        let posts = await fetchPostTitles(offset, limit);
        commit(ADD_POST_TITLES, {posts});
    },
    async [FETCH_TAGS]({commit}, {offset, limit}) {
        let tags = await fetchTags(offset, limit);
        commit(ADD_TAGS, {tags});
    }
};

const mutations = {
    [ADD_POST_TITLES](state, {posts}) {
        state.posts.push(...posts);
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
