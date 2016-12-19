var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var Config = require('../config/globalMain');
var utility = require('../config/utility');

if(!utility.getUrlParam('code')){
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa45589eb9464971&redirect_uri="+ encodeURIComponent(window.location.href)+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
}else{
    Vue.http.get(Config.api+'wechat/userinfo',{
        params : {
            code : utility.getUrlParam('code'),
            sid : localStorage['share_openid']
        }
    }).then(function(res){
        if(res.body.code == 0){
            localStorage['openId'] = res.body.openid;
            window.location.href= utility.getUrlParam('page_ref')
        }
    },function(){

    })
}




