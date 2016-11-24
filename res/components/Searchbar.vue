<template>   
    <section class="select_model clear_fix">
        <div class="select">
            <input placeholder="请输入贷款金额"/>
            <span>快速申请</span>
        </div>
        <div class="address">
            <i></i>
            {{usercity}}
        </div>
    </section>
</template>

<script>

module.exports = {
    props : ['usercity']
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
.select_model .select input{
    height: 30px;
    width: 100%;
    background: #60a7c1;
    padding-left: 10px;
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
.select_model .address{
    width: 20%;
    float: left;
    text-align: center;
    color: #FFF;
    line-height: 30px;
}

</style>