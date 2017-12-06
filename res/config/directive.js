var Vue  = require('vue');

Vue.directive('inputclass',{
    bind : function(el){
        if(el.value.indexOf('请') >= 0 || !el.value ){
            el.className = 'font_gray'
        }
    }
})