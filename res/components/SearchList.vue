<template>
    <section class="search_list">
        <div :class="[ listconfig.search_item ? 'pulldown_search' : 'pulldown_search pulldown_search_three']" v-if="listconfig.search_bar">
            <ul class="pull_ul clear_fix">
                <li class="pull_li hide_search_content">
                    <span v-if="temPeople.length" @click="showData.first=!showData.first;showData.second=false;showData.third=false" style="color:#60a7c1;">{{temPeople.toString() | peopleValue}}<i></i></span>
                    <span v-else @click="showData.first=!showData.first;showData.second=false;showData.third=false">贷款人群<i></i></span>
                    <ul class="pull_subul" v-if="showData.first">
                        <li class="pull_subli" v-for="people in datas.peoples">
                            <label @change="selectPeople(people.value)">
                                <input type="checkbox" :value="people.value" v-model="temPeople"/>
                                <span>{{people.text}}</span>
                            </label>
                        </li>
                    </ul>
                </li>
                <li class="pull_li hide_search_content">
                    <span v-if="temAssets.length" @click="showData.first=false;showData.second=!showData.second;showData.third=false" style="color:#60a7c1;">{{temAssets.toString() | assetsValue}}<i></i></span>
                    <span v-else @click="showData.first=false;showData.second=!showData.second;showData.third=false">资产贷款<i></i></span>
                    <ul class="pull_subul" v-if="showData.second">
                        <li class="pull_subli" v-for="asset in datas.assets"> 
                            <label @change="selectAssets(asset.value)">
                                <input type="checkbox" :value="asset.value" v-model="temAssets"/>
                                <span>{{asset.text}}</span>
                            </label>
                        </li>
                    </ul>
                </li>
                <li class="pull_li hide_search_content">
                    <span v-if="temCredit.length" @click="showData.first=false;showData.second=false;showData.third=!showData.third" style="color:#60a7c1;">{{temCredit.toString() | creditValue}}<i></i></span>

                    <span v-else @click="showData.first=false;showData.second=false;showData.third=!showData.third">信用贷款<i></i></span>

                    <ul class="pull_subul" v-if="showData.third">
                        <li class="pull_subli" v-for="credit in datas.credits">
                            <label @change="selectCredit(credit.value)">
                                <input type="checkbox" :value="credit.value" v-model="temCredit"/>
                                <span>{{credit.text}}</span>
                            </label>
                        </li>
                    </ul>
                </li>
                <li class="pull_li show_search" v-if="listconfig.search_item">
                    <span>筛选<i></i></span>
                </li>
            </ul>
        </div>

        <section class="slider_wrap touch_slider" style="-webkit-transform-style: preserve-3d;" v-if="listconfig.img">
            <ul class="slider_inner">
                <li class="slider_item" v-for="swiper in swiperArray">
                    <a :href="swiper.url ? swiper.url : 'javascript:void(0)'">
                        <img :src="swiper.image">
                       <!--  <img src="http://i1.ucaiyuan.com/h5_activity/201701zhekouji/h5zhekouji.jpg?uwidth=750&uheight=428"> -->
                    </a>
                </li>
            </ul>
            <div class="dots">
                <span v-for="swiper in swiperArray"></span>
            </div>
        </section>

        <p class="search_total">共有{{productlistDetail.totalSize}}个结果</p>
        <div class="product_list">
            <ul>
                <li class="clear_fix" v-for="product in productlist">
                    <a :href="'/product.html?id='+product.id">
                        <div class="product_img">
                            <img :src="product.logo">
                        </div>
                        <div class="product_module">
                            <h2>
                                <span class="title_model">
                                    {{product.name}}
                                </span>
                                <span class="link">
                                    <i>{{product.type | loanValue}}</i>
                                    <span>展开全文</span>
                                </span>
                            </h2>
                            <div>额度：{{product.minAmount}}万-{{product.maxAmount}}万</div>
                            <div>月息：<span style="color:#536aba">{{product.interest}}%</span></div>
                            <div>还款方式：{{ product.refundType | refundsValue}}</div>
                            <div>放款速度：{{product.lendingDate}}天</div>
                        </div>
                    </a>
                </li>
                <span v-if="btn.showMore"  class="load_more">加载中...</span>
            </ul>
            
        </div>

        <a class="collect_icon" href="/collectList.html">
            <i></i>
            收藏
        </a>

        <div class="global_mask" @click="closeMask" v-if="showData.first || showData.second || showData.third"></div>

        <div class="fast_search global_action_sheet search_actionsheet" v-if="listconfig.search_item">
            <div class="search_keyword">
                <div class="clear_fix">
                    <span class="keyword_title">关键词搜索</span>   
                    <div class="keyword_input">
                        <input placeholder="信用贷款" v-model="keyword"/>  
                        <span class="search_btn" @click="keywordSearch()">搜索</span>    
                    </div>
                </div>
                <p class="keyword_prompt">关键词提示：</p>
                <ul class="keyword_example">
                    <li class="clear_fix">
                        <span>"信用贷款"</span>
                        <span>"房产抵押贷款"</span>
                        <span>"汽车抵押贷款"</span>
                    </li>
                    <li class="clear_fix">
                        <span>"装修贷款"</span>
                        <span>"消费贷款"</span>
                        <span>"应收账款融资"</span>
                    </li>
                </ul>
            </div>
            <div class="search_params">
                <div class="search_price clear_fix">
                    <span class="price_title">贷款金额</span>
                    <div class="keyword_input">
                        <input placeholder="信用贷款" v-model="temparams.amount"/>  
                        <span class="search_btn">万</span>   
                    </div>
                </div>
                <dl>
                    <dt>贷款期限</dt>
                    <dd class="clear_fix">
                        <label v-for="data in temparams.terms">
                            <input type="checkbox" :value="data.value" v-model="paramsTerms">
                            <span class="button">{{data.text}}</span>
                        </label>
                    </dd>
                    <dt>还款方式</dt>
                    <dd class="clear_fix">
                        <label v-for="data in temparams.refunds" @change="selectRefund(data.value)">
                            <input type="checkbox" :value="data.value" name="refund" v-model="paramsRefunds">
                            <span class="button">{{data.text}}</span>
                        </label>
                    </dd>
                    <dt>机构类型</dt>
                    <dd class="clear_fix">
                        <label v-for="data in temparams.institutions" @change="selectInstitutions(data.value)">
                            <input type="checkbox" :value="data.value" v-model="paramsInstitutions">
                            <span class="button">{{data.text}}</span>
                        </label>
                    </dd>
                </dl>
            </div>
            <div class="foot_btn">
                <span class="reset" @click="resetParams()">重置</span>
                <span class="search" @click="paramsSearch()">匹配</span>
            </div>
        </div>
    </section>
