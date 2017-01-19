import * as config from '../../config'

const isProduction = process.argv[2] === '--production'

let scripts: string
let links: string

if (isProduction) {
    scripts = `
        <script src='/${config.publicPath}/dll/library.6d8f1.dll.js'></script>
        <script src='/${config.publicPath}/bundle.a4c85.js'></script>
    `
    links = `
        <link rel="stylesheet" type="text/css" href="/${config.publicPath}/styles/main.galsn.css">
    `
} else {
    scripts = `
        <script src='/${config.publicPath}/dll/library.dll.js'></script>
        <script src='http://localhost:${config.localWebpackPort}/bundle.js'></script>
    `
    links = ''
}

export default `
<!DOCTYPE html>
<html lang="zh-cn">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible"
      content="IE=edge">
<meta name="format-detection"
      content="telephone=no">
${links}
<title>还没取名字</title>
<body>
<div id='react-dom'></div>
</body>
${scripts}
</html>
`