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
        page : 1,
        size : 2,
        type : 1,
        swiperArray : [],
        centerImage : '',
        newsList: [],
        isHasMore : true,
        selectThis : true,
        agents : []
    },
    created : function(){
        
        this.getSwiper();
        this.getData()

        // 中间banner
        this.$http.get(Config.api + "banners?type=6")
        .then(function(res){
            if(res.body.code == 0){
              this.centerImage = res.body.data
            }
        },function(){

        }).bind(this);

        // 客户经理
        this.$http.get(Config.api + "home")
        .then(function(res){
          if(res.body.code == 0){
            this.agents = res.body.data.agents
          }
        },function(){

        }).bind(this);
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
        getData : function(){
            this.$http.get(Config.api + 'articles',{
              params : {
                type : this.type,
                size : this.size,
                page : this.page
              }
            })
            .then(function(res){
                if(res.body.code == 0){   
                  this.news =res.body.data;
                  this.newsList = _.concat(this.newsList,res.body.data.articles)
                  if(this.page == this.news.totalPage){
                    this.isHasMore = false;
                  }
                }
            },function(){

            }).bind(this);
        },
        nextPage : function(){
            if(this.page < this.news.totalPage){
              this.page++;
              this.getData()
            }
        },
        getNewDate : function(type){
            this.selectThis = !this.selectThis;
            this.isHasMore = true;
            this.page = 1;
            this.newsList = []
            this.type = type;
            this.getData()
        }
    }
})