/*
** 总配置
*/
var Cookie = require('../lib/cookie');
var utility = require('./utility')

// 存储分享人openid
if(utility.getUrlParam('shareId')){
    localStorage['share_openid'] = utility.getUrlParam('shareId')
}

// 判断是否在微信中
if(!localStorage['openId'] && navigator.userAgent.match(/MicroMessenger/i)){
    alert(localStorage['openId'])
    window.location.href= "/wechat.html?page_ref="+ window.location.href;
}

// 判断是否有数据
if(!Cookie('mapDataExpires') || !localStorage['mapData']){
    window.location.href= "/getBaseData.html?page_ref="+ window.location.href;
}


var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var env    = require('./env');
var Filter = require('./filter');

Vue.use(VueResource);
// Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;

if(navigator.userAgent.match(/MicroMessenger/i)){
    var wechat = require('./wechat')
}

console.log(JSON.parse(localStorage['mapData']))

module.exports = {
    api : env.api,
    mapData : JSON.parse(localStorage['mapData']),
    openId : localStorage['openId'],
    currentCity : JSON.parse(localStorage['mapData']).current
}