/**
    @description 企业申请
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');


new Vue({
    el : '.apply_form',
    data : {
        params : {
            name : '',
            trade : '',
            quota : '',
            invoice : '',
            liabilities : '',
            mobile : '',
            credit : ''
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

            for(key in postData){

                if(!postData[key] || postData[key]  == undefined ){
                    console.log(key + "---------" + postData[key])
                    alert('请检查所有数据是否填写完整');
                    return false;
                };
            }

            this.$http.post(Config.api+ 'products.json',{
                params : postData
            }).then(function(res){
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