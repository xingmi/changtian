<template>
    <section class="search_list">
        <div class="pulldown_search">
            <ul>
                <li>贷款人群<i></i></li>
                <li>资产贷款<i></i></li>
                <li>信用贷<i></i></li>
            </ul>
        </div>
        <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png" class="banner">
        <p class="search_total">共有30个结果</p>
        <div class="product_list">
            <ul>
                <li class="clear_fix" v-for="product in productlist">
                    <a :href="'/product.html?id='+product.id">
                        <div class="product_img">
                            <img :src="product.icon">
                        </div>
                        <div class="product_module">
                            <h2>{{product.name}} <i>信用贷</i> <span>展开全文</span></h2>
                            <div>额度：{{minAmount}}-{{maxAmount}}W</div>
                            <div>月息：0.56%</div>
                            <div>还款方式：等额本息</div>
                            <div>放款速度：3天</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>

    </section>

</template>

<script>

module.exports = {
    props : ['productlist']
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
    height: 30px;
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
.search_list .pulldown_search>ul>li{
    border-right:1px solid #000;
    float: left;
    width: 33.33%;
    text-align: center;
    font-size: .14rem;
    line-height: 30px;
}
.search_list .pulldown_search>ul>li:last-child{
    border-right:0;
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
</style>

