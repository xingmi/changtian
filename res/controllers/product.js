/**
    @description 产品详情
*/

var Vue = require('vue');
var Config = require('../config/globalMain');
var utility = require('../config/utility');
var Toast = require('../widget/toast');

new Vue({
    el : '.product',
    data : {
        show : false,
        productDetail : {}
    },
    created : function(){
        this.$http.get(Config.api + 'product/'+utility.getUrlParam('id')+'.json',{
            params : {
                openid : Config.openId
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
                openid : Config.openId,
                pid : utility.getUrlParam('id')
            }).then(function(res){
                if(res.body.code == 0){
                    Toast.show('收藏成功');
                    this.productDetail.favorite = true;
                }else{
                    alert(res.body.message)
                }
            },function(){

            })
        },
        cancelCollectBtn : function(){
            this.$http.post(Config.api + 'favorite/delete',{
                openid : Config.openId,
                pid : utility.getUrlParam('id')
            }).then(function(res){
                if(res.body.code == 0){
                    Toast.show('取消收藏成功');
                    this.productDetail.favorite = false;
                }else{
                    alert(res.body.message)
                }
            },function(){

            })
        }
    },
    computed : {
        parserRequirements : function(){
            if(this.productDetail.requirements){
                return this.productDetail.requirements.replace(/&lt;br&gt;/g,'<br/><hr style="height:10px;">')
            }
        },
        parserMaterials : function(){
            if(this.productDetail.requirements){
                return this.productDetail.materials.replace(/&lt;br&gt;/g,'<br/><hr style="height:10px;">')
            }
        }
    }

});