</template>

<script>
var Cookie = require('../lib/cookie');
var Config = require('../config/globalMain');
var utility = require('../config/utility');

require("expose-loader?$!../lib/zepto");
require('../lib/swipeSlide');

module.exports = {
    props : ['listconfig'],
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

            _.each(searchParams,function(value,key){
                if(!!value) temParams[key] = value;
            })
            that.temParams = temParams;
  
        }
        that.getData();

        if(this.listconfig.img){
            that.getSwiper();
        } 

        $(window).on('scroll',function(e){
            var wh = $(window).height()
            if(!that.btn.showMore){
                return false;
            }
            if(window.location.href.indexOf('searchList') > 0){

                if(document.body.scrollTop >= ($('.search_list').height() - wh + 90)){
                    that.page++;
                    that.getData();
                }
            }else{
                if(document.body.scrollTop >= ($('.search_list').height() - wh - 40)){
                    that.page++;
                    that.getData();
                }
            }

        });

        
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
    data : function(){
        return {
            btn : {
                showPerson : false,
                showAssets : false,
                showCredis : false,
                showMore   : false
            },
            datas : [],
            productlist : [],
            temParams : {},
            temPeople : [],
            temAssets : [],
            temCredit : [],
            swiperArray : [],
            showData : {
                first : false,
                second : false,
                third : false,
                mask : false
            },
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
                amount : ''
            },
            paramsTerms : [],
            paramsRefunds : [],
            paramsInstitutions : []


        }
    },
    watch : {

    },
    methods : {
        menuan1 : function(params){
          
        },
        closeMask : function(event){
            this.showData = {
                first : false,
                second : false,
                third : false,
                mask : false
            }
        },
        closeli : function(){
            this.closeMask();
        },
        // showMoreList : function(){
        //     console.log(1111)
        //     this.page++;

        //     this.getData();
        // },
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
                    that.btn.showPerson = false;
                    that.btn.showAssets =false;
                    that.btn.showCredis = false;
                    if(res.body.data.data.length == that.size){
                        that.btn.showMore = true;
                    }else{
                        that.btn.showMore = false;   
                    }
                },200)
                
            },function(res){

            });
        },
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
        selectPeople : function(value){

            this.closeMask()

            if(this.temPeople.length > 1){
                this.temPeople.shift();
            }
            this.productlist = [];
            this.page = 1;
            this.temParams.peoples = this.temPeople[0];
            this.getData();

        },
        selectAssets : function(value){

            this.closeMask()

            if(this.temAssets.length > 1){
                this.temAssets.shift();
            }

            this.productlist = [];
            this.page = 1;
            this.temParams.assets = this.temAssets[0];
            this.getData();
        },
        selectCredit : function(newValue){

            this.closeMask();

            if(this.temCredit.length > 1){
                this.temCredit.shift();
            }
            this.productlist = [];
            this.page = 1;
            this.temParams.credits = this.temCredit[0];
            this.getData();
        },
        keywordSearch : function(){
            this.searchParams.keyword = this.keyword;
            // console.log(JSON.stringify(this.searchParams))
            window.location.href="/searchResult.html?searchParams=" + JSON.stringify(this.searchParams)
        },
        paramsSearch : function(){
            this.searchParams.amount = this.amountCoupute;
            this.searchParams.terms = this.termsCoupute;
            window.location.href="/searchResult.html?searchParams=" + JSON.stringify(this.searchParams)
        },
        resetParams : function(){
            this.searchParams = {};
            this.paramsRefunds = [];
            this.paramsInstitutions = [];
            this.paramsTerms = [];
        },
        selectRefund : function(value){
            if(this.paramsRefunds.length > 1){
                this.paramsRefunds.shift();
            }
            this.searchParams.refunds = this.paramsRefunds[0];
        },
        selectInstitutions : function(){
            if(this.paramsInstitutions.length > 1){
                this.paramsInstitutions.shift();
            }
            this.searchParams.institutions = this.paramsInstitutions[0];
        }
    },
    computed : {
        amountCoupute : function(){
            return this.temparams.amount;
        },
        termsCoupute : function(){
            if(this.paramsTerms.length == 1){
                return this.paramsTerms[0];
            }else if(this.paramsTerms.length >= 2){
                return Math.min.apply(null,this.paramsTerms) + "," + Math.max.apply(null,this.paramsTerms)
            }
            
        }
    }
}


