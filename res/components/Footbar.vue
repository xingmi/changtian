<template>
    <section class="foot_bar">
        <ul class="clear_fix">
            <li><i></i>极速办理</li>
            <li>
                高效申请
                <ul>
                    <li><a href="">个人贷款申请表</a></li>
                    <li><a href="">企业贷款申请表</a></li>
                </ul>
            </li>
            <li>快速匹配</li>
        </ul>

    </section>
</template>

<style scoped>
    .foot_bar{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 35px;
        background: #839fa9;
        padding: 5px 0;
    }
    .foot_bar>ul>li{
        width: 33.33%;
        height: 100%;
        float: left;
        text-align: center;
        border-right: 1px solid #FFF;
        line-height: 26px;
        color: #FFF;
        position: relative;
    }
    .foot_bar>ul>li:last-child{
        border-right: 0;
    }
    .foot_bar>ul>li>ul{
        position: absolute;
        width: 100%;
        bottom: 30px;
    }
    .foot_bar>ul>li>ul>li{
        color: #000;
        background: #839fa9;
        border-bottom:2px solid #FFF;
    }
</style>

<script>
    

</script>