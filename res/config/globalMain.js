var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var Cookie = require('../lib/cookie');
var env    = require('./env');

if(!Cookie('mapDataExpires') || !localStorage['mapData']){
    window.location.href= "/getBaseData.html?redirect="+ window.location.href
}

var Filter = require('./filter');

console.log(JSON.parse(localStorage['mapData']))

Vue.use(VueResource);

// Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;

module.exports = {
    api : env.api,
    mapData : JSON.parse(localStorage['mapData']),
    openId : '444',
    currentCity : JSON.parse(localStorage['mapData']).current
}