</script>

<style scoped>
.search_list{
    position: relative;
    min-height: 100%;
}
.search_list .banner{
    width: 100%;
}
.search_list .search_total{
    background: #e1e0e0;
    font-size: .12rem;
    padding: 10px;
}
.search_list .pulldown_search{
    background: #FFF;
    padding: 5px 0;
}
.search_list .pulldown_search i{
    border-top: 8px solid #000;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    height: 0;
    width: 0;
    display: inline-block;
    margin-left: 5px;
}

.search_list .pulldown_search .pull_ul .pull_li{
    border-right:1px solid #adadad;
    float: left;
    width: 25%;
    text-align: center;
    font-size: .14rem;
    line-height: 30px;
    height: 30px;
    position: relative;
    z-index: 3;
}
.search_list .pulldown_search.pulldown_search_three .pull_ul .pull_li{
    width: 33.33%
}
.search_list .pulldown_search .pull_ul .pull_li label{
    display: block;
    width: 100%;
    height: 100%;
}
.search_list .pulldown_search .pull_ul .pull_li input{
    position: absolute;
    display: none;
}
.search_list .pulldown_search .pull_ul .pull_li span{
    display: block;
    width: 100%;
    height: 100%;
}
.search_list .pulldown_search .pull_ul .pull_li input:checked + span{
    color: #60a7c1;
}
.search_list .pulldown_search .pull_ul .pull_li:last-child{
    border-right:0;
}
.search_list .pulldown_search .pull_ul .pull_li .pull_subul{
    position: absolute;
    width: 100%;
    top: 30px;
    left: 0;
    background: #FFF;
    z-index: 2;
/*    display: none;*/
}
.search_list .pulldown_search .pull_ul .pull_li .pull_subul .pull_subli{
    border-bottom: 1px solid #000;
}
.search_list .pulldown_search .pull_ul .pull_li .pull_subul .pull_subli:last-child{
    border-bottom: 0;
}
.search_list .product_list{
    padding-left: 10px;
    padding-right: 10px;

}
.search_list .product_list li {
    border-bottom: 1px solid #000;
    padding: 10px 0;
    position: relative;
    height: 80px;
}
.search_list .product_list li a{
    display: block;
    width: 100%;
    height: 100%;
}
.search_list .product_list li:last-child{
    border-bottom: 0;
}
.search_list .product_list li div{
    float: left;
}
.search_list .product_list li .product_img{
    width: 60px;
    height: 60px;
    position: absolute;
}
.search_list .product_list li .product_img img{
    display: block;
    width: 100%;
    height: 100%;
}
.search_list .product_list li .product_img{
    border: 1px solid #b6b5b5;
}
.search_list .product_list li .product_module{
    padding-left: 70px;
    width: 100%;
}
.search_list .product_list li .product_module h2{
    font-size: .16rem;
    width: 100%;
    margin-bottom: 5px;
    position: relative;
    padding-right: 1rem;
}
.search_list .product_list li .product_module h2 span.title_model{
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: .18rem;
}
.search_list .product_list li .product_module h2 span.link{
    float: right;
    font-size: .10rem;
    width: 1.0rem;
    position: absolute;
    right: 0;
    top: 0;
    color: #939393;
}
.search_list .product_list li .product_module h2 i{
    border: 1px solid #ba8445;
    color: #ba8445;
    display: inline-block;
    font-size: .11rem;
    margin-left: 5px;
    padding: 2px 4px;
    vertical-align: middle;
}
.search_list .product_list li .product_module div{
    width: 50%;
    float: left;
    height: 20px;
}

