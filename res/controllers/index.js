/**
    @description 收藏列表
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');

require("expose-loader?$!../lib/zepto");
require('../lib/swipeSlide');

new Vue({
    el : '.index',
    data : {
        swiperArray : []
    },
    created : function(){
        
        this.getSwiper();
    },
    methods : {
        getSwiper : function(){
            var that = this;
            that.$http.get(Config.api + 'banners')
                .then(function(res){
                    that.swiperArray = res.body.data;

                    setTimeout(function(){
                        $('.touch_slider').swipeSlide({
                            lazyLoad: true,
                            continuousScroll: true,
                            speed : 8000,
                            transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                            firstCallback: function (i, sum, me) {
                                me.find('.dots').children().first().addClass('active');
                            },
                            callback: function (i, sum, me) {
                                me.find('.dots').children().eq(i).addClass('active').siblings().removeClass('active');
                            }
                        });
                    },0)
                })
        },
    }
})