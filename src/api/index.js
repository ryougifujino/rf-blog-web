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

export function deletePost(postId) {
    return _.delete(`/posts/${postId}`);
}
