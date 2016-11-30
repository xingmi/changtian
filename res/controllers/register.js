/**
    @description 极速申请
*/

var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var Config = require('../config/globalMain');

new Vue({
    el : '.register',
    data : {
        isSend : true,
        codeMsg : "发送验证码",
        countdown : 5,
        imageCode : "",
        user : {
            name : "12313",
            phone : "",
            imageCodeValue : ""
        }
    },
    created : function(){
        this.imageCode = "https://api.ct.moyobar.com/message/validate.jpg?openid=1232"
    },
    methods : {
        postData : function(){
            this.$http.get(Config.api+ '/someUrl').then(function(res){

            },function(res){

            });
        },
        resetImageCode : function(){
            this.imageCode = "https://api.ct.moyobar.com/message/validate.jpg?openid=3453455&data=" + new Date().getTime()
        },
        sendCode : function(){
            var self = this;
            function settime() { 
                if (self.countdown == 0) {
                    // obj.removeAttr("disabled");    
                    self.codeMsg = "发送验证码";
                    self.countdown = 5;
                    return;
                } else {
                    self.codeMsg = "重新发送(" + self.countdown + "s)"; 
                    self.countdown--;
                } 
                setTimeout(function() { settime() },1000) //每1000毫秒执行一次
            } 
            settime()

        }
    }
});





