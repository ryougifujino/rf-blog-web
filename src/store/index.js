import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from '@/store/actions';
import mutations from '@/store/mutations';
import home from '@/store/modules/home';

const state = {

};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        home
    }
});