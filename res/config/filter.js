var Vue  = require('vue');
var Cookie = require('../lib/cookie');
var Lodash = require('../lib/lodash');

var mapData = JSON.parse(localStorage['mapData'])

// 格式化金钱
Vue.filter('moneyFormat',function(money){
    return money < 9999 ? money : (money/10000) + "万"
})

// 贷款人群    
Vue.filter('peopleValue',function(typeId){
    console.log(typeId)
    if(typeId){
        return _.result(_.find(mapData.peoples,{'value': typeId.toString()}),'text')
    }else{
        return '未知';
    }
})

// 还款类型    
Vue.filter('refundsValue',function(typeId){
    if(typeId){
        return _.result(_.find(mapData.refunds,{'value': typeId.toString()}),'text')
    }else{
        return '未知';
    }
})

// 资产贷款    
Vue.filter('assetsValue',function(typeId){
    if(typeId){
        return _.result(_.find(mapData.assets,{'value': typeId.toString()}),'text')
    }else{
        return '未知';
    }
})

// 贷款类型
Vue.filter('loanValue',function(typeId){
    if(typeId){
        return _.result(_.find(mapData.loanType,{'value': typeId.toString()}),'text')
    }else{
        return '未知';
    }
})

//征信情况
Vue.filter('creditRegistriesValue',function(typeId){
    if(typeId){
        return _.result(_.find(mapData.credit_registries,{'value': typeId.toString()}),'text')
    }else{
        return '请选择';
    }
})

//期望融资时间
Vue.filter('expectedValue',function(typeId){
    if(typeId){
        return _.result(_.find(mapData.expected,{'value': typeId.toString()}),'text')
    }else{
        return '请选择';
    }
})

//所属行业
Vue.filter('tradeValue',function(typeId){
    if(typeId){
        return _.result(_.find(mapData.trade,{'value': typeId.toString()}),'text')
    }else{
        return '请选择';
    }
})