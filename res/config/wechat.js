var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var env    = require('./env');
var wx = require('weixin-js-sdk');
var utility = require('./utility');

Vue.http.get(env.api + 'wechat/sign',{
    params : {
        url : encodeURIComponent(window.location.href)
    }
}).then(function(res){
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.body.data.appid, // 必填，公众号的唯一标识
        timestamp: res.body.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.body.data.noncestr, // 必填，生成签名的随机串
        signature: res.body.data.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    var datas = {
        title: '长天', // 分享标题
        link: 'http://' + window.location.host + '/product.html?id=' + utility.getUrlParam('id') + '&shareId=' + localStorage['openId'], // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
           
        },
        cancel: function () { 

        }
    }
    wx.ready(function(){
        wx.onMenuShareAppMessage(datas);
        wx.onMenuShareTimeline(datas);
    });
},function(){

})
