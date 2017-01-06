import * as config from '../../config'

const isProduction = process.argv[2] === '--production'

let scripts: string

if (isProduction) {
    scripts = `
        <script src='/${config.publicPath}/dll/library.6d8f1.dll.js'></script>
        <script src='/${config.publicPath}/bundle.6d29c.js'></script>
    `
} else {
    scripts = `
        <script src='/${config.publicPath}/dll/library.dll.js'></script>
        <script src='http://localhost:${config.localWebpackPort}/bundle.js'></script>
    `
}

export default `
<!DOCTYPE html>
<html lang="zh-cn">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible"
      content="IE=edge">
<meta name="format-detection"
      content="telephone=no">
<title>还没取名字</title>
<body>
<div id='react-dom'></div>
</body>
${scripts}
</html>
`