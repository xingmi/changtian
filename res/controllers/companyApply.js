/**
    @description 企业申请
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');

new Vue({
    el : '.apply_form',
    data : {
        params : {
            name : '', // 称呼
            trade : '', // 行业
            quota : '', //融资额度
            invoice : '', // 企业年开票额
            liabilities : '', // 企业及个人名下负债
            mobile : '', // 联系方式
            credit : '', //信用情况
            house : '', // 房产
            car : '', // 汽车
            device : '', // 设备
            receivables : '' //企业应收账款额
        },
        configParams : Config.mapData,
        temTrade : [],
        temCredit_registries : [],
    },
    watch : {
        temTrade : function(value){
            this.params.trade = value;
        },
        temCredit_registries : function(value){
            this.params.credit = value;
        }
    },
    created : function(){    
        
    },
    methods : {
        applyBtn : function(){
            var postData = JSON.parse(JSON.stringify(this.params));
            // postData.assets = eval(this.params.assets.join('+'));
            postData.openid = Config.openId;

            for(key in postData){

                if(!postData[key] || postData[key]  == undefined ){
                    Toast.show('请检查所有数据是否填写完整',1000);
                    return false;
                };
            }

            this.$http.post(Config.api+ 'loan/enterprise',postData).then(function(res){
                if(res.body.code == 0){
                    Toast.show('提交成功')
                }else{
                    Toast.show(res.body.message)
                }
            },function(){

            })
        }
    }
})