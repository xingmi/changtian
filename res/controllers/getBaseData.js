var Cookie = require('../lib/cookie');
var env = require('../config/env');
var utility = require('../config/utility');

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

// 获取用户定位
function getLocation(callback){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function(p){
                callback(p.coords.latitude, p.coords.longitude);
            },
            function(e){
               //  var msg = e.code + "\n" + e.message;
               // alert('定位失败')
            }
        );
    }
}

if(!Cookie('mapDataExpires') || !localStorage['mapData']){
    var lat = 11;
    var lng = 22;
    // getLocation(function(lat,lng){
        Ajax.get(env.api+'constants.json?lat='+lat + "&lng="+lng,function(datas){
            var datas = JSON.parse(datas);
            Cookie('mapDataExpires',true,{ expires: 1});
            localStorage['mapData'] = JSON.stringify(datas.data);
            
            window.location.href= utility.getUrlParam('redirect')
        })
    // })
}