.search_list .load_more{
    display: block;
    text-align: center;
    line-height: 40px;
    line-height: 40px;
    font-size: .14rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.collect_icon{
    position: fixed;
    bottom: 50px;
    right: 10px;
    width: 45px;
    height: 45px;
    border-radius: 50px;
    border:  1px solid #7b7b7b;
    background: #FFF;
    z-index: 2px;
    text-align: center;
}
.collect_icon i{
    background: url(/static/images/collect.jpg) no-repeat;
    background-size: 100%;
    width: 20px;
    height: 19px;
    display: block;
    margin: 2px auto;
}
.slider_wrap {
    overflow: hidden;
    position: relative;
}
.slider_wrap:after {
    content: '';
    display: block;
    width: 100%;
    padding-top: 40%;
}
.slider_wrap .slider_inner, .slider_wrap .slider_inner .slider_item {
    position: absolute;
    width: 100%;
    height: 100%;
}
.slider_wrap .slider_inner, .slider_wrap .slider_inner .slider_item a{
    display: block;
}
.slider_wrap .slider_inner .slider_item:first-of-type {
    z-index: 1;
}
.slider_wrap .slider_inner .slider_item img {
    width: 100%;
    height: auto;
}

.slider_wrap .dots {
    text-align: center;
    position: absolute;
    bottom: .04rem;
    left: 0;
    z-index: 2;
    width: 100%;
}
.slider_wrap .dots span {
    display: inline-block;
    width: .06rem;
    height: .06rem;
    border-radius: 100%;
    margin-right: .05rem;
    background: rgba(255,255,255,0);
    border: 1px solid rgba(96,167,193,.5);
}
.slider_wrap .dots span.active{
    background: #60a7c1;
}
.global_mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 40px;
    left: 0rem;
    background: #000;
    opacity: .5;
    filter: alpha(opacity=50);
}

