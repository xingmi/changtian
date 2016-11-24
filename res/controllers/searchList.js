/**
    @description 首页列表
*/

var Vue = require('vue')
var Seachbar = require('../components/Searchbar.vue');

function getLocation(callback){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function(p){
                callback(p.coords.latitude, p.coords.longitude);
            },
            function(e){
                var msg = e.code + "\n" + e.message;
            }
        );
    }
}

new Vue({
    el : '.seach_list',
    data : {
        usercity : "上海"
    },
    components: {
        'search-bar': Seachbar
    },
    created : function(){
        getLocation()
    }
})
