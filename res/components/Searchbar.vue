<template>   
    <section class="select_model clear_fix">
        <div class="select">
            <i class="search_icon"></i>
            <div class="input_model">
                <input placeholder="请输入贷款金额" v-model="amount"/>
                <i class="search_price">万</i>
            </div>
            <span @click='fastSearch'>搜&nbsp;&nbsp;索</span>
        </div>
        <div class="address" @click="showCity()">
            <i></i>
            {{usercity}}
        </div>

        <div class="city_list city_actionsheet">
            <div class="" @click="hideCity()"></div>
            <ul>
                <li style="text-align:center">请选择城市</li>
                <li v-for="(provincial,index) in cities">
                    <h4>{{provincial.name}}</h4>
                    <span v-for="(city,i) in provincial.cities" @click="selectCity(index,i)">{{city.name}}</span>
                </li>
            </ul>
        </div>
            
    </section>
</template>

<script>

var Config = require('../config/globalMain');
import $ from '../lib/zepto';

module.exports = {
    // props : ['usercity'],
    data : function(){
        return {
            amount : '',
            searchParams : {},
            usercity : Config.currentCity.name,
            cities : Config.mapData.cities
        }
    },
    methods : {
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
            _.extend(Config.mapData.current,Config.mapData.cities[index].cities[i]);
            localStorage['mapData'] = JSON.stringify(Config.mapData);
            window.location.replace("/searchList.html?newDate=" + new Date().getTime());

        }
    }

}



</script>

<style scoped>

.select_model{
    background: #839fa9;
    padding: 10px 5%;
}
.select_model .select{
    width: 80%;
    float: left;
    position: relative;
    padding-right: 60px;
    height: 30px;
}
.select_model .select .input_model{
    height: 30px;
    width: 100%;
    background: #60a7c1;
    padding-left: 26px;
    color: #FFF;
    padding-top:6px;
}
.select_model .select .input_model input{
    width: 100px;
    background: none;
    color: #FFF;
    height: 20px;
    vertical-align: middle;
    line-height: 20px;
    font-size: .12rem;
}

.select_model .select span{
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 30px;
    display: block;
    background: #1c93bf;
    color: #FFF;
    font-size: .12rem;
    text-align: center;
    line-height: 30px;
}
.select_model .select .search_icon{
    width: 15px;
    height: 13px;
    background: url(/static/images/search_icon.png) no-repeat;
    background-size: 100%;
    display: block;
    position: absolute;
    top: 10px;
    left: 6px;
}
.select_model .select .search_price{
    width: 15px;
    height: 13px;
    color: #FFF;
    margin-left: 13px;
    vertical-align: middle;
}
.select_model .address{
    width: 20%;
    float: left;
    text-align: center;
    color: #FFF;
    padding-top: 8px;
}
.select_model .address i{
    width: 13px;
    height: 14px;
    display: inline-block;
    background: url(/static/images/address.png) no-repeat;
    background-size: 100%;
    vertical-align: text-bottom;
}

.city_model{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    top: 0;
    left: 0;
    z-index: 3;
    display: none;
}


.city_actionsheet {
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
  z-index: 4;
  width: 100%;
  height: 100%;

  -webkit-transition: -webkit-transform 0.3s;
  transition: transform .3s;
}
.city_actionsheet_toggle {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  transform: translate(0, 0);
  -webkit-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  -moz-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
}
.city_actionsheet div{
    float: left;
    height: 100%;
    width: 70%;
    background-color: rgba(0,0,0,.5);
}
.city_actionsheet ul{
    float: left;
    padding: 0 2px;
    width: 30%;
    height: 100%;
    background-color: #eee;
    overflow: scroll;
}
.city_actionsheet ul li{
    line-height: 30px;
    border-bottom: 1px solid  #8e8e8e;
    padding-left: 5px;
}
.city_actionsheet ul li h4{
    font-weight: bold;
}
.city_actionsheet ul li span{
    display: block;
    padding-left: 10px;
    border-top: 1px solid #8e8e8e;

}
</style>