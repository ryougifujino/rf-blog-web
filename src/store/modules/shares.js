import Vue from "vue";
import {
    FETCH_SHARES,
    FETCH_SHARE_CATEGORIES,
    CREATE_SHARE,
    CREATE_SHARE_CATEGORY
} from "@/store/action-types";
import {
    ADD_SHARE,
    ADD_SHARES,
    ADD_SHARE_CATEGORIES,
    SHARES_SET_SHARE_CATEGORY_ID,
    SHARES_SET_TITLE,
    SHARES_SET_URL,
    SHARES_RESET_STATE
} from "@/store/mutation-types";
import {
    fetchShares,
    fetchShareCategories,
    createShare,
    createShareCategory
} from "@/api";

const initialState = {
    shareCategoryId: null,
    title: '',
    url: '',
};

const state = {
    shares: [],
    shareCategories: [],
    ...initialState
};

const actions = {
    async [FETCH_SHARES]({state, commit}) {
        if (state.shares.length !== 0) {
            return;
        }
        const {data: {items: shares}} = await fetchShares();
        commit(ADD_SHARES, {shares});
    },
    async [FETCH_SHARE_CATEGORIES]({state, commit}) {
        if (state.shareCategories.length !== 0) {
            return;
        }
        const {data: {items: shareCategories}} = await fetchShareCategories();
        commit(ADD_SHARE_CATEGORIES, {shareCategories});
    },
    async [CREATE_SHARE]({commit, state: {shareCategoryId, title, url}}) {
        const {data: share} = await createShare(title, url, shareCategoryId);
        commit(ADD_SHARE, {share});
        commit(SHARES_RESET_STATE);
    },
    async [CREATE_SHARE_CATEGORY]({state, commit}, {newShareCategoryName}) {
        const {data: shareCategory} = await createShareCategory(newShareCategoryName);
        state.shareCategories.unshift(shareCategory);
    }
};

const mutations = {
    [ADD_SHARE](state, {share}) {
        state.shares.unshift(share);
    },
    [ADD_SHARES](state, {shares}) {
        state.shares.push(...shares);
    },
    [ADD_SHARE_CATEGORIES](state, {shareCategories}) {
        state.shareCategories.push(...shareCategories);
    },
    [SHARES_SET_SHARE_CATEGORY_ID](state, shareCategoryId) {
        state.shareCategoryId = shareCategoryId;
    },
    [SHARES_SET_TITLE](state, title) {
        state.title = title;
    },
    [SHARES_SET_URL](state, url) {
        state.url = url;
    },
    [SHARES_RESET_STATE](state) {
        Object.keys(initialState).forEach(key => {
            Vue.set(state, key, initialState[key]);
        });
    }
};

const getters = {
    categorizedShares({shares, shareCategories}) {
        const categoryMap = {};
        shareCategories.forEach(category => categoryMap[category.id] = category.name);

        const partialCategorizedShares = new Map();
        const sharesWithoutCategory = [];
        shares.forEach(share => {
            const categoryName = categoryMap[share.share_category_id];
            if (!categoryName) {
                sharesWithoutCategory.push(share);
            } else {
                const specificCategoryShares = partialCategorizedShares.get(categoryName);
                if (specificCategoryShares) {
                    specificCategoryShares.push(share);
                } else {
                    partialCategorizedShares.set(categoryName, [share]);
                }
            }
        });
        const categorizedShares = [];
        if (sharesWithoutCategory.length) {
            categorizedShares.push({category: '', shares: sharesWithoutCategory});
        }
        for (const [key, value] of partialCategorizedShares.entries()) {
            value.length && categorizedShares.push({category: key, shares: value});
        }
        return categorizedShares;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
