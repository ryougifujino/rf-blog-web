import axios from 'axios';
import {API_BASE_URL} from '@/common/constants';

const _ = axios.create({
    baseURL: API_BASE_URL
});

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

export function fetchShares(offset, limit) {
    return new Promise(resolve => {
        resolve([
            {
                title: "axios发送post请求，springMVC接收不到数据问题",
                link: "https://www.baidu.com",
                category: 'Web'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'Web'
            },
            {
                title: "标题1Q84",
                link: "https://www.baidu.com",
                category: 'Web'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'Web'
            },
            {
                title: "标题1Q84",
                link: "https://www.baidu.com",
                category: 'Web'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'Web'
            },
            {
                title: "标题1Q84",
                link: "https://www.baidu.com",
                category: 'Web'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'Web'
            },
            {
                title: "标题1Q84",
                link: "https://www.baidu.com",
                category: 'Web'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'Web'
            },
            {
                title: "标题1Q84",
                link: "https://www.baidu.com",
                category: 'Web'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'Web'
            },
            {
                title: "标题1Q84",
                link: "https://www.baidu.com",
                category: 'Web'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'DDD'
            },
            {
                title: "标题1Q84",
                link: "https://www.baidu.com",
                category: 'DDD'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'AAA'
            },
            {
                title: "标题1Q84",
                link: "https://www.baidu.com",
                category: 'WAAb'
            },
            {
                title: "Google 1Q84",
                link: "https://www.google.com",
                category: 'WAAb'
            },
        ]);
    });
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
