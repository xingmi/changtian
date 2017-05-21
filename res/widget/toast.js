var Lodash = require('../lib/lodash');
var $  = require('../lib/zepto');

module.exports = {
    show: function(title, times, callback) {
        var that = this;
        var html = '<div class="global_toast">' + title + '</div>';
        if(!$(".global_toast").length){
            $('body').append(html);

            setTimeout(function(){
                that.hide();
                if (callback && _.isFunction(callback)) {
                    callback();
                }
            }, times || 1500)
        }  
    },

    hide : function(){
        $(".global_toast").remove();
    }
}