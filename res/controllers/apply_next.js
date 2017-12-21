
/**
    @description 个人申请
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');

import MobileSelect from 'mobile-select'

var userData = JSON.parse(sessionStorage['userForm'])


if(userData.house.name == '商品住宅' || userData.house.name == '商铺' || userData.house.name == '商住两用房'){
  userData.house.value3 = ''
  userData.house.value4 = ''
  userData.house.value5 = ''
}

if(userData.car.name == '是,有车'){
  userData.car.value1 = ''
  userData.car.value2 = ''
  userData.car.value3 = ''
}

console.log(userData)
new Vue({
    el : '.apply2',
    data : {
        user : userData
    },
    watch : {

    },
    created : function(){
        
    },

    mounted : function(){
      var that = this;

      var house2 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#triggerHouse2', 
          wheels: [
              {data:['全款房','按揭房']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.house.value3 = data[0]
          }
      });

      var house2 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#triggerCar1', 
          wheels: [
              {data:['全款车','按揭车']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.car.value1 = data[0]
          }
      });

    },
    methods : {
        nextStep : function(){
          var data_result = {},all_data = this.user;

          if(userData.house.name == '商品住宅' || userData.house.name == '商铺' || userData.house.name == '商住两用房'){
            if(!all_data.house.value3){
              return Toast.show('请填写完整数据')
            }

            if(all_data.house.value3 != '按揭房'){
              delete all_data.house.value4
              delete all_data.house.value5
            }else{
              if(!all_data.house.value4 || !all_data.house.value5){
                return Toast.show('请填写完整数据')
              }
            }
          }

          for(var key in all_data){
            if(typeof(all_data[key]) == 'object' ){
              data_result[key] = {}
              data_result[key]['name'] = all_data[key]['name'];
              if(data_result[key]['name'] == '上班族'){
                 data_result[key]['value1'] = all_data[key]['value1'];
                 data_result[key]['value2'] = all_data[key]['value2'] && (all_data[key]['value2'] + '万元');
                 data_result[key]['value3'] = all_data[key]['value3'];
                 data_result[key]['value4'] = all_data[key]['value4'] && (all_data[key]['value4'] + '个月');
              }
              if(data_result[key]['name'] == '企业主'){
                 data_result[key]['value5'] = all_data[key]['value5'] && (all_data[key]['value5'] + '万元');
                 data_result[key]['value6'] = all_data[key]['value6'] && (all_data[key]['value6'] + '万元');
                 data_result[key]['value7'] = all_data[key]['value7'] && (all_data[key]['value7'] + '万元');
                 data_result[key]['value8'] = all_data[key]['value8'] && (all_data[key]['value8'] + '万元');
                 data_result[key]['value9'] = all_data[key]['value9'];
                 data_result[key]['value10'] = all_data[key]['value10'];
                 data_result[key]['value11'] = all_data[key]['value11'];
              }
              if(data_result[key]['name'] == '自由职业'){
                 data_result[key]['value12']  = all_data[key]['value12'] && (all_data[key]['value12'] + '万元');
              }

              if(data_result[key]['name'] == '商品住宅' || data_result[key]['name'] == '商铺' || data_result[key]['name'] == '商住两用房'){
                 data_result[key]['value1']  = all_data[key]['value1'];
                 data_result[key]['value2']  = all_data[key]['value2'] && (all_data[key]['value2'] + '万元');
                 data_result[key]['value3']  = all_data[key]['value3'];
              }
              if(data_result[key]['value3'] == '按揭房'){
                 data_result[key]['value4']  = all_data[key]['value4'] && (all_data[key]['value4'] + '万元');
                 data_result[key]['value5']  = all_data[key]['value5'] && (all_data[key]['value5'] + '个月');
              }
              if( data_result[key]['name'] == '自建房/宅基地' || data_result[key]['name'] == '划拨土地房' || data_result[key]['name'] == '厂房' ){
                 data_result[key]['value6']  = all_data[key]['value6'] && (all_data[key]['value6'] + '万元');
              }

              if(data_result[key]['name'] == '是,有本地公积金'){
                 data_result[key]['value1']  = all_data[key]['value1'] && (all_data[key]['value1'] + '个月');
              }

              if(data_result[key]['name'] == '是,有本地社保'){
                 data_result[key]['value1']  = all_data[key]['value1'] && (all_data[key]['value1'] + '个月');
              }

              if(data_result[key]['name'] == '是,有车'){
                 data_result[key]['value1']  = all_data[key]['value1'];
              }

              if(data_result[key]['value1'] == '按揭车'){
                 data_result[key]['value2']  = all_data[key]['value2'] && (all_data[key]['value2'] + '万元');
                 data_result[key]['value3']  = all_data[key]['value3'] && (all_data[key]['value3'] + '个月');
              }

              if(data_result[key]['name'] == '是,有信用卡'){
                 data_result[key]['value1']  = all_data[key]['value1'] && (all_data[key]['value1'] + '万元');
              }

              if(data_result[key]['name'] == '是,有商业保险'){
                 data_result[key]['value1']  = all_data[key]['value1'] && (all_data[key]['value1'] + '万元');
                 data_result[key]['value2']  = all_data[key]['value2'] && (all_data[key]['value2'] + '个月');
              }
            }else{
              data_result[key] = all_data[key] + '万元'
            }
          }

          var iscomplate = true
          for(var firstKey in data_result){
            if(typeof(data_result[firstKey]) == 'object'){
              for(var secondKey in data_result[firstKey]){
                if(!data_result[firstKey][secondKey]){
                  iscomplate = false
                }
              }
            }else{
              if( !data_result[firstKey]){
                iscomplate = false
              }
            }
          }

          if(!iscomplate){
            Toast.show('请填写完整的数据')
          }else{
            sessionStorage['user_post_data'] = JSON.stringify(data_result)
            window.location.href = '/register.html?applySource=apply2';
          }
          
        }
    }
})