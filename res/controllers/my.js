var Vue = require('vue');
var utility = require('../config/utility');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');
var $ = require('../lib/zepto');
require('../config/date');

new Vue({
    el : '.my',
    data : {
      user: {}
    },
    created : function(){
      this.getData()
    },
    methods : {
      getData : function(){        
        this.$http.get(Config.api + 'distributor/info?openid=' + localStorage['openId'])
        .then(function(res){
            if(res.body.code == 0){   
              this.user = res.body.data
            }else{
              Toast.show('请先注册成为代理商',2000,function(){
                window.location.href = '/bind.html'
              })
            }
        },function(){

        }).bind(this);
      },
      change3 : function(){
            $(".mask2").toggle();
        },
        change4 : function(){
             $(".mask").hide();
        },
        change5 : function(){
             $(".mask").hide();
        },
    }
});