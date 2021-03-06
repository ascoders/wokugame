import * as config from '../../config'

let scripts: string
let links: string

if (process.env.NODE_ENV === 'production') {
    scripts = `
        <script src='/${config.publicPath}/dll/library.f2191.dll.js'></script>
        <script src='/${config.publicPath}/bundle.a91db.js'></script>
    `
    links = `
        <link rel="stylesheet" type="text/css" href="/${config.publicPath}/styles/main.zvuad.css">
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
<title>我酷科技</title>
<body>
<div id='react-dom'></div>
</body>
${scripts}
</html>
`