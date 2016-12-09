/**
    @description 个人申请
*/

var Vue    = require('vue');
var Config = require('../config/globalMain');


new Vue({
    el : '.apply_form',
    data : {
        params : {

        },
        configParams : Config.mapData,
        temCredit_registries : [],
        temExpected : []
    },
    watch : {
        temCredit_registries : function(value){
            this.params.credit_registries = value;
        },
        temExpected : function(value){
            this.params.expected = value;
        }
    },
    create : function(){    
        
    },
    methods : {
        select : function(){

        }
    }
})