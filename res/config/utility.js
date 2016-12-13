module.exports = {
    // 获取url参数
    getUrlParam : function(name){
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");  
          var regexS = "[\\?&]" + name + "=([^&#]*)";  
          var regex = new RegExp(regexS);  
          var results = regex.exec(window.location.search);  
          if(results == null)  
            return "";  
          else  
            return decodeURIComponent(results[1].replace(/\+/g, " "));  
    }
}