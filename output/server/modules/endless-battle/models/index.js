"use strict";
const connect_1 = require('./connect');
require('./member/schema');
connect_1.default.sync();
