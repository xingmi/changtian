/**
    @description 搜索结果页
*/

var Vue      = require('vue');
var Seachbar = require('../components/Searchbar.vue');
var Footbar  = require('../components/Footbar.vue');
var Config = require('../config/globalMain');
var utility = require('../config/utility');
var Footbar  = require('../components/Footbar.vue');

require("expose-loader?$!../lib/zepto");

new Vue({
    el : '.search_result',
    components: {
        'foot-bar'  : Footbar
    },
    watch : {
    },
    data : {
            btn : {
                showMore   : false
            },
            datas : [],
            productlist : [],
            page : 1,
            size : 20,
            productlistDetail : {},
            keyword : '',
            searchParams : {
            },
            temparams:{
                institutions : JSON.parse(sessionStorage['mapData']).institutions,
                refunds : JSON.parse(sessionStorage['mapData']).refunds,
                terms : JSON.parse(sessionStorage['mapData']).terms,
                assets : JSON.parse(sessionStorage['mapData']).assets,
                credits : JSON.parse(sessionStorage['mapData']).credits
            },
            paramsTerms : [],
            paramsRefunds : [],
            paramsInstitutions : [],
            paramsCredits : [],
            paramsPeoples : [],
            paramsAssets  : []


    },
    created : function(){
        var that = this;

        this.datas = JSON.parse(sessionStorage['mapData'])
        this.temParams = {
            "city" : JSON.parse(sessionStorage['mapData']).current.id
        }

        if(window.location.href.indexOf('searchList') > 0){

        }else{
            var searchParams = JSON.parse(utility.getUrlParam('searchParams'));
            var temParams = _.extend(this.temParams,searchParams);

            this.keyword = searchParams.keyword

            _.each(searchParams,function(value,key){
                if(!!value) temParams[key] = value;
            })
            that.temParams = temParams;
        }
        that.getData();

        $(window).on('scroll',function(e){
            var wh = $(window).height()
            if(!that.btn.showMore){
                return false;
            }
 
            if(document.body.scrollTop >= ($('.search_list').height() - wh - 40)){
                that.page++;
                that.getData();
            }

        });

        var wh = $(window).height();
        $(".search_module").height(wh-40);

        // $("body").on('click',".search_rule dt",function(){
        //     alert(1111)
        //     $(this).parent().toggleClass('current')
        // });

    },
    watch : {
        keyword : function(){
            this.onEnter()
        }
    },
    mounted : function(){
        $(".show_search").on('click',function(){
            window.scrollTo(0,0)
            $("html,body").toggleClass('hidden')
            $(".fast_search").toggleClass('search_actionsheet_toggle')
        })

        $(".hide_search_content").on('click',function(){
            $("html,body").removeClass('hidden')
            $(".fast_search").removeClass('search_actionsheet_toggle')
        })
    },
    methods : {
        getData : function(){
            var that = this;
            that.temParams.page = this.page;
            that.temParams.size = this.size;
            that.$http.get(Config.api+ 'products.json',{
                params : that.temParams
            }).then(function(res){

                that.productlistDetail = res.body.data;
                that.productlist = _.concat(that.productlist,res.body.data.data);

                setTimeout(function(){
                    if(res.body.data.data.length == that.size){
                        that.btn.showMore = true;
                    }else{
                        that.btn.showMore = false;   
                    }
                },200)
                
            },function(res){

            });
        },
        showSearch : function(){
            $(".search_module").toggle();
            $("body").toggleClass('overflow_hide')
        },
        closeSearch  : function(){
            $(".search_module").hide();
            $("body").removeClass('overflow_hide')
        },
        keywordSearch : function(){
           this.onEnter();
        },
        paramsSearch : function(){
            this.page = 1
            this.temParams.terms = this.termsCoupute;
            this.getData();
        },
        resetParams : function(){
            this.page = 1;
            this.temParams.refunds = ''
            this.temParams.institutions ='';
            this.paramsRefunds = [];
            this.paramsInstitutions = [];
            this.paramsTerms = [];
            this.productlist = [];
            this.paramsCredits = [];
            this.paramsPeoples = [];
            this.paramsAssets  = [];
            this.paramsSearch()
        },
        selectRefund : function(value){
            if(this.paramsRefunds.length > 1){
                this.paramsRefunds.shift();
            }
            this.temParams.refunds = this.paramsRefunds[0];
            this.productlist = []
            this.paramsSearch()
        },
        selectInstitutions : function(){
            if(this.paramsInstitutions.length > 1){
                this.paramsInstitutions.shift();
            }
            this.temParams.institutions = this.paramsInstitutions[0];
            this.productlist = []
            this.paramsSearch()
        },

        selectAssets : function(value){
            if(this.paramsAssets.length > 1){
                this.paramsAssets.shift();
            }
            this.temParams.assets = this.paramsAssets[0];
             this.productlist = []
            this.paramsSearch()
        },
        selectCredits : function(value){
            if(this.paramsCredits.length > 1){
                this.paramsCredits.shift();
            }
            this.temParams.credits = this.paramsCredits[0];
            this.productlist = []
            this.paramsSearch()
        },

        selectTerms : function(){
            this.productlist = []
            this.paramsSearch()
        },
        onEnter : function(){
            this.temParams.keyword = this.keyword;
            this.productlist = []
            this.paramsSearch();
        },
        toggle : function(e){
            $(e.target).parent().toggleClass('current')
        }
    },
    computed : {
        termsCoupute : function(){
            if(this.paramsTerms.length == 1){
                return this.paramsTerms[0];
            }else if(this.paramsTerms.length >= 2){
                return Math.min.apply(null,this.paramsTerms) + "," + Math.max.apply(null,this.paramsTerms)
            }
            
        }
    }
})

