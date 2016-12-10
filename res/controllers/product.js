/**
    @description 产品详情
*/

var Vue = require('vue');
var Config = require('../config/globalMain');
var utility = require('../config/utility');

new Vue({
    el : '.product',
    data : {

    },
    created : function(){
        this.$http.post(Config.api + 'product/'+utility.getUrlParam('id')+'.json',{
            params: {
            }
        }).then(function(res){
            if(res.body.code == 0){
                this.productDetail = res.body.data;
            }
        },function(){

        })
    },
    methods : {
        collectBtn : function(){
            this.$http.post(Config.api + 'favorite',{
                params: {
                    openid : '111',
                    pid : utility.getUrlParam('id')
                }
            }).then(function(res){

            },function(){

            })
        },
        cancelCollectBtn : function(){

        }
    }

});