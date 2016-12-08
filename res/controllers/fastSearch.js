var Vue = require('vue');
var Cookie = require('../lib/cookie');
var Config = require('../config/globalMain');

console.log(Config.mapData)
new Vue({
    el : '.fast_search',
    data : {
        keyword : '',
        searchParams : {
        },
        temparams:{
            institutions : Config.mapData.institutions,
            refunds : Config.mapData.refunds,
            terms : Config.mapData.terms
        },
        paramsTerms : [],
        paramsRefunds : [],
        paramsInstitutions : []
        
    },
    watch : {
        paramsTerms : function(newValue){
            // this.searchParams.terms = newValue
        }
    },
    methods : {
        keywordSearch : function(){
            this.searchParams.keyword = this.keyword
            window.location.href="/searchResult.html?searchParams=" + JSON.stringify(this.searchParams)
        },
        paramsSearch : function(){
            window.location.href="/searchResult.html?searchParams=" + JSON.stringify(this.searchParams)
        },
        resetParams : function(){
            this.searchParams = {};
            this.paramsRefunds = [];
            this.paramsInstitutions = [];
            this.paramsTerms = [];
        },
        selectRefund : function(value){
            if(this.paramsRefunds.length > 1){
                this.paramsRefunds.shift();
            }
            this.searchParams.refunds = this.paramsRefunds[0];
        },
        selectInstitutions : function(){
            if(this.paramsInstitutions.length > 1){
                this.paramsInstitutions.shift();
            }
            this.searchParams.institutions = this.paramsInstitutions[0];
        }
    }
}); 