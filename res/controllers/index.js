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
        size : 8,
        type : 1,
        swiperArray : [],
        centerImage : '',
        newsList: [],
        isHasMore : true,
        selectThis : true,
        scrollToolsImage : [],
        agents : [],
        images1 : [],
        images2 : [],
        images3 : [],
        images4 : [],
        images5 : [],
        images6 : []
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


        // 手机站第一模块左边大图
        this.$http.get(Config.api + "banners?type=7")
        .then(function(res){
            if(res.body.code == 0){
              this.images1 = res.body.data
            }
        },function(){

        }).bind(this);


        // 手机站第一模块右边上图
        this.$http.get(Config.api + "banners?type=8")
        .then(function(res){
            if(res.body.code == 0){
              this.images2 = res.body.data
            }
        },function(){

        }).bind(this);

        // 手机站第一模块右边下左图
        this.$http.get(Config.api + "banners?type=9")
        .then(function(res){
            if(res.body.code == 0){
              this.images3 = res.body.data
            }
        },function(){

        }).bind(this);


        // 手机站第一模块右边下右图
        this.$http.get(Config.api + "banners?type=10")
        .then(function(res){
            if(res.body.code == 0){
              this.images4 = res.body.data
            }
        },function(){

        }).bind(this);

        // 手机站第二模块左图
        this.$http.get(Config.api + "banners?type=11")
        .then(function(res){
            if(res.body.code == 0){
              this.images5 = res.body.data
            }
        },function(){

        }).bind(this);

        // 手机站第二模块右图
        this.$http.get(Config.api + "banners?type=12")
        .then(function(res){
            if(res.body.code == 0){
              this.images6 = res.body.data
            }
        },function(){

        }).bind(this);



        // 客户经理 和 滚动栏
        this.$http.get(Config.api + "home")
        .then(function(res){
          if(res.body.code == 0){
            this.agents = res.body.data.agents
            this.scrollToolsImage = res.body.data.icons.ydkjlj
          }
        },function(){

        }).bind(this);
    },
    methods : {
        getSwiper : function(){
            var that = this;
            that.$http.get(Config.api + 'banners?type=13')
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
                  if(this.page == this.news.totalPage || this.news.totalPage == 0){
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