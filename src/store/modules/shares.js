import Vue from "vue";
import {
    FETCH_SHARES,
    FETCH_SHARE_CATEGORIES,
    PUBLISH_SHARE,
    CREATE_SHARE_CATEGORY,
    DELETE_SHARE
} from "@/store/action-types";
import {
    ADD_SHARE,
    ADD_SHARES,
    ADD_SHARE_CATEGORIES,
    SHARES_SET_SHARE_CATEGORY_ID,
    SHARES_SET_TITLE,
    SHARES_SET_URL,
    SHARES_SET_PUBLISHER_VISIBLE,
    SHARES_SET_PUBLISHING_SHARE_ID,
    SHARES_RESET_PUBLISHER_STATE,
    REMOVE_SHARE, SHARES_UPDATE_SHARE
} from "@/store/mutation-types";
import {
    fetchShares,
    fetchShareCategories,
    createShare,
    createShareCategory,
    deleteShare,
    updateShare
} from "@/api";

const initialPublisherState = {
    shareCategoryId: null,
    title: '',
    url: '',
};

const state = {
    shares: [],
    shareCategories: [],
    isPublisherVisible: false,
    publishingShareId: '',
    ...initialPublisherState
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
    async [PUBLISH_SHARE]({commit, state: {shareCategoryId, title, url, publishingShareId}}) {
        if (!publishingShareId) {
            const {data: share} = await createShare(title, url, shareCategoryId);
            commit(ADD_SHARE, {share});
        } else {
            await updateShare(publishingShareId, title, url, shareCategoryId);
            commit(SHARES_UPDATE_SHARE, {shareId: publishingShareId, shareCategoryId, url, title});
        }
        commit(SHARES_RESET_PUBLISHER_STATE);
    },
    async [CREATE_SHARE_CATEGORY]({state, commit}, {newShareCategoryName}) {
        const {data: shareCategory} = await createShareCategory(newShareCategoryName);
        state.shareCategories.unshift(shareCategory);
    },
    async [DELETE_SHARE]({commit}, shareId) {
        await deleteShare(shareId);
        commit(REMOVE_SHARE, shareId);
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
    [SHARES_SET_PUBLISHER_VISIBLE](state, visible) {
        state.isPublisherVisible = visible;
    },
    [SHARES_SET_PUBLISHING_SHARE_ID](state, publishingShareId) {
        state.publishingShareId = publishingShareId ? publishingShareId : '';
    },
    [SHARES_UPDATE_SHARE]({shares}, {shareId, shareCategoryId, title, url}) {
        shareId = parseInt(shareId);
        const share = shares.find(share => share.id === shareId);
        if (share) {
            share.share_category_id = shareCategoryId;
            share.title = title;
            share.url = url;
        }
    },
    [SHARES_RESET_PUBLISHER_STATE](state) {
        Object.keys(initialPublisherState).forEach(key => {
            Vue.set(state, key, initialPublisherState[key]);
        });
    },
    [REMOVE_SHARE]({shares}, shareId) {
        shareId = parseInt(shareId);
        const index = shares.findIndex(share => share.id === shareId);
        index !== -1 && shares.splice(index, 1);
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
