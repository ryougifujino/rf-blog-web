import axios from 'axios';
import {API_BASE_URL} from '@/common/constants';

const _ = axios.create({
    baseURL: API_BASE_URL
});

function generatePostTitle() {
    return {
        title: `博客${Math.random()}`
    }
}

export function fetchPostPreviews(offset, limit) {
    return _.get(`/posts?offset=${offset}&limit=${limit}`);
}

export function fetchPostTitles(offset, limit) {
    return new Promise(resolve => {
        let result = [];
        while (limit--) {
            result.push(generatePostTitle());
        }
        resolve(result);
    });
}

export function fetchAlbums() {
    return _.get('/albums');
}

export function fetchTags(offset, limit) {
    return new Promise(resolve => {
        resolve([
            "Java", "编程", "C++", "有限元", "模板元编程", "DSL", "敏捷方法", "持续集成", "抽象语法树"
        ])
    })
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
