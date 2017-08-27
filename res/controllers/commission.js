var Vue = require('vue');
var utility = require('../config/utility');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');

require('../config/date');

new Vue({
    el : '.commission',
    data : {
      commission: {}
    },
    created : function(){
      this.getData()
    },
    methods : {
      getData : function(){        
        this.$http.get(Config.api + 'distributor/commission?openid=' + localStorage['openId'] + '&page=1&size=50')
        .then(function(res){
            if(res.body.code == 0){   
              this.commission = res.body.data
            }else{
              Toast.show('请先注册成为代理商',2000,function(){
                window.location.href = '/bind.html'
              })
            }
        },function(){

        }).bind(this);
      },
      redirectWithdraw :function(){
        window.location.href = '/withdraw.html?money=' +  this.commission.balance
      }
    }
});