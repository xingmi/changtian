var Cookie = require('../lib/cookie');
var env = require('../config/env');
var utility = require('../config/utility');
var Ajax = require('../config/ajax');


if(!utility.getUrlParam('code')){
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbb555eb5210015b0&redirect_uri="+ encodeURIComponent(window.location.href)+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
}else{
    Ajax.get(env.api+'wechat/userinfo?code='+ utility.getUrlParam('code') + (localStorage['share_openid'] ? ('&sid='+localStorage['share_openid']) : ''),function(datas){
        var datas = JSON.parse(datas);
        if(datas.code == 0){
            localStorage['openId'] = datas.data.openid;
            window.location.href= utility.getUrlParam('page_ref')
        }
    })
}



