/**
    @description 首页列表
*/

var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var Seachbar = require('../components/Searchbar.vue');
var SearchList  = require('../components/SearchList.vue');
var Footbar  = require('../components/Footbar.vue');
var Config = require('../config/globalMain');


function getLocation(callback){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function(p){
                callback(p.coords.latitude, p.coords.longitude);
            },
            function(e){
               //  var msg = e.code + "\n" + e.message;
               // alert(msg)
            }
        );
    }
}

new Vue({
    el : '.search_list',
    data : {
        usercity : "定位中...",
        product_list : []
    },
    components: {
        'search-bar': Seachbar,
        'foot-bar'  : Footbar,
        'search-list': SearchList
    },
    created : function(){
        var that = this;
        // getLocation(function(lat,lng){
            that.$http.get(Config.api+ 'products.json').then(function(res){
                that.usercity = "上海"
                that.product_list = res.body.data;
            },function(res){

            });
        // })
    }
})

