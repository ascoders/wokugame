import * as fs from 'fs'

function BundleHashPlugin() {
}

function changeFileBundle(path: string, hash: string) {
    let html = fs.readFileSync(path).toString()
    html = html.replace(/\/bundle\.([0-9a-zA-Z]){0,5}\.js/g, `/bundle.${hash}.js`)
    fs.writeFileSync(path, html)
}

BundleHashPlugin.prototype.apply = function (compiler: any) {
    compiler.plugin('done', (stats: any) => {
        const hash = stats.hash.slice(0, 5)
        changeFileBundle('src/client/html.ts', hash)
        changeFileBundle('built/src/client/html.js', hash)
    })
}

export default BundleHashPlugin as any