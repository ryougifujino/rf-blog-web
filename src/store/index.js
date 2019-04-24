import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from '@/store/actions';
import mutations from '@/store/mutations';
import home from '@/store/modules/home';
import archives from '@/store/modules/archives';
import shares from '@/store/modules/shares';
import postEdit from '@/store/modules/post-edit';
import post from '@/store/modules/post';

const state = {
    albums: [],
    posts: [],
    tags: [],
    isTagsDirty: true
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        home,
        archives,
        shares,
        postEdit,
        post
    }
});
