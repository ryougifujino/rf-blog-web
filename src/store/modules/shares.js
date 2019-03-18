import Vue from "vue";
import {
    FETCH_SHARES
} from "@/store/action-types";
import {
    ADD_SHARES
} from "@/store/mutation-types";
import {
    fetchShares
} from "@/api";

const state = {
    shares: [],
    categories: {}
};

const actions = {
    async [FETCH_SHARES]({commit}, {offset, limit}) {
        let shares = await fetchShares(offset, limit);
        commit(ADD_SHARES, {shares});
    }
};

const mutations = {
    [ADD_SHARES](state, {shares}) {
        for (let i = 0; i < shares.length; i++) {
            let share = shares[i];
            if (!state.categories[share.category]) {
                state.categories[share.category] = true;
            } else {
                Vue.set(shares, i, {title: share.title, link: share.link});
            }
        }
        state.shares.push(...shares);
    }
};

export default {
    state,
    actions,
    mutations
};