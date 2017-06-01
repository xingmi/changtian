/**
    @description 个人申请
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');

new Vue({
    el : '.apply_form',
    data : {
        params : {
            name : '',
            amount : '',
            usage : '',
            assets : [],
            identity : '',
            salary : '',
            social : '',
            accu : '',
            monthly : '',
            credit : '',
            expected : '',
            mobile : '',
            code : ''
        },
        configParams : JSON.parse(sessionStorage['mapData']),
        temCredit_registries : [],
        temExpected : [],
        codeMsg: "获取验证码",
        countdown : 60,
        sendStatus : "title",
        isSend : true
    },
    watch : {
        temCredit_registries : function(value){
            this.params.credit = value;
        },
        temExpected : function(value){
            this.params.expected = value;
        }
    },
    created : function(){    
        
    },
    methods : {
        applyBtn : function(){
            var postData = JSON.parse(JSON.stringify(this.params));
            postData.assets = eval(this.params.assets.join('+')) || '';
            postData.openid = Config.openId;

            for(var key in postData){ 
                if(!postData[key] || postData[key]  == undefined ){
                    Toast.show('请检查所有数据是否填写完整',1000);
                    return false;
                };
            }

            this.$http.post(Config.api+ 'loan/personal',postData).then(function(res){
                if(res.body.code == 0){
                    Toast.show('提交成功')
                }else{
                    Toast.show(res.body.message)
                }
            },function(){

            })
        },
        sendCode : function(){
            if(!this.params.mobile){
                Toast.show('请填写手机号码');
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
                    self.sendStatus = "title disable"
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
                mobile : self.params.mobile
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
})