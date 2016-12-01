var Vue  = require('vue');
var Cookie = require('../lib/cookie');
var Lodash = require('../lib/lodash');
var getData = require('./getData');

var mapData = JSON.parse(Cookie('mapData'));

// 格式化金钱
Vue.filter('moneyFormat',function(money){
    return money < 9999 ? money : (money/10000) + "万"
})

// 还款类型    
Vue.filter('refundsValue',function(typeId){
    if(_.isNumber(typeId)){
        return _.result(_.find(mapData.refunds,{'value': typeId.toString()}),'text')
    }else{
        return '未知';
    }
})

// 贷款类型
Vue.filter('loanValue',function(typeId){
    if(_.isNumber(typeId)){
        return _.result(_.find(mapData.loanType,{'value': typeId.toString()}),'text')
    }else{
        return '未知';
    }
})