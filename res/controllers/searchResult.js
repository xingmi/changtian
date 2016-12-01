/**
    @description 搜索结果页
*/

var Vue      = require('vue');
var Seachbar = require('../components/Searchbar.vue');
var SearchList  = require('../components/SearchList.vue');
var Footbar  = require('../components/Footbar.vue');
var Config = require('../config/globalMain');
var utility = require('../config/utility');

new Vue({
    el : '.search_result',
    data : {
        product_list : []
    },
    components: {
        'search-list': SearchList
    },
    created : function(){
        var that = this;
        that.$http.get(Config.api+ 'products.json',{
            params : {
                amount : utility.getUrlParam('amount')
            }
        }).then(function(res){
            
            that.product_list = res.body.data;
        },function(res){

        });
        
    }
})

