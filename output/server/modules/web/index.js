"use strict";
require('./models');
const require_controllers_1 = require('../../utils/require-controllers');
const path = require('path');
require_controllers_1.default(path.join(__dirname, 'controllers'));
