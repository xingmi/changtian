/**
    @description 极速申请
*/

var Vue = require('vue');
var VueResource = require('vue-resource');
var Config = require('../config/env');

Vue.use(VueResource);

new Vue({
    el : '.register',
    data : {
        isSend : true,
        codeMsg : "发送验证码",
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
            this.codeMsg = "50s"
        }
    }
});



