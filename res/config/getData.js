var Cookie = require('../lib/cookie');

if(!Cookie('mapData')){
    window.location.href= "/getBaseData.html?redirect="+ window.location.href
}