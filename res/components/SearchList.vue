<template>
    <section class="search_list">
        <div class="pulldown_search" v-if="listconfig.search_bar">
            <ul class="pull_ul clear_fix">
                <li class="pull_li" >
                <span @click="btn.showPerson = !btn.showPerson">贷款人群<i></i></span>
                <transition name="fade">
                    <ul class="pull_subul" v-if="btn.showPerson" transition="fade">
                        <li class="pull_subli" v-for="people in datas.peoples">
                            <label @change="selectPeople(people.value)">
                                <input type="checkbox" :value="people.value" v-model="temPeople"/>
                                <span>{{people.text}}</span>
                            </label>
                        </li>
                    </ul>
                </transition>
                </li>
                <li class="pull_li">
                <span @click="btn.showAssets = !btn.showAssets">资产贷款<i></i></span>
                <transition name="fade">
                    <ul class="pull_subul" v-if="btn.showAssets">
                        <li class="pull_subli" v-for="asset in datas.assets">
                            <label @change="selectAssets(asset.value)">
                                <input type="checkbox" :value="asset.value" v-model="temAssets"/>
                                <span>{{asset.text}}</span>
                            </label>
                        </li>
                    </ul>
                </transition>
                </li>
                <li class="pull_li">
                <span @click="btn.showCredis = !btn.showCredis">信用贷<i></i></span>
                <transition name="fade">
                    <ul class="pull_subul" v-if="btn.showCredis">
                        <li class="pull_subli" v-for="credit in datas.credits">
                            <label>
                                <input type="checkbox" :value="credit.value" v-model="temCredit"/>
                                <span>{{credit.text}}</span>
                            </label>
                        </li>
                    </ul>
                </transition>
                </li>
            </ul>
        </div>
        <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png" class="banner" v-if="listconfig.img">
        <p class="search_total">共有{{productlist.length}}个结果</p>
        <div class="product_list">
            <ul>
                <li class="clear_fix" v-for="product in productlist">
                    <a :href="'/product.html?id='+product.id">
                        <div class="product_img">
                            <img :src="product.icon">
                        </div>
                        <div class="product_module">
                            <h2>{{product.name}} <i>{{product.type | loanValue}}</i> <span>展开全文</span></h2>
                            <div>额度：{{product.minAmount | moneyFormat}}-{{product.maxAmount | moneyFormat}}</div>
                            <div>月息：{{product.interest}}%</div>
                            <div>还款方式：{{ product.refundType | refundsValue}}</div>
                            <div>放款速度：{{product.lendintDate}}天</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>

        <a class="collect_icon" href="/collectList.html">
            <i></i>
            收藏
        </a>
    </section>

</template>

<script>
var Cookie = require('../lib/cookie');
var Config = require('../config/globalMain');
var utility = require('../config/utility');

module.exports = {
    props : ['listconfig'],
    created : function(){
        var that = this;
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
    },
    data : function(){
        return {
            btn : {
                showPerson : false,
                showAssets : false,
                showCredis : false
            },
            datas : Config.mapData,
            productlist : [],
            temParams : {
                "city" : Config.currentCity.value
            },
            temPeople : [],
            temAssets : [],
            temCredit : []
        }
    },
    watch : {
        temCredit : function(newValue){
            this.temParams.credis = eval(newValue.join('+'));
            this.getData();
        }
    },
    methods : {
        getData : function(){
            var that = this;
            that.$http.get(Config.api+ 'products.json',{
                params : that.temParams
            }).then(function(res){
                that.productlist = res.body.data;

                setTimeout(function(){
                    that.btn.showPerson = false;
                    that.btn.showAssets =false;
                    that.btn.showCredis = false;
                },200)
                
            },function(res){

            });
        },
        selectPeople : function(value){
            if(this.temPeople.length > 1){
                this.temPeople.shift();
            }
            this.temParams.peoples = this.temPeople[0];
            this.getData();
        },
        selectAssets : function(value){
            if(this.temAssets.length > 1){
                this.temAssets.shift();
            }
            this.temParams.peoples = this.temAssets[0];
            this.getData();
        }
    }
}


</script>

<style scoped>
.search_list{

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
    border-right:1px solid #000;
    float: left;
    width: 33.33%;
    text-align: center;
    font-size: .14rem;
    line-height: 30px;
    height: 30px;
    position: relative;
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
.search_list .pulldown_search .pull_ul .pull_li input:checked + span{
    color: red;
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
    z-index: 1;
}
.search_list .product_list{
    padding: 0 10px;

}
.search_list .product_list li {
    border-bottom: 1px solid #000;
    padding: 10px 0;
    position: relative;
    height: 80px;
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
}
.search_list .product_list li .product_module h2 span{
    float: right;
    font-size: .10rem;
    margin-top: 4px;
}
.search_list .product_list li .product_module h2 i{
    border: 1px solid #ba8445;
    color: #ba8445;
    display: inline-block;
    font-size: .12rem;
    margin-left: 5px;
    padding: 2px 4px;
}
.search_list .product_list li .product_module div{
    width: 50%;
    float: left;
    height: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.collect_icon{
    position: fixed;
    bottom: 40px;
    right: 10px;
    width: 50px;
    height: 50px;
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
    margin: 5px auto;
}
</style>

