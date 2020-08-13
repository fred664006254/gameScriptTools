/**
 * author 陈可
 * date 2017/9/11
 * @class ResourceManager
 */
var ResourceManager;
(function (ResourceManager) {
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
    ResourceManager.loadGroup = loadGroup;
    /**
     * 按照配置key加载单个资源，需要先配置
     * @param key 配置里面的key
     * @param onLoadComplete 加载完成回调
     * @param thisObj 加载回调拥有对象
     */
    function loadItem(key, onLoadComplete, thisObj) {
        App.ResourceUtil.loadItem(key, onLoadComplete, thisObj);
    }
    ResourceManager.loadItem = loadItem;
    /**
     * 使用url加载配置外单个资源
     * @param url 需要加载的资源url
     * @param onLoadComplete 加载完成回调
     * @param thisObj 加载回调拥有对象
     */
    function loadItemByUrl(url, onLoadComplete, thisObj, type) {
        App.ResourceUtil.loadItemByUrl(url, onLoadComplete, thisObj, type);
    }
    ResourceManager.loadItemByUrl = loadItemByUrl;
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
    ResourceManager.loadResources = loadResources;
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
                    // let rect:egret.Rectangle=egret.Rectangle.create();
                    var rect = new egret.Rectangle();
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
            }
            if (!res["sz"]) {
                var sz = getImgSize(key);
                sz && (res["sz"] = { w: sz.w, h: sz.h });
            }
            res["resname"] = key;
        }
        return res;
    }
    ResourceManager.getRes = getRes;
    function hasRes(key) {
        var result = RES.hasRes(key);
        return result;
    }
    ResourceManager.hasRes = hasRes;
    function isItemLoaded(key) {
        return ResourceManager.getRes(key) ? true : false;
    }
    ResourceManager.isItemLoaded = isItemLoaded;
    /**
     * 释放对象
     * @param name 配置文件中加载项的name属性或资源组名。
     */
    function destroyRes(name) {
        App.ResourceUtil.destroyRes(name);
    }
    ResourceManager.destroyRes = destroyRes;
    function dispose() {
    }
    ResourceManager.dispose = dispose;
    /**
     * 单线程加载资源，同时只有一个资源在加载，否则会影响其他功能界面加载
     */
    function autoLoadRes() {
    }
    ResourceManager.autoLoadRes = autoLoadRes;
    /**
     * 检查资源key是否在对应组里面
     */
    function checkResInGroupByKey(resKey, groupName) {
        return App.ResourceUtil.checkResInGroupByKey(resKey, groupName);
    }
    ResourceManager.checkResInGroupByKey = checkResInGroupByKey;
    /**
     * 根据图片key名获取图集名称
     */
    function getAtlasByResName(resKey) {
        return App.ResourceUtil.getAtlasByResName(resKey);
    }
    ResourceManager.getAtlasByResName = getAtlasByResName;
    /**
     * 根据key获取资源尺寸，资源必现包含在default.res.json
     * @param resKey 资源key
     */
    function getImgSize(resKey) {
        return App.ResourceUtil.getImgSize(resKey);
    }
    ResourceManager.getImgSize = getImgSize;
})(ResourceManager || (ResourceManager = {}));
