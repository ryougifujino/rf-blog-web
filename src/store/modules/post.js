import {
    FETCH_POST,
    FETCH_POST_COMMENTS,
    DELETE_POST,
    DELETE_POST_REPLY,
    DELETE_POST_COMMENT,
    CREATE_POST_COMMENT,
    CREATE_POST_REPLY
} from '@/store/action-types';
import {
    POST_SET,
    POST_RESET_STATE,
    REMOVE_POST
} from '@/store/mutation-types';
import {
    fetchPost,
    fetchPostComments,
    deletePost,
    deletePostReply,
    deletePostComment,
    createPostComment,
    createPostReply
} from "@/api";

const COMMENTS_LIMIT = 10;
const initialState = {
    title: '',
    body: '',
    isPrivate: null,
    album: null,
    createdOn: null,
    tags: [],
    isLoading: true,

    // comments
    comments: [],
    commentIdSet: new Set(),
    commentPageNumber: 1,
    reachedEnd: false,
    isLoadingComments: false,
    isShowLoadMoreBar: true
};

const state = {...initialState};

const actions = {
    async [FETCH_POST]({state, commit}, {postId}) {
        commit(POST_RESET_STATE);
        try {
            const {data: post} = await fetchPost(postId);
            commit(POST_SET, {post});
        } finally {
            state.isLoading = false;
        }

    },
    async [FETCH_POST_COMMENTS]({state, commit}, postId) {
        if (state.isLoadingComments) {
            return;
        }
        if (state.reachedEnd) {
            return;
        }

        const offset = (state.commentPageNumber - 1) * COMMENTS_LIMIT;
        try {
            state.isLoadingComments = true;
            const {data: {items: comments}} = await fetchPostComments(postId, offset, COMMENTS_LIMIT);
            state.commentPageNumber++;
            if (comments.length < COMMENTS_LIMIT) {
                state.reachedEnd = true;
                state.isShowLoadMoreBar = false;
            }
            const filteredComments = comments.filter(({id}) => !state.commentIdSet.has(id));
            filteredComments.forEach(({id}) => state.commentIdSet.add(id));
            state.comments.push(...filteredComments);
        } finally {
            state.isLoadingComments = false;
        }
    },
    async [DELETE_POST]({commit, rootState}, postId) {
        await deletePost(postId);
        commit(REMOVE_POST, postId);
        rootState.home.isPostsDirty = true;
        rootState.isPostsDirty = true;
    },
    async [DELETE_POST_REPLY]({state}, {commentId, replyId}) {
        await deletePostReply(replyId);
        const comment = state.comments.find(comment => comment.id === commentId);
        if (comment) {
            const deletingReplyIndex = comment.replies.findIndex(({id}) => id === replyId);
            if (deletingReplyIndex !== -1) {
                comment.replies.splice(deletingReplyIndex, 1);
            }
        }
    },
    async [DELETE_POST_COMMENT]({state}, commentId) {
        await deletePostComment(commentId);
        const deletingCommentIndex = state.comments.findIndex(({id}) => id === commentId);
        if (deletingCommentIndex !== -1) {
            state.comments.splice(deletingCommentIndex, 1);
            state.commentIdSet.delete(commentId)
        }
    },
    async [CREATE_POST_COMMENT]({state}, {postId, content, fromUser}) {
        const {data: comment} = await createPostComment(postId, content, fromUser);
        comment.replies = [];
        state.commentIdSet.add(comment.id);
        state.comments.unshift(comment);
    },
    async [CREATE_POST_REPLY]({state: {comments}}, {commentId, content, fromUser}) {
        const {data: reply} = await createPostReply(commentId, content, fromUser);
        const comment = comments.find(({id}) => id === commentId);
        if (!comment) {
            throw new Error('Can not find comment!');
        }
        comment.replies.push(reply);
    }
};

const mutations = {
    [POST_SET](state, {post: {title, body, is_private, album, created_on, tags} = {}}) {
        state.title = title;
        state.body = body;
        state.isPrivate = is_private;
        state.album = album;
        state.createdOn = created_on;
        state.tags = tags;
    },
    [POST_RESET_STATE](state) {
        Object.keys(state).forEach(key => {
            const value = state[key];
            if (Array.isArray(value)) {
                state[key] = [];
            } else if (value instanceof Set) {
                state[key] = new Set();
            } else {
                state[key] = initialState[key];
            }
        });
    }
};

export default {
    state,
    actions,
    mutations
};
