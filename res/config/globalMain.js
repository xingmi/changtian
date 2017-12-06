/*
** 总配置
*/
var Vue      = require('vue');
var Cookie = require('../lib/cookie');
var utility = require('./utility');
var Ajax = require('../config/ajax');
var vueTmpFilter = require('./filter');
var VueResource = require('../lib/vue-resource');
var env    = require('./env');
var utility = require('./utility');

var io = require('../lib/growingio')

require('./directive');

Vue.use(VueResource);

// 获取用户定位
function getLocation(callback){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function(p){
                callback(p.coords.latitude, p.coords.longitude);
            },
            function(e){
                callback(31,121)
               //  var msg = e.code + "\n" + e.message;
               // alert('定位失败')
            }
        );
    }
}

function loadData(lat,lng,callback){
  var lat = lat || 31.78;
  var lng = lng || 119.95;
  Ajax.get(env.api+'constants.json?lat='+lat+ "&lng="+lng,function(datas){
      var datas = JSON.parse(datas);
      if(datas.code == 0){
        sessionStorage['mapData'] = JSON.stringify(datas.data)
        vueTmpFilter(sessionStorage['mapData']);  
        if(callback)callback()    
      }
  })
}

if(!localStorage['source']){
  localStorage['source'] = utility.getUrlParam('source')
}

// 存储分享人openid
if(utility.getUrlParam('shareId')){
    localStorage['share_openid'] = utility.getUrlParam('shareId')
}

// 判断是否在微信中
if(!localStorage['openId'] && navigator.userAgent.match(/MicroMessenger/i)){
    window.location.href= "/wechat.html?page_ref="+ window.location.href;
}else if(!localStorage['openId']){
    localStorage['openId'] = Math.random().toString(36).substr(2);
}


Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;


if(!sessionStorage['mapData']){
  loadData()
  getLocation(function(lat,lng){
   loadData(lat,lng,function(){
    window.location.href = window.location.href + (window.location.href.indexOf('?') > 0 ? "&" : "?") + "dateTime=" + new Date().getTime()
   })
  })
}else{
  vueTmpFilter(sessionStorage['mapData'])
  Vue.http.interceptors.push(function(request, next) {
    _.extend(request.params,{
    'city' : JSON.parse(sessionStorage['mapData']).current.id
    })
    next()
  });
}

if(navigator.userAgent.match(/MicroMessenger/i)){
    var wechat = require('./wechat')
}

module.exports = {
    api : env.api,
    openId : localStorage['openId']
}