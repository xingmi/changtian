var Vue = require('vue');
var utility = require('../config/utility');
var Config = require('../config/globalMain');

require('../config/date');

new Vue({
    el : '.new_detail',
    data : {
      id   : utility.getUrlParam('id'),
      newsDetail : {}
    },
    created : function(){
      this.getData()
    },
    methods : {
      getData : function(){        
        this.$http.get(Config.api + 'articles/' + this.id)
        .then(function(res){
            if(res.body.code == 0){   
              this.newsDetail = res.body.data
            }
        },function(){

        }).bind(this);
      }
    }
});