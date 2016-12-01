var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var Cookie = require('../lib/cookie');
var Filter = require('./filter');
var env    = require('./env');

Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

module.exports = {
    api : env.api
}