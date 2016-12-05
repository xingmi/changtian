var env = require('./env');
var Cookie = require('../lib/cookie');

// vue-resource 不支持同步调用 用原生代替
var Ajax={
    get: function (url,fn){
        var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
        obj.open('GET',url,false);
        obj.onreadystatechange=function(){
            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState==4说明请求已完成
                fn.call(this, obj.responseText);  //从服务器获得数据
            }
        };
        obj.send(null);
    }
}


// 过期时间为一天
if(!Cookie('mapData')){
    Ajax.get(env.api+'constants.json',function(datas){
        var datas = JSON.parse(datas);
        console.log(datas)
        Cookie('mapData',datas.data,{ expires: 1});
    })
}