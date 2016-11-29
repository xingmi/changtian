var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

module.exports = {
    api : "https://api.ct.moyobar.com/"
}