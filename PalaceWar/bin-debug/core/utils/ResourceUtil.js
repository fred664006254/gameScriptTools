var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * author 陈可
 * date 2017/9/11
 * @class ResourceUtil
 */
var App;
(function (App) {
    var ResourceUtil = (function () {
        function ResourceUtil() {
        }
        ResourceUtil.initGroup = function () {
            if (ResourceUtil._isGroupInit == false) {
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, ResourceUtil.onGroupLoadProgress, ResourceUtil);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, ResourceUtil.onGroupLoadComplete, ResourceUtil);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, ResourceUtil.onGroupLoadError, ResourceUtil);
                ResourceUtil._isGroupInit = true;
            }
        };
        /**
         * 加载资源组
         * @param groupName 资源组名称
         * @param onLoadComplete 资源加载完成回调
         * @param onLoadProgress 资源加载进度回调
         * @param onLoadThisObj 资源加载回调所属对象
         */
        ResourceUtil.loadGroup = function (groupName, onLoadComplete, onLoadProgress, onLoadThisObj, onLoadError) {
            ResourceUtil.initGroup();
            ResourceUtil._groupList[groupName] = [onLoadComplete, onLoadProgress, onLoadThisObj, onLoadError];
            RES.loadGroup(groupName);
        };
        ResourceUtil.onGroupLoadProgress = function (e) {
            var groupName = e.groupName;
            if (ResourceUtil._groupList[groupName]) {
                var loadProgress = ResourceUtil._groupList[groupName][1];
                var loadProgressTarget = ResourceUtil._groupList[groupName][2];
                if (loadProgress) {
                    loadProgress.call(loadProgressTarget, e);
                }
            }
        };
        ResourceUtil.onGroupLoadComplete = function (e) {
            var groupName = e.groupName;
            if (ResourceUtil._groupList[groupName]) {
                var loadComplete = ResourceUtil._groupList[groupName][0];
                var loadCompleteTarget = ResourceUtil._groupList[groupName][2];
                if (loadComplete) {
                    loadComplete.call(loadCompleteTarget);
                }
                ResourceUtil._groupList[groupName] = null;
                delete ResourceUtil._groupList[groupName];
            }
        };
        ResourceUtil.onGroupLoadError = function (e) {
            console.log("res loaderror", e.groupName);
            var groupName = e.groupName;
            if (ResourceUtil._groupList[groupName]) {
                var loadErrorTarget = ResourceUtil._groupList[groupName][2];
                var loadError = ResourceUtil._groupList[groupName][3];
                if (loadError) {
                    loadError.call(loadErrorTarget);
                }
                ResourceUtil._groupList[groupName] = null;
                delete ResourceUtil._groupList[groupName];
            }
        };
        /** 创建资源组，不自动加载
         * @param  resources 资源组
         */
        ResourceUtil.createGroup = function (resources) {
            if (resources === void 0) { resources = []; }
            var groupName = "loadGroup" + ResourceUtil._groupIndex++;
            RES.createGroup(groupName, resources, true);
            return groupName;
        };
        ResourceUtil.initItemLoad = function () {
            if (ResourceUtil._isItemLoadInit == false) {
                ResourceUtil._isItemLoadInit = true;
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, ResourceUtil.onItemLoadError, ResourceUtil);
            }
        };
        ResourceUtil.loadItem = function (key, onLoadComplete, thisObj) {
            ResourceUtil.initItemLoad();
            RES.getResAsync(key, onLoadComplete, thisObj);
        };
        ResourceUtil.loadItemByUrl = function (url, onLoadComplete, thisObj, type) {
            ResourceUtil.initItemLoad();
            RES.getResByUrl(url, onLoadComplete, thisObj, type);
        };
        ResourceUtil.onItemLoadError = function (e) {
            var resName = e.resItem.name;
            if (resName.indexOf("gameconfig_") > -1 && !GameConfig.isLoaded) {
                GameConfig.loadConfig();
            }
            App.LogUtil.show("缺资源or断网", resName);
            var url = resName;
            if (RES.hasRes(resName)) {
                url = ResourceUtil.getResCfgByKey(resName).url;
            }
            StatisticsHelper.reportGameResLoadFail(url);
        };
        /*****单资源加载相关结束*****/
        /**
         * 加载混合资源
         * @param resources 资源数组
         * @param groups 资源组数组
         * @param onResourceLoadComplete 资源加载完成执行函数
         * @param onResourceLoadProgress 资源加载进度监听函数
         * @param onResourceLoadTarget 资源加载监听函数所属对象
         */
        ResourceUtil.loadResource = function (resources, groups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget, onLoadError) {
            if (resources === void 0) { resources = []; }
            if (groups === void 0) { groups = []; }
            var needLoadArr = groups ? resources.concat(groups) : resources;
            var realLoadArr = ResourceUtil.screeningNeedLoadRes(needLoadArr);
            var l = realLoadArr.length;
            var isAllLoaded = true;
            if (l <= 0) {
                App.CommonUtil.showTip("no res load");
                return "";
            }
            // if(l>0)
            // {
            // 	for(let i:number=0;i<l;i++)
            // 	{
            // 		if((!RES.getRes(realLoadArr[i])||ResourceUtil.getCacheCount(realLoadArr[i])<2))
            // 		{
            // 			isAllLoaded=false;
            // 		}
            // 	}
            // }
            var groupName = ResourceUtil.createGroup(realLoadArr);
            ResourceUtil._groupResCacheDic[groupName] = realLoadArr;
            // if(isAllLoaded)
            // {
            // 	if(onResourceLoadComplete)
            // 	{
            // 		egret.callLater(onResourceLoadComplete,onResourceLoadTarget);
            // 	}
            // }
            // else
            // {
            ResourceUtil.loadGroup(groupName, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget, onLoadError);
            // }
            return groupName;
        };
        ResourceUtil.loadSingleScript = function (jsSrc, callback, callbackObj) {
            var s = document.createElement('script');
            s.async = false;
            s.src = jsSrc;
            s.addEventListener('load', function loadcomplete() {
                s.parentNode.removeChild(s);
                s.removeEventListener('load', loadcomplete, false);
                if (callback) {
                    callback.apply(callbackObj);
                }
            }, false);
            document.body.appendChild(s);
        };
        ;
        /**
         * 根据key检测要加载的资源
         */
        ResourceUtil.checkAndPushRes = function (key, resArr) {
            if (RES.hasRes(key)) {
                var realRes = ResourceUtil.getAtlasByResName(key);
                if (realRes) {
                    if (resArr.indexOf(realRes) < 0) {
                        ResourceUtil.addCacheCount(realRes);
                        resArr.push(realRes);
                    }
                }
                else {
                    if (resArr.indexOf(key) < 0) {
                        resArr.push(key);
                        ResourceUtil.addCacheCount(key);
                    }
                }
            }
        };
        /**
         * 资源key添加引用计数
         */
        ResourceUtil.addCacheCount = function (key) {
            if (!ResourceUtil._resCacheCountDic[key]) {
                ResourceUtil._resCacheCountDic[key] = 1;
            }
            else {
                ResourceUtil._resCacheCountDic[key]++;
            }
        };
        /**
         * 获取资源key的引用计数
         */
        ResourceUtil.getCacheCount = function (key) {
            if (!ResourceUtil._resCacheCountDic[key]) {
                return 0;
            }
            else {
                return ResourceUtil._resCacheCountDic[key];
            }
        };
        /**
         * 资源key引用计数减一
         */
        ResourceUtil.removeCacheCount = function (key, destory) {
            if (destory === void 0) { destory = false; }
            if (ResourceUtil._resCacheCountDic[key]) {
                ResourceUtil._resCacheCountDic[key]--;
            }
            if (destory && !ResourceUtil._resCacheCountDic[key]) {
                RES.destroyRes(key, false);
            }
        };
        /**
         * 获取加载key，处理下可以支持游戏内定制化需求，按渠道来区分
         */
        ResourceUtil.getReskey = function (key) {
            var osStr = App.DeviceUtil.isIOS() ? "ios" : (App.DeviceUtil.isAndroid() ? "and" : "h5");
            var spid = PlatformManager.getSpid();
            if (RES.hasRes(key + "_" + spid + "type")) {
                key = key + "_" + spid + "type";
            }
            else {
                if (RES.hasRes(key + "_" + spid + osStr + "type")) {
                    key = key + "_" + spid + osStr + "type";
                }
            }
            return key;
        };
        /**
         * 检查资源key是否在对应组里面
         */
        ResourceUtil.checkResInGroupByKey = function (resKey, groupName) {
            var resCfg;
            if (RES["configInstance"]) {
                resCfg = RES["configInstance"];
                var resArr = resCfg.getRawGroupByName(groupName);
                if (resArr) {
                    var l = resArr.length;
                    for (var i = l - 1; i >= 0; i--) {
                        if (resArr[i] && resArr[i].name && resArr[i].name == resKey) {
                            return true;
                        }
                    }
                }
            }
            else {
                return false;
            }
        };
        /**
         * 根据资源key获取配置
         */
        ResourceUtil.getResCfgByKey = function (key) {
            return GameConfig.resCfg.keyMap[key];
        };
        /**
         * 检测资源key是否是资源组
         */
        ResourceUtil.checkKeyIsGroup = function (key) {
            var isgroup = false;
            if (RES["config"] && RES["config"].config && RES["config"].config.groups) {
                if (RES["config"].config.groups[key]) {
                    isgroup = true;
                }
            }
            else {
                var group = RES.getGroupByName(key);
                if (group && group.length > 0) {
                    isgroup = true;
                }
            }
            return isgroup;
        };
        /**
         * 清理apk新包缓存
         * @param isReload 清理完缓存后是否直接reload，默认直接reolad，否则传false
         */
        ResourceUtil.clearDiskCache = function (isReload) {
            if (isReload === void 0) { isReload = true; }
            if (App.DeviceUtil.IsHtml5()) {
                var refresh = (isReload ? "1" : "0");
                if (window["RSDKPlatform"] && window["RSDKPlatform"].clearCache) {
                    window["RSDKPlatform"].clearCache(refresh);
                }
                else if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.RSDKClearCache) {
                    window["webkit"].messageHandlers.RSDKClearCache.postMessage([refresh]);
                }
            }
        };
        /**
         * 根据资源url删除资源的缓存，仅仅支持url
         */
        ResourceUtil.deleteDiskCacheByUrl = function (res) {
            if (!res) {
                return;
            }
            if (res.substr(res.length - 4) == "json") {
                console.log(res.substr(0, res.length - 4) + "png");
            }
            else if (res.substr(res.length - 3) == "fnt") {
                console.log(res.substr(0, res.length - 3) + "png");
            }
            if (App.DeviceUtil.IsHtml5()) {
                if (window["RSDKPlatform"] && window["RSDKPlatform"].deleteCacheByUrl) {
                    if (res.indexOf("http://") == 0 || res.indexOf("https://") == 0) {
                        if (res.substr(res.length - 4) == "json") {
                            window["RSDKPlatform"].deleteCacheByUrl(res.substr(0, res.length - 4) + "png");
                        }
                        else if (res.substr(res.length - 3) == "fnt") {
                            window["RSDKPlatform"].deleteCacheByUrl(res.substr(0, res.length - 3) + "png");
                        }
                        window["RSDKPlatform"].deleteCacheByUrl(res);
                    }
                }
            }
        };
        ResourceUtil.getResFullUrlByKey = function (res) {
            return ResourceUtil.getResBaseUrl() + ResourceUtil.getResCfgByKey(res).url;
        };
        ResourceUtil.getSheetResFullUrl = function (resKey) {
            if (App.ResourceUtil._sheetDic && App.ResourceUtil._sheetDic[resKey]) {
                return ResourceUtil.getResBaseUrl() + App.ResourceUtil._sheetDic[resKey];
            }
            return "";
        };
        ResourceUtil.getResBaseUrl = function () {
            if (App.DeviceUtil.IsHtml5()) {
                if (!ResourceUtil._resBaseUrl) {
                    var baseUrl = document.baseURI;
                    if (!baseUrl) {
                        baseUrl = window.location.host + window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/") + 1);
                    }
                    else {
                        baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf("/") + 1);
                    }
                    if (baseUrl.indexOf("//") < 0) {
                        baseUrl = "//" + baseUrl;
                    }
                    if (baseUrl.indexOf("http") < 0) {
                        baseUrl = Http.getProtocol() + baseUrl;
                    }
                    ResourceUtil._resBaseUrl = baseUrl;
                }
                return ResourceUtil._resBaseUrl;
            }
            return "";
        };
        ResourceUtil.formatSheetLoad = function () {
            RES.SheetAnalyzer.prototype.onLoadFinish = function (event) {
                var request = event.target;
                var data = this.resItemDic[request.$hashCode];
                delete this.resItemDic[request.hashCode];
                var resItem = data.item;
                var compFunc = data.func;
                resItem.loaded = (event.type == egret.Event.COMPLETE);
                if (resItem.loaded) {
                    if (request instanceof egret.HttpRequest) {
                        resItem.loaded = false;
                        var imageUrl = this.analyzeConfig(resItem, request.response);
                        if (imageUrl) {
                            App.ResourceUtil._sheetDic[resItem.name] = imageUrl;
                            this.loadImage(imageUrl, data);
                            this.recycler.push(request);
                            return;
                        }
                    }
                    else {
                        var texture = new egret.Texture();
                        texture._setBitmapData(request.data);
                        this.analyzeBitmap(resItem, texture);
                    }
                }
                if (request instanceof egret.HttpRequest) {
                    this.recycler.push(request);
                }
                else {
                    this.recyclerIamge.push(request);
                }
                compFunc.call(data.thisObject, resItem);
            };
        };
        /**
         * 根据图片key名获取图集名称
         */
        ResourceUtil.getAtlasByResName = function (resKey) {
            if (GameConfig.resCfg && GameConfig.resCfg.keyMap) {
                if (GameConfig.resCfg.keyMap[resKey]) {
                    if (GameConfig.resCfg.keyMap[resKey].subkeys) {
                        //是图集
                        return GameConfig.resCfg.keyMap[resKey].name;
                    }
                    else {
                        return null;
                    }
                }
            }
        };
        /**
         * 根据组名来返回具体资源
         */
        ResourceUtil.getGroupResKeysByGroupName = function (groupName) {
            var resKeys = [];
            if (GameConfig.resCfg && GameConfig.resCfg.groupDic && GameConfig.resCfg.groupDic[groupName]) {
                resKeys = GameConfig.resCfg.groupDic[groupName];
            }
            return resKeys;
        };
        /**
         * 筛选真实加载的资源
         */
        ResourceUtil.screeningNeedLoadRes = function (needLoadArr) {
            var realLoadArr = [];
            for (var i = needLoadArr.length - 1; i >= 0; i--) {
                var key = needLoadArr[i];
                key = App.ResourceUtil.getReskey(key);
                needLoadArr[i] = key;
                var isGroup = ResourceUtil.checkKeyIsGroup(key);
                if ((!key) || (RES.hasRes(key) == false && !isGroup)) {
                    App.LogUtil.warn("资源配置缺少", key, "跳过加载此文件");
                    needLoadArr.splice(i, 1);
                }
                else {
                    if (isGroup) {
                        var groupKeysArr = ResourceUtil.getGroupResKeysByGroupName(key);
                        for (var i_1 = groupKeysArr.length - 1; i_1 >= 0; i_1--) {
                            if (groupKeysArr[i_1] && groupKeysArr[i_1].name) {
                                ResourceUtil.checkAndPushRes(groupKeysArr[i_1].name, realLoadArr);
                            }
                        }
                        // realLoadArr.push(key);
                    }
                    else {
                        if (key.indexOf("btn") > -1) {
                            var btnDownName = key + "_down";
                            ResourceUtil.checkAndPushRes(key, realLoadArr);
                            ResourceUtil.checkAndPushRes(btnDownName, realLoadArr);
                        }
                        else if (key.indexOf("progress") > -1) {
                            var progressBgName = key + "_bg";
                            ResourceUtil.checkAndPushRes(key, realLoadArr);
                            ResourceUtil.checkAndPushRes(progressBgName, realLoadArr);
                        }
                        else if (key.indexOf("shield") > -1) {
                            var shieldName = GameData.getLanguageKey("shield_");
                            var shieldNameJson = "shieldname_cn";
                            if (RES.hasRes(shieldName) == false) {
                                shieldName = "shield_cn";
                            }
                            if (RES.hasRes(shieldName)) {
                                needLoadArr[i] = shieldName;
                                ResourceUtil.checkAndPushRes(shieldName, realLoadArr);
                                shieldNameJson = shieldName.replace("shield_", "shieldname_");
                            }
                            if (RES.hasRes(shieldNameJson)) {
                                ResourceUtil.checkAndPushRes(shieldNameJson, realLoadArr);
                            }
                        }
                        else if (key.indexOf("names") > -1) {
                            var shieldName = GameData.getLanguageKey("names_");
                            if (RES.hasRes(shieldName)) {
                                needLoadArr[i] = shieldName;
                            }
                            else {
                                shieldName = "names_cn";
                            }
                            ResourceUtil.checkAndPushRes(shieldName, realLoadArr);
                        }
                        else {
                            ResourceUtil.checkAndPushRes(key, realLoadArr);
                        }
                    }
                }
            }
            return realLoadArr;
        };
        ResourceUtil.retrySwithCDN = function (res, callback, callbackThisObj, isShowErrorTip, errorCallback) {
            if (isShowErrorTip === void 0) { isShowErrorTip = true; }
            if (App.DeviceUtil.IsHtml5()) {
                NetManager.checkIsOnline(function (isOnline) {
                    if (isOnline) {
                        var trySwitchCDNCount = 0;
                        if (window["trySwitchCDN"]) {
                            var resName = res;
                            var url = resName;
                            if (RES.hasRes(resName)) {
                                url = App.ResourceUtil.getResCfgByKey(resName).url;
                            }
                            trySwitchCDNCount = window["trySwitchCDN"](url, null, null, 4);
                        }
                        if (callback) {
                            callback.apply(callbackThisObj, [trySwitchCDNCount]);
                        }
                        //在线
                    }
                    else {
                        console.log("offline res error");
                        if (isShowErrorTip) {
                            App.DocumentUtil.showLoadResFailDiv(callback, callbackThisObj);
                        }
                        else {
                            if (errorCallback) {
                                errorCallback.call(callbackThisObj);
                            }
                        }
                        //离线
                    }
                });
            }
            else {
                if (isShowErrorTip) {
                    if (callback) {
                        callback.call(callbackThisObj);
                    }
                }
                else {
                    if (errorCallback) {
                        errorCallback.call(callbackThisObj);
                    }
                }
            }
        };
        /**
         * 释放对象
         * @param name 配置文件中加载项的name属性或资源组名。
         */
        ResourceUtil.destroyRes = function (name) {
            if (ResourceUtil._groupResCacheDic[name]) {
                var resArr = ResourceUtil._groupResCacheDic[name];
                for (var key in resArr) {
                    ResourceUtil.removeCacheCount(resArr[key], !ResourceUtil.checkKeyIsGroup(name));
                }
                delete ResourceUtil._groupResCacheDic[name];
                if (ResourceUtil.checkKeyIsGroup(name)) {
                    RES.destroyRes(name, false);
                }
            }
            else if (ResourceUtil.checkKeyIsGroup(name)) {
                RES.destroyRes(name, false);
            }
            else {
                RES.destroyRes(name, false);
            }
        };
        /*****资源组加载相关开始*****/
        ResourceUtil._groupList = {};
        ResourceUtil._isGroupInit = false;
        /**
         * sheet和对应资源对应关系存储，自动清理缓存会使用
         */
        ResourceUtil._sheetDic = {};
        /**
         * 资源组配置，引用计数用
         */
        ResourceUtil._groupResCacheDic = {};
        /**
         * 资源引用计数缓存
         */
        ResourceUtil._resCacheCountDic = {};
        ResourceUtil._groupIndex = 0;
        /*****资源组加载相关结束*****/
        /*****单资源加载相关开始*****/
        ResourceUtil._isItemLoadInit = false;
        ResourceUtil._resBaseUrl = null;
        return ResourceUtil;
    }());
    App.ResourceUtil = ResourceUtil;
    __reflect(ResourceUtil.prototype, "App.ResourceUtil");
})(App || (App = {}));
//# sourceMappingURL=ResourceUtil.js.map