var Vue = require('vue');
var Cookie = require('../lib/cookie');
var Config = require('../config/globalMain');

console.log(Config.mapData)
new Vue({
    el : '.fast_search',
    data : {
        temparams:{
            institutions : Config.mapData.institutions,
            refunds : Config.mapData.refunds,
            terms : Config.mapData.terms
        },
        paramsTerms : [],
        paramsRefunds : 0,
        paramsInstitutions : 0
        
    },
    watch : {
        paramsInstitutions: function(newValue){
            
        },
        paramsRefunds : function(newValue){
            console.log(this.paramsRefunds)
        },
        paramsTerms : function(newValue){
            console.log(this.paramsRefunds)
        }
    },
    methods : {

    }
}); 