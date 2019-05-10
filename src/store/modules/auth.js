import {
    LOCAL_KEY_IS_AUTHENTICATED
} from '@/common/constants';

import {
    LOG_IN,
    LOG_OUT,
    CHECK_AUTH
} from '@/store/action-types';

import {
    SET_AUTH,
    REMOVE_AUTH
} from '@/store/mutation-types';

import {
    fetchToken,
    createToken,
    deleteToken
} from '@/api/index';

const state = {
    isAuthenticated: false
};

const actions = {
    async [LOG_IN]({commit}, credential) {
        await createToken(credential);
        commit(SET_AUTH);
    },
    async [LOG_OUT]({commit}) {
        await deleteToken();
        commit(REMOVE_AUTH);
    },
    [CHECK_AUTH]({commit}) {
        fetchToken()
            .then(() => commit(SET_AUTH))
            .catch(reason => {
                if (reason.response.status === 401) {
                    commit(REMOVE_AUTH);
                } else {
                    if (localStorage.getItem(LOCAL_KEY_IS_AUTHENTICATED) === 'true') {
                        commit(SET_AUTH);
                    } else {
                        commit(REMOVE_AUTH);
                    }
                }
            });
    }
};

const mutations = {
    [SET_AUTH](state) {
        state.isAuthenticated = true;
        localStorage.setItem(LOCAL_KEY_IS_AUTHENTICATED, String(true));
    },
    [REMOVE_AUTH](state) {
        state.isAuthenticated = false;
        localStorage.setItem(LOCAL_KEY_IS_AUTHENTICATED, String(false));
    }
};

export default {
    state,
    actions,
    mutations
}
