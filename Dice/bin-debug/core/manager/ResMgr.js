/**
 * author 陈可
 * date 2017/9/11
 * @class ResourceManager
 */
var ResMgr;
(function (ResMgr) {
    var cacheDic = {};
    /**
     * 加载资源组
     * @param groupName 资源组名
     * @param onLoadComplete 加载完成回调
     * @param onLoadProgress 加载进度回调
     * @param onLoadThisObj 加载回调拥有对象
     */
    function loadGroup(groupName, onLoadComplete, onLoadProgress, onLoadThisObj, onLoadError) {
        App.ResourceUtil.loadGroup(groupName, onLoadComplete, onLoadProgress, onLoadThisObj, onLoadError);
    }
    ResMgr.loadGroup = loadGroup;
    /**
     * 按照配置key加载单个资源，需要先配置
     * @param key 配置里面的key
     * @param onLoadComplete 加载完成回调
     * @param thisObj 加载回调拥有对象
     */
    function loadItem(key, onLoadComplete, thisObj) {
        App.ResourceUtil.loadItem(key, onLoadComplete, thisObj);
    }
    ResMgr.loadItem = loadItem;
    /**
     * 使用url加载配置外单个资源
     * @param url 需要加载的资源url
     * @param onLoadComplete 加载完成回调
     * @param thisObj 加载回调拥有对象
     */
    function loadItemByUrl(url, onLoadComplete, thisObj, type) {
        App.ResourceUtil.loadItemByUrl(url, onLoadComplete, thisObj, type);
    }
    ResMgr.loadItemByUrl = loadItemByUrl;
    /**
     * 加载混合资源
     * @param resources 资源数组
     * @param groups 资源组数组
     * @param onResourceLoadComplete 加载完成回调
     * @param onResourceLoadProgress 加载进度回调
     * @param onResourceLoadTarget 加载回调拥有对象
     */
    function loadResources(resources, groups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget, onLoadError) {
        return App.ResourceUtil.loadResource(resources, groups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget, onLoadError);
    }
    ResMgr.loadResources = loadResources;
    /**
     * 获取资源
     * @param key
     */
    function getRes(key) {
        var res = RES.getRes(key);
        if (res) {
            var scale9Cfg = Scale9gridCfg.getScale9gridCfg(key);
            if (scale9Cfg) {
                if (!res["scale9Grid"]) {
                    var rect = egret.Rectangle.create();
                    var scale9Arr = scale9Cfg.split(",");
                    rect.setTo(Number(scale9Arr[0]), Number(scale9Arr[1]), Number(scale9Arr[2]), Number(scale9Arr[3]));
                    var isScale9Grid = true;
                    if (res instanceof egret.Texture) {
                        if (rect.x + rect.width > res.textureWidth) {
                            isScale9Grid = false;
                            var tip = key + "scale9Grid宽度超过图片宽度，需修改";
                            console.log(tip);
                        }
                        if (rect.y + rect.height > res.textureHeight) {
                            isScale9Grid = false;
                            var tip = key + "scale9Grid高度超过图片高度，需修改";
                            console.log(tip);
                        }
                    }
                    if (isScale9Grid) {
                        res["scale9Grid"] = rect;
                    }
                }
                if (!res["sz"]) {
                    var sz = getImgSize(key);
                    sz && (res["sz"] = { w: sz.w, h: sz.h });
                }
            }
        }
        return RES.getRes(key);
    }
    ResMgr.getRes = getRes;
    function hasRes(key) {
        var result = RES.hasRes(key);
        return result;
    }
    ResMgr.hasRes = hasRes;
    function isItemLoaded(key) {
        return ResMgr.getRes(key) ? true : false;
    }
    ResMgr.isItemLoaded = isItemLoaded;
    /**
     * 释放对象
     * @param name 配置文件中加载项的name属性或资源组名。
     */
    function destroyRes(name) {
        App.ResourceUtil.destroyRes(name);
    }
    ResMgr.destroyRes = destroyRes;
    function dispose() {
    }
    ResMgr.dispose = dispose;
    /**
     * 单线程加载资源，同时只有一个资源在加载，否则会影响其他功能界面加载
     */
    function autoLoadRes() {
    }
    ResMgr.autoLoadRes = autoLoadRes;
    /**
     * 检查资源key是否在对应组里面
     */
    function checkResInGroupByKey(resKey, groupName) {
        return Boolean(App.ResourceUtil.checkResInGroupByKey(resKey, groupName));
    }
    ResMgr.checkResInGroupByKey = checkResInGroupByKey;
    /**
     * 清理apk新包缓存
     * @param isReload 清理完缓存后是否直接reload，默认直接reolad，否则传false
     */
    function clearDiskCache(isReload) {
        if (isReload === void 0) { isReload = true; }
        App.ResourceUtil.clearDiskCache(isReload);
    }
    ResMgr.clearDiskCache = clearDiskCache;
    /**
     * 根据资源key，资源组名 或者完整url删除资源的缓存
     * @param res 资源key名或者资源组名或者第三方完整url
     */
    function deleteDiskCacheByKeyOrUrl(res) {
        if (App.ResourceUtil.checkKeyIsGroup(res)) {
            var groupData = App.ResourceUtil.getGroupResKeysByGroupName(res);
            if (groupData && groupData.length > 0) {
                var l = groupData.length;
                for (var i = 0; i < l; i++) {
                    var resurl = App.ResourceUtil.getResFullUrlByKey(groupData[i].name);
                    if (resurl) {
                        App.ResourceUtil.deleteDiskCacheByUrl(resurl);
                        var sheetResUrl = App.ResourceUtil.getSheetResFullUrl(groupData[i].name);
                        if (sheetResUrl) {
                            App.ResourceUtil.deleteDiskCacheByUrl(sheetResUrl);
                        }
                    }
                }
            }
        }
        else {
            if (ResMgr.hasRes(res)) {
                var resurl = App.ResourceUtil.getResFullUrlByKey(res);
                if (resurl) {
                    App.ResourceUtil.deleteDiskCacheByUrl(resurl);
                    var sheetResUrl = App.ResourceUtil.getSheetResFullUrl(res);
                    if (sheetResUrl) {
                        App.ResourceUtil.deleteDiskCacheByUrl(sheetResUrl);
                    }
                }
            }
            else {
                App.ResourceUtil.deleteDiskCacheByUrl(res);
            }
        }
    }
    ResMgr.deleteDiskCacheByKeyOrUrl = deleteDiskCacheByKeyOrUrl;
    /**
     * 根据图片key名获取图集名称
     */
    function getAtlasByResName(resKey) {
        return App.ResourceUtil.getAtlasByResName(resKey);
    }
    ResMgr.getAtlasByResName = getAtlasByResName;
    /**
     * 根据key获取资源尺寸，资源必现包含在default.res.json
     * @param resKey 资源key
     */
    function getImgSize(resKey) {
        return App.ResourceUtil.getImgSize(resKey);
    }
    ResMgr.getImgSize = getImgSize;
})(ResMgr || (ResMgr = {}));
//# sourceMappingURL=ResMgr.js.map