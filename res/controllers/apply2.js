
/**
    @description 个人申请
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');

import MobileSelect from 'mobile-select'


new Vue({
    el : '.apply2',
    data : {
        user : {
            amount : '', // 额度 
            profession : { // 职业身份
              'name' : '',
            }, 
            house : { // 房产类型
              'name' : ''
            }, 
            provident : { // 公积金
              'name' : ''
            }, 
            social : { //社保
              'name' : ''
            }, 
            car : { //车
              'name' : ''
            },
            credit : { // 信用卡
              'name' : ''
            }, 
            commercial : { // 商业保险
              'name' : ''
            }, 
            creditStatus : { //信用状况
              'name' : ''
            }, 
        }
    },
    watch : {

    },
    created : function(){    
        
    },
    mounted : function(){
      var that = this;
      //职业类型
      var mobileSelect1 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#trigger1', 
          wheels: [
            {data:['上班族','企业主','自由职业']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.profession.name = data[0]
          }
      });
      //房产类型
      var mobileSelect2 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#trigger2', 
          wheels: [
              {data:['商品住宅','商铺','商住两用房','自建房/宅基地','划拨土地房','厂房','无房']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.house.name = data[0]
          }
      });

      //公积金
      var mobileSelect3 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#trigger3', 
          wheels: [
              {data:['是,有本地公积金','否,不缴纳']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.provident.name = data[0]
          }
      });

      // 社保
      var mobileSelect4 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#trigger4', 
          wheels: [
              {data:['是,有本地社保','否,没有']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.social.name = data[0]
          }
      });

      //车
      var mobileSelect5 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#trigger5', 
          wheels: [
              {data:['是,有车','否,没车']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.car.name = data[0]
          }
      });

      // 信用卡
      var mobileSelect6 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#trigger6', 
          wheels: [
              {data:['是,有信用卡','否']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.credit.name = data[0]
          }
      });

      // 商业保险
      var mobileSelect7 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#trigger7', 
          wheels: [
              {data:['是,有商业保险','否']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.commercial.name = data[0]
          }
      });

      // 信用状况
      var mobileSelect8 = new MobileSelect({
          triggerDisplayData : false,
          trigger: '#trigger8', 
          wheels: [
              {data:['1年内逾期超过3次或超过90天','一年内逾期少于3次且少于90天','无信用卡或贷款','信用良好，无逾期']}
          ],
          position:[0], //初始化定位
          callback : function(indexArr,data){
            that.user.creditStatus.name = data[0]
          }
      });
    },
    methods : {
        nextStep : function(){
          var isGoOn = true;
          for(var key in this.user){
            if(key == 'amount'){
              if(!this.user[key]){
                Toast.show('请填写完整的信息')
                isGoOn = false
              }
            }else{
              if(!this.user[key].name){
                Toast.show('请填写完整的信息')
                isGoOn = false
              }
            }
          }
          if(!isGoOn){
            return;
          }

          sessionStorage['userForm'] = JSON.stringify(this.user)
          window.location.href = '/apply2_next.html'
        }
    }
})