/**
    @description 极速申请
*/

var Vue      = require('vue');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');

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
        this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid=" + Config.openId
    },
    methods : {
        postData : function(){
            if(!this.user.code){
                Toast.show('请填写手机验证码',1000);
                return;
            }
            var self = this;
            self.$http.post(Config.api+ 'quick/personal',{
                    'openid' : Config.openId,
                    'mobile' : self.user.phone,
                    'code'   : self.user.code,
                    'name'   : self.user.name,
                    'amount' : 10000
                }).then(function(res){
                    if(res.body.code == 0){
                        window.location.href= "/applySuccess.html"
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
        sendCode : function(){
            if(!this.user.name){
                Toast.show('请填写姓名',1000);
                return;
            }
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
                    self.codeMsg = "重新发送(" + self.countdown + "s)"; 
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





