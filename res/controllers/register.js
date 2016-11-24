/**
    @description 极速申请
*/

var Vue = require('../lib/vue');
var VueResource = require('../lib/vue-resource');
var Config = require('../config/env');

Vue.use(VueResource);

new Vue({
    el : '.register',
    data : {
        isSend : true,
        codeMsg : "发送验证码",
        countdown : 5,
        user : {
            name : "12313",
            phone : ""
        }
    },
    methods : {
        postData : function(){
            this.$http.get(Config.api+ '/someUrl').then(function(res){

            },function(res){

            });
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



