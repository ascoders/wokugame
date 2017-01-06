import * as fs from 'fs'

function DllHashPlugin() {
}

function changeFileDll(path: string, hash: string) {
    let html = fs.readFileSync(path).toString()
    html = html.replace(/\/dll\/library\.([0-9a-zA-Z]){0,5}\.dll\.js/g, `/dll/library.${hash}.dll.js`)
    fs.writeFileSync(path, html)
}

DllHashPlugin.prototype.apply = function (compiler: any) {
    compiler.plugin('done', (stats: any) => {
        const hash = stats.hash.slice(0, 5)
        changeFileDll('src/client/html.ts', hash)
        changeFileDll('built/src/client/html.js', hash)
    })
}

export default DllHashPlugin as any