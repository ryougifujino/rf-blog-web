const CDN_MARKDOWN_IT = "https://cdn.jsdelivr.net/npm/markdown-it@8.4.2/dist/markdown-it.min.js";
export const JS = {
    '/': [
        CDN_MARKDOWN_IT
    ],
    '/post/:id': [
        CDN_MARKDOWN_IT
    ],
    ...mapLibs(['/post-edit', '/post-edit/:id'], [
        CDN_MARKDOWN_IT,
        "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-min-noconflict/ace.js"
    ])
};

const libSet = new Set();
export const attachLibs = async libs => {
    for (let lib of libs) {
        if (!libSet.has(lib)) {
            await attachLib(lib);
            libSet.add(lib);
        }
    }
};

function mapLibs(paths, libs) {
    const js = {};
    paths.forEach(path => js[path] = libs);
    return js;
}

function attachLib(lib) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = lib;
        document.body.appendChild(script);
        script.onload = resolve;
        script.onerror = reject;
    });
}
