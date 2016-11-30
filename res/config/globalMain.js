var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var Cookie = require('../lib/cookie');
var Filter = require('./filter');
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

var api = "https://api.ct.moyobar.com/";

if(!Cookie('mapData')){
    Vue.http.get(api+ 'constants.json').then(function(res){
        Cookie('mapData',res.body.data,{ expires: 1 });

    },function(res){    
        console.log('缓存数据失败')
    });
}

console.log(JSON.parse(Cookie('mapData')))



module.exports = {
    api : api
}