var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var env    = require('./env');
var wx = require('../lib/wx');
var utility = require('./utility');

Vue.http.get(env.api + 'wechat/sign',{
    params : {
        url : encodeURIComponent(window.location.href)
    }
}).then(function(res){
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    var datas = {
        title: '', // 分享标题
        link: 'http://' + window.location.host + '/product.html?id=' + utility.getUrlParam('id') + '&shareId=' + localStorage['openId'], // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    }
    wx.ready(function(){
        wx.onMenuShareAppMessage(datas);
        wx.onMenuShareTimeline(datas);
    });
},function(){

})
