<template>   
    <section class="select_model clear_fix">
        <div class="select">
            <i class="search_icon"></i>
            <div class="input_model">
                <input placeholder="请输入贷款金额" v-model="amount"/>
                <i class="search_price">万</i>
            </div>
            <span @click='fastSearch'>快速申请</span>
        </div>
        <div class="address">
            <i></i>
            {{usercity}}
        </div>
    </section>
</template>

<script>

var Config = require('../config/globalMain');
module.exports = {
    // props : ['usercity'],
    data : function(){
        return {
            amount : '',
            searchParams : {},
            usercity : Config.currentCity.text
        }
    },
    methods : {
        fastSearch : function(){
            this.searchParams.amount = this.amount*10000;
            window.location.href="/searchResult.html?searchParams=" + JSON.stringify(this.searchParams)
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
    padding-right: 70px;
    height: 30px;
}
.select_model .select .input_model{
    height: 30px;
    width: 100%;
    background: #60a7c1;
    padding-left: 26px;
    color: #FFF;
}
.select_model .select .input_model input{
    width: 95px;
    background: none;
    margin-top: 7px;
    color: #FFF;
}

.select_model .select span{
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
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
    margin-left: 18px;
}
.select_model .address{
    width: 20%;
    float: left;
    text-align: center;
    color: #FFF;
    line-height: 30px;
}
.select_model .address i{
    width: 13px;
    height: 14px;
    display: inline-block;
    background: url(/static/images/address.png) no-repeat;
    background-size: 100%;
    vertical-align: middle;
}

</style>