.fast_search{
    padding-bottom: 40px;
}
.fast_search .search_keyword {
    padding: 10px;
    border-bottom: 5px solid #aeadad;
}
.fast_search .search_keyword .keyword_title{
    float: left;
    width: 30%;
    line-height: 36px;
    padding-right: 10px;
    text-align: center;
    color:#000;
}
.fast_search .search_keyword .keyword_input{
    float: left;
    width: 70%;
    border:1px solid #aeadad;
    border-radius: 10px;
    height: 36px;
    padding: 0 65px 0 5px;
    overflow: hidden;
    position: relative;
}
.fast_search .search_keyword .keyword_input input{
    height: 30px;
    margin-top: 3px;
    width: 100%;
}
.fast_search .search_keyword .keyword_input::-webkit-input-placeholder{
  color: #b6b3b3;
}
.fast_search .search_keyword .keyword_input .search_btn{
    background: #718d97;
    color: #FFF;
    position: absolute;
    text-align: center;
    width: 60px;
    height: 36px;
    right: 0;
    top: 0;
    line-height: 34px;
}

.fast_search .search_keyword .keyword_prompt{
    color: #b8b8b8;
    margin: 5px;
    margin-top: 15px;
}
.fast_search .search_keyword .keyword_example span{
    width: 33.33%;
    float: left;
    color: #b8b8b8;
    padding: 5px;
}
.fast_search .search_params {
    padding: 10px;
}
.fast_search .search_params .search_price .price_title{
    float: left;
    width: 30%;
    line-height: 36px;
    padding-right: 10px;
    color:#000;
}

.fast_search .search_params .search_price .keyword_input{
    float: left;
    width: 70%;
    border:1px solid #aeadad;
    border-radius: 10px;
    height: 36px;
    padding: 0 65px 0 5px;
    overflow: hidden;
    position: relative;
}
.fast_search .search_params .search_price .keyword_input input{
    height: 30px;
    margin-top: 3px;
    width: 100%;
    text-align: center;
    font-size: .14rem;
}
.fast_search .search_params .search_price .keyword_input::-webkit-input-placeholder{
  color: #b6b3b3;
}
.fast_search .search_params .search_price .keyword_input .search_btn{
    color: #000;
    position: absolute;
    text-align: center;
    width: 60px;
    height: 36px;
    right: 0;
    top: 0;
    line-height: 34px;
}
.fast_search .search_params dl{
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #aeadad;
}
.fast_search .search_params dl dt{
    color: #424242;
    padding: 10px 0;
    font-size: .14rem;
}
.fast_search .search_params dl dd{
    border-bottom: 1px solid #aeadad;
    padding-bottom: 10px;
}
.fast_search .search_params dl dd label{
    width: 25%;
    float: left;
    margin-top: 10px;
}
.fast_search .search_params dl dd label span{
    width: 90%;
    display: block;
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #d5d5d5;
    border-radius: 4px;
    color: #000;
}
.fast_search .search_params dl dd input{
    position: absolute;
    opacity: 0;
}
.fast_search .search_params dl dd input:checked + span{
    background: #718d97;
    color: #FFF;
}
.fast_search .foot_btn{
    /*position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;*/
    height: 38px;
}
.fast_search .foot_btn span{
    text-align: center;
    float: left;
    width: 50%;
    height: 100%;
    font-size: .14rem;
    line-height: 36px;
}
.fast_search .foot_btn span.reset{
    background: #FFF;
    color: #b2b2b2;
    border-top:1px solid #718d97;
}
.fast_search .foot_btn span.search{
    border-top:1px solid #718d97;
    background: #718d97;
    color: #FFF;
}

.search_actionsheet {
  position: fixed;
  right: 0;
  top: 0;
  transform: translate(100%, 0);
  -webkit-transform: translate(100%, 0);
  -o-transform: translate(100%, 0);
  -moz-transform: translate(100%, 0);
  -ms-transform: translate(100%, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 100;
  width: 100%;
  height: 100%;

  -webkit-transition: -webkit-transform 0.3s;
  transition: transform .3s;
}
.search_actionsheet_toggle {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  transform: translate(0, 0);
  -webkit-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  -moz-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
}
.global_action_sheet{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 90px;
    left: 0rem;
    background: #FFF;
    padding-bottom: 90px;
/*    background: #000;*/
    z-index: 100;
    overflow-y: scroll;
    overflow-x: hidden;
/*    opacity: .5;
    filter: alpha(opacity=50);*/
}
</style>

