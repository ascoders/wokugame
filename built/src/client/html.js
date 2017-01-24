"use strict";
const config = require("../../config");
let scripts;
let links;
if (process.env.NODE_ENV === 'production') {
    scripts = `
        <script src='/${config.publicPath}/dll/library.6d8f1.dll.js'></script>
        <script src='/${config.publicPath}/bundle.c33c9.js'></script>
    `;
    links = `
        <link rel="stylesheet" type="text/css" href="/${config.publicPath}/styles/main.5vpzf.css">
    `;
}
else {
    scripts = `
        <script src='/${config.publicPath}/dll/library.dll.js'></script>
        <script src='http://localhost:${config.localWebpackPort}/bundle.js'></script>
    `;
    links = '';
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
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
`;
//# sourceMappingURL=html.js.map