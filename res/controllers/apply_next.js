
/**
    @description 个人申请
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');

import MobileSelect from 'mobile-select'

var userData = JSON.parse(sessionStorage['userForm'])

for(var key in userData){
  for(var i = 1; i < 15; i++){
    if(typeof(userData[key]) == 'object')
    userData[key]['value' + i] = '';
  }
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
      //职业类型
      // var mobileSelect1 = new MobileSelect({
      //     triggerDisplayData : false,
      //     trigger: '#trigger1', 
      //     wheels: [
      //       {data:['上班族','企业主','自由职业']}
      //     ],
      //     position:[0], //初始化定位
      //     callback : function(indexArr,data){
      //       that.user.profession.name = data[0]
      //     }
      // });
      // //房产类型
      // var mobileSelect2 = new MobileSelect({
      //     triggerDisplayData : false,
      //     trigger: '#trigger2', 
      //     wheels: [
      //         {data:['商品住宅','商铺','商住两用房','自建房/宅基地','划拨土地房','厂房','无房']}
      //     ],
      //     position:[0], //初始化定位
      //     callback : function(indexArr,data){
      //       that.user.house.name = data[0]
      //     }
      // });

      // //公积金
      // var mobileSelect3 = new MobileSelect({
      //     triggerDisplayData : false,
      //     trigger: '#trigger3', 
      //     wheels: [
      //         {data:['是,有本地公积金','否,不缴纳']}
      //     ],
      //     position:[0], //初始化定位
      //     callback : function(indexArr,data){
      //       that.user.provident.name = data[0]
      //     }
      // });

      // // 社保
      // var mobileSelect4 = new MobileSelect({
      //     triggerDisplayData : false,
      //     trigger: '#trigger4', 
      //     wheels: [
      //         {data:['是,有本地社保','否,没有']}
      //     ],
      //     position:[0], //初始化定位
      //     callback : function(indexArr,data){
      //       that.user.social.name = data[0]
      //     }
      // });

      // //车
      // var mobileSelect5 = new MobileSelect({
      //     triggerDisplayData : false,
      //     trigger: '#trigger5', 
      //     wheels: [
      //         {data:['是,有车','否,没车']}
      //     ],
      //     position:[0], //初始化定位
      //     callback : function(indexArr,data){
      //       that.user.car.name = data[0]
      //     }
      // });

      // // 信用卡
      // var mobileSelect6 = new MobileSelect({
      //     triggerDisplayData : false,
      //     trigger: '#trigger6', 
      //     wheels: [
      //         {data:['是,有信用卡','否']}
      //     ],
      //     position:[0], //初始化定位
      //     callback : function(indexArr,data){
      //       that.user.credit.name = data[0]
      //     }
      // });

      // // 商业保险
      // var mobileSelect7 = new MobileSelect({
      //     triggerDisplayData : false,
      //     trigger: '#trigger7', 
      //     wheels: [
      //         {data:['是,有商业保险','否']}
      //     ],
      //     position:[0], //初始化定位
      //     callback : function(indexArr,data){
      //       that.user.commercial.name = data[0]
      //     }
      // });

      // // 信用状况
      // var mobileSelect8 = new MobileSelect({
      //     triggerDisplayData : false,
      //     trigger: '#trigger8', 
      //     wheels: [
      //         {data:['1年内逾期超过3次或超过90天','一年内逾期少于3次且少于90天','无信用卡或贷款','信用良好，无逾期']}
      //     ],
      //     position:[0], //初始化定位
      //     callback : function(indexArr,data){
      //       that.user.creditStatus.name = data[0]
      //     }
      // });

      var ala1 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#triggerProfession1', 
          wheels: [
              {data:['银行代发','转账工资','现金发放']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.$nextTick(function () {
              that.user.profession.value1 = data[0]
            })
            
          }
      });

      var ala2 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#triggerProfession2', 
          wheels: [
              {data:['国营','民营','事业','外资']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.profession.value3 = data[0]
          }
      });

      var ala3 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#triggerProfession3', 
          wheels: [
              {data:['1年以内','1-2年','2年以上']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.profession.value3 = data[0]
          }
      });

      var ala4 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#triggerProfession4', 
          wheels: [
              {data:['大型企业，央企，国企，500强','一般纳税人资质企业','小微企业']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.profession.value10 = data[0]
          }
      });

      var ala5 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#triggerProfession5', 
          wheels: [
              {data:['5-20万元','20-100万元','100万元以上']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.profession.value11 = data[0]
          }
      });

      var house1 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#triggerHouse1', 
          wheels: [
              {data:['6月以下','1年以下','1年以上']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.house.value1 = data[0]
          }
      });

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

          console.log(data_result)
          Toast.show('提交成功，请耐心等待')
          
        }
    }
})