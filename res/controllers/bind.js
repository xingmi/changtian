/**
    @description 极速申请
*/

var Vue      = require('vue');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');
var $ = require('../lib/zepto');

new Vue({
    el : '.register',
    data : {
        isSend : true,
        codeMsg : "发送验证码",
        countdown : 60,
        imageCode : "",
        imageCodeValue : "",
        user : {
            name : "",
            phone : "",
            code : '',
            
        }
    },
    created : function(){
        this.checkUserIsRegister();
        this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid=" + Config.openId;
       
    },
    methods : {
        checkUserIsRegister : function(){
            this.$http.get(Config.api + 'distributor/info?openid=' + localStorage['openId'])
            .then(function(res){
                if(res.body.code == 0){   
                  window.location.href = '/my.html'
                }else{
                  // Toast.show('请先注册成为代理商',2000,function(){
                  //   window.location.href = '/bind.html'
                  // })
                }
            },function(){

            }).bind(this);
        },
        postData : function(){
            if(!this.user.code){
                Toast.show('请填写手机验证码',1000);
                return;
            }
            if( !$(".protocol_icon i").hasClass('current')){
                Toast.show('请先同意用户及佣金协议',1000);
                return;
            }
            var self = this;
            self.$http.post(Config.api+ 'distributor/register',{
                    'openid' : Config.openId,
                    'mobile' : self.user.phone,
                    'code'   : self.user.code
                }).then(function(res){
                    if(res.body.code == 0){
                        Toast.show('申请成功',1000,function(){
                            window.location.href = '/my.html'
                        })
                    }else{
                        Toast.show(res.body.message)  
                    }
                },function(res){
                    Toast.show('提交失败');
                });
        },
        resetImageCode : function(){
            this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid="+Config.openId+"&data=" + new Date().getTime()
        },
        
        change1 : function(){
            $('.protocol_icon i').toggleClass('current')
        },
        change2 : function(){
            $(".mask1").toggle();
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
        sendCode : function(){
            if(!this.user.phone){
                Toast.show('请填写手机号码',1000);
                return;
            }
            if(!this.imageCodeValue){
                Toast.show('请填写图片验证码',1000);
                return;
            }

            var self = this;
            function settime() {
                if (self.countdown == 0) {    
                    self.codeMsg = "发送验证码";
                    self.countdown = 60;
                    self.isSend = true; 
                    return;
                } else {
                    self.codeMsg = "重发(" + self.countdown + "s)"; 
                    self.countdown--;
                } 
                setTimeout(function() { settime() },1000) //每1000毫秒执行一次
            }

            if(!self.isSend){
                return true;
            }

            this.$http.post(Config.api + 'message/sms',{
                openid : Config.openId,
                mobile : self.user.phone,
                code   : self.imageCodeValue
            },{
                before : function(){
                    self.isSend = false;
                }
            }).then(function(res){
                if(res.body.code == 0){
                    settime();
                    Toast.show('验证码正飞往您的手机')
                }else{
                    self.isSend = true; 
                    Toast.show(res.body.message);
                }
            },function(){
                self.isSend = true; 
                Toast.show('发送失败');
                
            })

        }
    }
});





