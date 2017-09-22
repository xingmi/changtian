/**
    @description 收藏列表
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');
var Seachbar = require('../components/Searchbar.vue');
var $ = require('../lib/zepto');

// require("expose-loader?$!../lib/zepto");


new Vue({
    el : '.index',
    components : {
        
    },
    data : {
        homeDetail : {},
        amount : '',
        productlist : [],
        credits: [],
        usercity : "",
        usercityId: 0,
        cities : "",
        keyword : '',
        searchParams : {},
        temparams : {
            peoples : JSON.parse(sessionStorage['mapData']).peoples,
            assets : JSON.parse(sessionStorage['mapData']).assets,
            credits : JSON.parse(sessionStorage['mapData']).credits,
        },
        paramsCredits : [],
        paramsPeoples : [],
        paramsAssets  : []
    },
    created : function(){
        this.usercity = JSON.parse(sessionStorage['mapData']).current.name
        this.usercityId = JSON.parse(sessionStorage['mapData']).current.id
        this.cities = JSON.parse(sessionStorage['mapData']).cities

        this.getHomeData();
        // this.getProductData();
        this.getCreditData();
    },
    mounted :function(){
        var that = this;
        // $(".show_search").on('click',function(){
        //     window.scrollTo(0,0)
        //     $("html,body").toggleClass('hidden')
        //     $(".fast_search").toggleClass('search_actionsheet_toggle')
        // })

        $(".hide_search_content").on('click',function(){
            $("html,body").removeClass('hidden')
            $(".fast_search").removeClass('search_actionsheet_toggle')
        })


        $("body").on('click',".jump_to_new_link",function(){
            var id = $(this).attr('data-id');
            var type = $(this).attr('data-type');
            window.location.href = "https://api.toudaiworld.com/jump?type="+type+"&dataId=" + id + "&city="+ that.usercityId
        })
    },
    methods : {

        // getProductData : function(){
        //     var that = this;
        //     that.$http.get(Config.api+ 'products.json',{
        //         params : {
        //             page : 1,
        //             size : 4
        //         }
        //     }).then(function(res){

        //         that.productlistDetail = res.body.data;
        //         that.productlist = _.concat(that.productlist,res.body.data.data);
                
        //     },function(res){

        //     });
        // },

        getCreditData : function(){
            var that = this;
            that.$http.get(Config.api+ 'credits').then(function(res){

                that.credits = res.body.data;
                
            },function(res){

            });
        },

        getHomeData : function(){
            var that = this;
            that.$http.get(Config.api+ 'home').then(function(res){

                that.homeDetail = res.body.data;
                that.productlist  = that.homeDetail.products
                
            },function(res){

            });
        },
        fastSearch : function(){
            this.searchParams.amount = this.amount;
            window.location.href="/searchResult.html?searchParams=" + JSON.stringify(this.searchParams)
        },
        showCity : function(){
            $('.city_list').addClass('city_actionsheet_toggle')
        },
        hideCity : function(){
            $('.city_list').removeClass('city_actionsheet_toggle')
        },
        selectCity : function(index,i){
            var sessionList = JSON.parse(sessionStorage['mapData'])

            _.extend(sessionList.current,sessionList.cities[index].cities[i]);

            sessionStorage['mapData'] = JSON.stringify(sessionList);
            window.location.replace("/index.html?newDate=" + new Date().getTime());
        },
        selectPeoples : function(value){
            if(this.paramsPeoples.length > 1){
                this.paramsPeoples.shift();
            }
            this.searchParams.peoples = this.paramsPeoples[0];
        },

        selectAssets : function(value){
            if(this.paramsAssets.length > 1){
                this.paramsAssets.shift();
            }
            this.searchParams.assets = this.paramsAssets[0];
        },
        selectCredits : function(value){
            if(this.paramsCredits.length > 1){
                this.paramsCredits.shift();
            }
            this.searchParams.credits = this.paramsCredits[0];
        },
        paramsSearch : function(){
            window.location.href="/searchResult.html?searchParams=" + JSON.stringify(this.searchParams)
        },
        resetParams : function(){
            this.searchParams = {};
            this.paramsPeoples = [];
            this.paramsAssets = [];
            this.paramsCredits = [];
        },
        keywordSearch : function(){
            this.searchParams.keyword = this.keyword;
            window.location.href="/searchResult.html?searchParams=" + JSON.stringify(this.searchParams)
        }
        
    }
})