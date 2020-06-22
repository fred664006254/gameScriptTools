var RSDK;
(function(e){var l=function(){function b(){}b.init=function(a){var d=b.getAllpluginNameArr();b.loadPluginScirpt(function(c,b){var f=function(e){var k=d[e];window[k]&&window[k].init?window[k].init(function(){e>=d.length-1?a&&(a(c,b),SDK.CommonUtil.log(c,b)):f(e+1)}):e>=d.length-1?a&&(a(c,b),SDK.CommonUtil.log(c,b)):f(e+1)};f(0)})};b.loadPluginScirpt=function(a){var d=b.getPluginScriptsArr();SDK.CommonUtil.loadScripts(d,function(){a&&a(SDK.SDKCode.RET_SUCCESS,{})})};b.getPluginScriptsArr=function(){for(var a=[],
d=b.getAllpluginNameArr(),c=SDK.CommonUtil.getParamByName("r_plugin_version"),f=SDK.CommonUtil.getParamByName("r_plugin_name"),e=0;e<d.length;e++){var g="plugin/"+d[e]+".js";c&&f&&f+"plugin"==d[e]&&(g=g+"?v="+c);g=SDK.CommonUtil.formatResUrl(g);0>a.indexOf(g)&&a.push(g)}return a};b.login=function(a,d,c){c=b.getpluginNameByType("login",c);window[c]&&window[c].login(a,d)};b.getSubAppIdFromPlugin=function(a){a=b.getpluginNameByType("login",a);return window[a]&&window[a].getSubAppId?window[a].getSubAppId():
""};b.logout=function(a){a=b.getpluginNameByType("login",a);window[a]&&window[a].logout?window[a].logout():console.info("no logout function")};b.pay=function(a,d,c){c=b.getpluginNameByType("pay",c);window[c]&&window[c].pay(a,d)};b.findFuncName=function(a,d){var c=b.getpluginNameByType(a,d);if(window[c]&&window[c][a])return c;c||(c=b.getpluginNameByType("login",d));if(window[c]&&window[c][a])return c;c||(c=b.getpluginNameByType("pay",d));return window[c]&&window[c][a]?c:null};b.share=function(a,d,
c){c=b.findFuncName("share",c);window[c]&&window[c].share&&window[c].share(a,d)};b.hasBindFunc=function(a){a=b.findFuncName("login",a);if(window[a]&&window[a].hasBindFunc)return window[a].hasBindFunc()};b.checkBindStatus=function(a,d){d=b.findFuncName("login",d);window[d]&&window[d].checkBindStatus&&window[d].checkBindStatus(a)};b.callBind=function(a,d){d=b.findFuncName("login",d);window[d]&&window[d].callBind&&window[d].callBind(a)};b.trackEvent=function(a,d){for(var c=b.getPluginsByType("analytics"),
f=!1,e=0;e<c.length;e++){var g=c[e];window[g].trackEvent&&(f=!0,window[g].trackEvent(a,d))}f||(c=b.getpluginNameByType("login"),window[c]&&window[c].trackEvent&&window[c].trackEvent(a,d))};b.requestFollow=function(a){var d=b.getpluginNameByType("login");window[d]&&window[d].requestFollow&&window[d].requestFollow(a)};b.checkFollow=function(){var a=b.getpluginNameByType("login");return window[a]&&window[a].checkFollow?window[a].checkFollow():!1};b.hasFollow=function(){var a=b.getpluginNameByType("login");
return window[a]&&window[a].hasFollow?window[a].hasFollow():!1};b.getCustomerServiceData=function(a){var d=b.getpluginNameByType("login");window[d]&&window[d].getCustomerServiceData&&window[d].getCustomerServiceData(a)};b.getCustomerServiceType=function(){var a=b.getpluginNameByType("login");return window[a]&&window[a].getCustomerServiceType?window[a].getCustomerServiceType():0};b.customerService=function(a){var d=b.getpluginNameByType("login");window[d]&&window[d].customerService&&window[d].customerService(a)};
b.checkDesktop=function(){var a=b.getpluginNameByType("login");return window[a]&&window[a].checkDesktop?window[a].checkDesktop():!1};b.checkShare=function(){var a=b.getpluginNameByType("login");return window[a]&&window[a].checkShare?window[a].checkShare():0};b.requestDesktop=function(a,d){var c=b.getpluginNameByType("login");return window[c]&&window[c].requestDesktop?window[c].requestDesktop(a,d):!1};b.setShareInfo=function(a,d,c){c=b.getpluginNameByType("login",c);window[c]&&window[c].setShareInfo&&
window[c].setShareInfo(a,d)};b.callSdk=function(a,d,c){if("realname_auth"==a&&SDK.CommonUtil.getParamByName("realname_auth_url"))d&&d.idcard&&d.name||c(-1,{error:"idcard or name is empty"}),a=window.CryptoJS.enc.Base64.stringify(window.CryptoJS.enc.Utf8.parse(JSON.stringify(d))),SDK.CommonUtil.postData(SDK.CommonUtil.getParamByName("realname_auth_url")+"?json_data="+encodeURIComponent(a),function(a){a&&"success"==a.result?c(0):c(-1,{error:a.message?a.message:"\u7f51\u7edc\u9519\u8bef"})});else{var e=
b.findFuncName("callSdk");window[e]&&window[e].callSdk&&window[e].callSdk(a,d,c)}};b.getAllpluginNameArr=function(){if(b.allpluginNameArr)return b.allpluginNameArr;b.allpluginNameArr=[];for(var a=["login","pay","analytics"],d=0;d<a.length;d++){var c=a[d];SDK.CommonUtil.isDebug&&console.log("\u63d2\u4ef6\u7c7b\u578b:"+c);c=b.getPluginsByType(c);for(var e=0;e<c.length;e++){var k=c[e];0>b.allpluginNameArr.indexOf(k)&&b.allpluginNameArr.push(k)}}return b.allpluginNameArr};b.getChannelId=function(){var a=
b.getpluginNameByType("login");if(window[a]&&window[a].getChannelId)return console.log("RSDK:getChannelId"),window[a].getChannelId()};b.getSubChannelId=function(){var a=b.getpluginNameByType("login");if(window[a]&&window[a].getSubChannelId)return console.log("RSDK:getSubChannelId"),window[a].getSubChannelId()};b.getpluginNameByType=function(a,d){var c;(a=SDK.CommonUtil.getParamByName(a+"_plugin"))&&(c=d?a[-1==a.indexOf(d)?0:a.indexOf(d)]:a[0]);c&&(c+="plugin");return c};b.getPluginsByType=function(a){var d=
[];if((a=SDK.CommonUtil.getParamByName(a+"_plugin"))&&0<a.length)for(var c=0;c<a.length;c++)d[c]=a[c]+"plugin",SDK.CommonUtil.isDebug&&console.log(d[c]);return d};b.getOrderId=function(a,d,c){var b={};b.money=String(a.price);b.game_user_id=String(a.gameUserId);b.game_server_id=String(a.serverId);b.user_id=String(SDK.CommonUtil.loginUserInfo.pid).replace(String(SDK.CommonUtil.loginUserInfo.pid_prefix),"");console.log("RSDK getOrderId-pid:"+b.user_id);b.product_id=String(a.productId);b.product_name=
String(a.productName);b.coin_num=String(a.coinNum);b.product_type="gold";b.product_count="1";b.private_data=a.privateData;b.os="h5";a=window.CryptoJS.MD5(a.productId+a.price+b.user_id+a.gameUserId+SDK.CommonUtil.privateKey).toString();b=window.CryptoJS.enc.Utf8.parse(JSON.stringify(b));b=window.CryptoJS.enc.Base64.stringify(b);SDK.CommonUtil.postData((c?c:SDK.CommonUtil.getParamByName("order_url"))+"?json_data="+encodeURIComponent(b)+"&token="+a,function(a){a&&d&&d(a)})};b.getToken=function(a,d){var c=
SDK.CommonUtil.getParamByName("token_url"),b={server_id:"",user_type:"",nickname:"",sdk_platform:"",pid:"",custom_data:"",big_app_id:"",sign:"",platform_sdk_data:"",login_time:"",token:"",rsdk_server_version:"",refresh_token:"",ext1:"",ext2:"",ext3:""},e="",g="";if(a)for(var h in a)null!=a[h]&&(b[h]=String(a[h]));g=SDK.CommonUtil.privateKey;e=b.server_id;c=c+("?private_key="+g)+("&server_id="+e);c+="&rsdk_param="+JSON.stringify(b);SDK.CommonUtil.postData(c,function(a){d&&d(a)})};return b}();e.RSDKManager=
l})(RSDK||(RSDK={}));var rsdkJs=document.scripts,rsdkFileUrl=rsdkJs[rsdkJs.length-1].src,rsdkResbBseUrl=rsdkFileUrl.substring(0,rsdkFileUrl.lastIndexOf("/")+1);rsdkFileUrl&&-1!=rsdkFileUrl.toLowerCase().indexOf("/rsdk.js")||(rsdkResbBseUrl=rsdkFileUrl="");var rsdkVersion=rsdkFileUrl&&rsdkFileUrl.split("?")[1]?rsdkFileUrl.split("?")[1]:"";
(function(e){function l(a,c){console.log("RSDK INIT INFO:"+JSON.stringify(a));if(a.r_host)if(window.SDK&&window.SDK.CommonUtil){var d=a.debug;SDK.CommonUtil.privateKey=a.privateKey;SDK.CommonUtil.r_host=a.r_host;SDK.CommonUtil.r_bid=a.r_bid;SDK.CommonUtil.r_plat=a.r_plat;SDK.CommonUtil.r_user=a.r_user;SDK.CommonUtil.isDebug=!!d;null==SDK.CommonUtil.privateKey?SDK.CommonUtil.log("\u8bf7\u4f20\u5165privateKey"):SDK.CommonUtil.initSdkParams(function(){SDK.CommonUtil.loadScripts([SDK.CommonUtil.formatResUrl("platform/util/cryptoutil.js")],
function(){console.log("RSDK:__utilCryptoutilLoaded__");e.RSDKManager.init(c)})})}else void 0==window.sdkloadinfo?(window.sdkloadinfo=[],window.sdkloadinfo.push({fun:l.bind(e,a,c)}),b()):window.sdkloadinfo.push({fun:l.bind(e,a,c)});else console.error("RSDK INIT INFO ERROR")}function b(){var d=document.getElementsByTagName("head").item(0)||document.documentElement,c=document.createElement("script");c.setAttribute("type","text/javascript");c.onload=c.onreadystatechange=function(){if(c.onload&&c.onreadystatechange){this.onload=
this.onreadystatechange=null;c.onload=c.onreadystatechange=null;this.parentNode.removeChild(this);for(var a=0;a<window.sdkloadinfo.length;a++)window.sdkloadinfo[a].fun();window.sdkloadinfo=[]}};var b="";b=rsdkVersion?-1==rsdkVersion.indexOf("?")?"?"+rsdkVersion.toString():rsdkVersion.toString():b+("?v="+(new Date).getDate().toString());var e=a("resbaseurl"),g=rsdkResbBseUrl;e&&(g=e);c.setAttribute("src",g+"util/commonutil.js"+b);d.appendChild(c)}function a(a){var c=void 0,d=location.search,b={};if(-1!=
d.indexOf("?")){d=d.substr(1).split("&");for(var e=0;e<d.length;e++){var h=d[e].split("=");if(2<h.length){var l=d[e].split(h[0]+"=");b[h[0]]=l[1]}else b[h[0]]=h[1]}}if(b=b.rsdk_param)b=decodeURIComponent(b),(b=JSON.parse(b))&&(c=b[a]);return c}e.init=l;e.login=function(a,c,b,k){e.RSDKManager.login(function(b,d){d.customData=a;c(b,d)}.bind(e),function(a,d){b&&b(a,d)}.bind(e),k)};e.logout=function(a){e.RSDKManager.logout(a)};e.pay=function(a,b,f){e.RSDKManager.pay(a,b,f)};e.share=function(a,b,f){e.RSDKManager.share(a,
b,f)};e.checkShare=function(){return e.RSDKManager.checkShare()};e.trackEvent=function(a,b){e.RSDKManager.trackEvent(a,b)};e.customerService=function(a){e.RSDKManager.customerService(a)};e.getCustomerServiceData=function(a){e.RSDKManager.getCustomerServiceData(a)};e.getCustomerServiceType=function(){return e.RSDKManager.getCustomerServiceType()};e.requestFollow=function(a){e.RSDKManager.requestFollow(a)};e.checkFollow=function(){return e.RSDKManager.checkFollow()};e.hasFollow=function(){return e.RSDKManager.hasFollow()};
e.checkDesktop=function(){return e.RSDKManager.checkDesktop()};e.requestDesktop=function(a,b){return e.RSDKManager.requestDesktop(a,b)};e.setShareInfo=function(a,b,f){e.RSDKManager.setShareInfo(a,b,f)};e.callSdk=function(a,b,f){e.RSDKManager.callSdk(a,b,f)};e.getAppid=function(){var a=e.RSDKManager.getSubAppIdFromPlugin();return a?(console.log("rsdk:\u4ece\u63d2\u4ef6\u91cc\u83b7\u53d6subappid:"+a),a):SDK.CommonUtil.appId};e.getChannelId=function(){return e.RSDKManager.getChannelId()};e.getSubChannelId=
function(){return e.RSDKManager.getSubChannelId()};e.hasBindFunc=function(){return e.RSDKManager.hasBindFunc()};e.checkBindStatus=function(a){e.RSDKManager.checkBindStatus(a)};e.callBind=function(a){e.RSDKManager.callBind(a)}})(RSDK||(RSDK={}));
