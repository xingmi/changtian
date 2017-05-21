// var Cookie = require('../lib/cookie');
// var env = require('../config/env');
// var utility = require('../config/utility');
// var Ajax = require('../config/ajax');

// // vue-resource 不支持同步调用 用原生代替

// // 获取用户定位
// // function getLocation(callback){
// //     if(navigator.geolocation){
// //         navigator.geolocation.getCurrentPosition(
// //             function(p){
// //                 callback(p.coords.latitude, p.coords.longitude);
// //             },
// //             function(e){
// //                 callback(31,121)
// //                //  var msg = e.code + "\n" + e.message;
// //                // alert('定位失败')
// //             }
// //         );
// //     }
// // }

// if(!sessionStorage['mapData']){
//     // getLocation(function(lat,lng){
//         Ajax.get(env.api+'constants.json?lat='+31.78+ "&lng="+119.95,function(datas){
//             var datas = JSON.parse(datas);
//             //Cookie('mapDataExpires',true,{ expires: new Date(new Date().getTime() + 10 * 60 * 1000) });
//             sessionStorage['mapData'] = JSON.stringify(datas.data);
//             window.location.href= utility.getUrlParam('page_ref')
//         })
//     // })
// }else{
//     window.location.href= utility.getUrlParam('page_ref')
// }






