const FAKE_BODY =
    `博客（英语：Blog）是一种由个人管理、张贴新的文章、图片或影片的网站或在线日记，用来纪录、抒发情感或分享信息。
    博客上的文章通常根据张贴时间，以倒序方式由新到旧排列。

    许多博客作者专注评论特定的课题或新闻，其他则作为个人日记。一个典型的博客结合了文字、图像、其他博客或
    网站的超链接、及其它与主题相关的媒体。能够让读者以互动的方式留下意见，是许多博客的重要要素。大部分的
    博客内容以文字为主，也有一些博客专注艺术、摄影、视频、音乐、播客等各种主题。博客是社会媒体网络的一部
    分。`;

let index = 0;

function generatePost() {
    return {
        title: `博客${index++}`,
        body: FAKE_BODY
    }
}

export function fetchPostPreviews(pageNumber) {
    return new Promise((resolve, reject) => {
        let result = [];
        let limit = 10;
        while (limit--) {
            result.push(generatePost());
        }
        setTimeout(() => resolve(result), 1000);
    });
}