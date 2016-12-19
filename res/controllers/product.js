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
        productDetail : {},
        interest : {},
        selectParams : {
            amount : '',
            term : ''
        },
        term : []
    },
    created : function(){
        this.$http.get(Config.api + 'product/'+utility.getUrlParam('id')+'.json',{
            params : {
                openid : Config.openId
            }
        }).then(function(res){
            if(res.body.code == 0){
                this.productDetail = res.body.data;
                this.selectParams.amount = this.productDetail.minAmount/10000;
                this.selectParams.term = this.productDetail.minTerm;

                this.getInterestsDetail()
            }
        },function(){

        });
    },
    watch : {
        term : function(value){
            this.selectParams.term = value;
            this.getInterestsDetail();
        }
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
                    Toast.show(res.body.message)
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
                    Toast.show(res.body.message)
                }
            },function(){

            })
        },
        changeAmount : function(){
            this.getInterestsDetail();
        },
        getInterestsDetail : function(){
            var that = this;
            // if(!this.selectParams.amount){
            //     alert('请输入金额');
            //     return;
            // }
            // if(this.selectParams.amount < this.productDetail.minAmount || this.selectParams.amount > this.productDetail.maxAmount){
            //     alert('请输入正确的金额');
            //     return;
            // }

            this.$http.post(Config.api + 'product/'+utility.getUrlParam('id')+'/interests.json',{
                id : utility.getUrlParam('id'),
                amount : this.selectParams.amount*10000,
                term : this.selectParams.term
            }).then(function(res){
                if(res.body.code == 0){
                    that.interest = res.body.data
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