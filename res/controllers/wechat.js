var Cookie = require('../lib/cookie');
var env = require('../config/env');
var utility = require('../config/utility');
var Ajax = require('../config/ajax');

if(!utility.getUrlParam('code')){
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa45589eb9464971&redirect_uri="+ encodeURIComponent(window.location.href)+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}else{
    Ajax.get(env.api+'wechat/userinfo?code=' + utility.getUrlParam('code'),function(datas){
        var datas = JSON.parse(datas);
        localStorage['openId'] = datas.data.openid;
        window.location.href= utility.getUrlParam('page_ref')
    })
}




