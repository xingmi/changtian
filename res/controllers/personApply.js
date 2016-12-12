/**
    @description 个人申请
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');


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
            mobile : ''
        },
        configParams : Config.mapData,
        temCredit_registries : [],
        temExpected : [],
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
            postData.assets = eval(this.params.assets.join('+'));
            postData.openid = Config.openId;
            for(key in postData){

                if(!postData[key] || postData[key]  == undefined ){
                    console.log(key + "---------" + postData[key])
                    alert('请检查所有数据是否填写完整');
                    return false;
                };
            }

            this.$http.post(Config.api+ 'loan/personal',postData).then(function(res){
                if(res.body.code == 0){
                    alert('提交成功')
                }else{
                    alert(res.body.message)
                }
            },function(){

            })
        }
    }
})