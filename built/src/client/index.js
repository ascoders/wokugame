"use strict";
const ReactDOM = require("react-dom");
const routes_1 = require("./routes");
require("isomorphic-fetch");
const index_1 = require("../../frame/index");
const models_1 = require("./models");
require("../../components/css-reset/index.css");
require("../../components/css-beautify/index.css");
const app = new index_1.default();
app.use();
app.router(routes_1.default);
models_1.default.forEach(model => {
    app.model(model);
});
ReactDOM.render(app.render(), document.getElementById('react-dom'));
//# sourceMappingURL=index.js.map