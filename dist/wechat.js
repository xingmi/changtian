!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,t,n){Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=42)}({1:function(e,t){e.exports={getUrlParam:function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t="[\\?&]"+e+"=([^&#]*)",n=new RegExp(t),o=n.exec(window.location.search);return null==o?"":decodeURIComponent(o[1].replace(/\+/g," "))}}},16:function(e,t){e.exports={get:function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!1),n.onreadystatechange=function(){(4==n.readyState&&200==n.status||304==n.status)&&t.call(this,n.responseText)},n.send(null)}}},2:function(e,t,n){var o,r;!function(i){var a=!1;if(o=i,r="function"==typeof o?o.call(t,n,t,e):o,!(void 0!==r&&(e.exports=r)),a=!0,e.exports=i(),a=!0,!a){var c=window.Cookies,p=window.Cookies=i();p.noConflict=function(){return window.Cookies=c,p}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}function t(n){function o(t,r,i){var a;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var c=new Date;c.setMilliseconds(c.getMilliseconds()+864e5*i.expires),i.expires=c}try{a=JSON.stringify(r),/^[\{\[]/.test(a)&&(r=a)}catch(e){}return r=n.write?n.write(r,t):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape),document.cookie=[t,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}t||(a={});for(var p=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,u=0;u<p.length;u++){var d=p[u].split("="),l=d.slice(1).join("=");'"'===l.charAt(0)&&(l=l.slice(1,-1));try{var f=d[0].replace(s,decodeURIComponent);if(l=n.read?n.read(l,f):n(l,f)||l.replace(s,decodeURIComponent),this.json)try{l=JSON.parse(l)}catch(e){}if(t===f){a=l;break}t||(a[f]=l)}catch(e){}}return a}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(t,n){o(t,"",e(n,{expires:-1}))},o.withConverter=t,o}return t(function(){})})},3:function(e,t){e.exports={api:"https://api.toudaiworld.com/"}},42:function(e,t,n){var o=(n(2),n(3)),r=n(1),i=n(16);r.getUrlParam("code")?i.get(o.api+"wechat/userinfo?code="+r.getUrlParam("code")+(localStorage.share_openid?"&sid="+localStorage.share_openid:""),function(e){var e=JSON.parse(e);0==e.code&&(localStorage.openId=e.data.openid,window.location.href=r.getUrlParam("page_ref"))}):window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa45589eb9464971&redirect_uri="+encodeURIComponent(window.location.href)+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"}});
//# sourceMappingURL=wechat.js.map