import axios from 'axios';
import {API_BASE_URL} from '@/common/constants';

const _ = axios.create({
    baseURL: API_BASE_URL
});

export function fetchPost(postId) {
    return _.get(`/posts/${postId}`);
}

export function fetchPostPreviews(offset, limit) {
    return _.get(`/posts?offset=${offset}&limit=${limit}`);
}

export function fetchPostTitles() {
    return _.get('/posts/titles');
}

export function fetchAlbums() {
    return _.get('/albums');
}

export function fetchTags() {
    return _.get('/tags');
}

export function fetchShares() {
    return _.get('shares');
}

export function fetchShareCategories() {
    return _.get('/share-categories');
}

export function fetchPostComments(postId, offset, limit) {
    return _.get(`/comments/${postId}?offset=${offset}&limit=${limit}`);
}

export function fetchToken() {
    return _.get('/token');
}

export function createAlbum(name) {
    return _.post('/albums', {album: {name}});
}

export function createPost(title, body, isPrivate, albumId, tagNames) {
    return _.post('/posts', {
        post: {
            title,
            body,
            is_private: isPrivate,
            album_id: albumId,
            tag_names: tagNames
        }
    });
}

export function createShare(title, url, shareCategoryId) {
    return _.post('/shares', {
        share: {
            title,
            url,
            share_category_id: shareCategoryId
        }
    });
}

export function createShareCategory(name) {
    return _.post('/share-categories', {share_category: {name}});
}

export function createPostComment(postId, content, fromUser) {
    return _.post('/comments', {
        comment: {
            post_id: postId,
            content,
            from_user: fromUser
        }
    });
}

export function createPostReply(commentId, content, fromUser) {
    return _.post('/replies', {
        reply: {
            comment_id: commentId,
            content,
            from_user: fromUser
        }
    });
}

export function createToken(credential) {
    return _.post('/token', {
        credential
    });
}

export function deletePost(postId) {
    return _.delete(`/posts/${postId}`);
}

export function deleteShare(shareId) {
    return _.delete(`/shares/${shareId}`);
}

export function deletePostReply(replyId) {
    return _.delete(`/replies/${replyId}`);
}

export function deletePostComment(commentId) {
    return _.delete(`/comments/${commentId}`);
}

export function deleteToken() {
    return _.delete('/token');
}

export function updatePost(postId, title, body, isPrivate, albumId, tagNames) {
    return _.patch(`/posts/${postId}`, {
        post: {
            title,
            body,
            is_private: isPrivate,
            album_id: albumId,
            tag_names: tagNames
        }
    });
}

export function updateShare(shareId, title, url, shareCategoryId) {
    return _.patch(`/shares/${shareId}`, {
        share: {
            title,
            url,
            share_category_id: shareCategoryId
        }
    });
}
