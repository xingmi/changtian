/**
    @description 收藏列表
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');


new Vue({
    el : '.collect_list',
    data : {
        productlist : []
    },
    created : function(){
        this.$http.get(Config.api + 'favorites.json',{
            params :{
                openid : '333'
            }
        }).then(function(res){
            this.productlist = res.body.data;
        },function(){

        })
    },
})