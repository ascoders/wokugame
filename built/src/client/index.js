"use strict";
const ReactDOM = require("react-dom");
const routes_1 = require("./routes");
const index_1 = require("../../frame/index");
const application_1 = require("../models/application");
require("../../components/css-reset/index.css");
require("../../components/css-beautify/index.css");
const app = new index_1.default();
app.use();
app.router(routes_1.default);
app.model(application_1.default);
ReactDOM.render(app.render(), document.getElementById('react-dom'));
//# sourceMappingURL=index.js.map