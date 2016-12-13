/**
    @description 首页列表
*/

var Vue      = require('vue');
var Seachbar = require('../components/Searchbar.vue');
var SearchList  = require('../components/SearchList.vue');
var Footbar  = require('../components/Footbar.vue');
var Config = require('../config/globalMain');


new Vue({
    el : '.search_list_container',
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
    }
})

