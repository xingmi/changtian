<template>
    <section class="foot_bar">
        <ul class="clear_fix">
            <li><a href="/personApply.html"><i class="first"></i>个人贷款申请表</a></li>
            <li><a href="/companyApply.html"><i class="first"></i>企业贷款申请表</a></li>
        </ul>

    </section>
</template>

<style scoped>
    .foot_bar{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        background: #839fa9;
        padding: 6px 0;
        z-index: 1
    }
    .foot_bar>ul>li{
        width: 50%;
        height: 100%;
        float: left;
        text-align: center;
        border-right: 1px solid #FFF;
        line-height: 28px;
        color: #FFF;
        position: relative;
    }
    .foot_bar>ul>li a{
        display: block;
        width: 100%;
        height: 100%;
    }
    .foot_bar>ul>li i{
        background: url(/static/images/search_foot_icon.png) no-repeat;
        width: 23px;
        height: 25px;
        display: inline-block;
        background-size: 69px 26px;
        vertical-align: middle;
        margin-right: 5px;
    }
    .foot_bar>ul>li i.first{
        background-position: left top;
    }
    .foot_bar>ul>li i.second{
        background-position: center top;
    }
    .foot_bar>ul>li i.third{
        background-position: right top;
    }

    .foot_bar>ul>li:last-child{
        border-right: 0;
    }
    .foot_bar>ul>li>ul{
        position: absolute;
        width: 100%;
        bottom: 34px;
        z-index: 1;
    }
    .foot_bar>ul>li>ul>li{
        color: #000;
        background: #839fa9;
        border-bottom:2px solid #FFF;
        height: 38px;
        line-height: 38px;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .2s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>

<script>
module.exports = {
    data : function(){
        return {
            show : false
        }
    }
}

</script>