var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 单资源显示对象动态加载类
 * author 陈可
 * date 2017/9/18
 * @class BaseLoadBitmap
 */
var BaseLoadBitmap = (function (_super) {
    __extends(BaseLoadBitmap, _super);
    /**
     * 动态加载图
     * @param res 资源key或者资源url
     * @param rect 资源尺寸，位置
     * @param loadCompleteCallback 加载完成回调，callback加载完成回调   callbackThisObj加载完成拥有对象  callbackParams
     */
    function BaseLoadBitmap(res, rect, loadCompleteCallback) {
        var _this = _super.call(this) || this;
        _this._resurl = undefined;
        _this._rect = undefined;
        _this._groupName = undefined; //如果使用组，组名
        _this._isloaded = false; //是否已经加载完成
        _this._isloading = false;
        if (!BaseLoadBitmap.isCanBaseLoadBitmapNew && _this.getClassName() == "BaseLoadBitmap") {
            var errorStr = "请使用BaseLoadBitmap.create创建";
            App.LogUtil.error(errorStr);
            throw new Error(errorStr);
        }
        _this.init(res, rect, loadCompleteCallback);
        return _this;
    }
    BaseLoadBitmap.prototype.setload = function (res, rect, loadCompleteCallback) {
        if (!res || this._resurl == res) {
            return;
        }
        if (this._isloading || this._isloaded) {
            this.removeUseCount();
        }
        this.init(res, rect, loadCompleteCallback);
    };
    BaseLoadBitmap.prototype.isLoaded = function () {
        return this._isloaded;
    };
    BaseLoadBitmap.prototype.init = function (res, rect, loadCompleteCallback) {
        this._resurl = res;
        this._rect = rect;
        this._loadCompleteCallback = loadCompleteCallback;
        if (this._rect) {
            this.width = this._rect.width;
            this.height = this._rect.height;
        }
        this._isloading = true;
        this.loadRes();
    };
    BaseLoadBitmap.prototype.loadRes = function () {
        this.addUseCount();
        if (!ResourceManager.getRes(this._resurl) || BaseLoadBitmap._LoadNum[this._resurl] == 1) {
            if (RES.hasRes(this._resurl)) {
                this._groupName = ResourceManager.loadResources([this._resurl], [], this.dalyLoadComplete, null, this);
                // ResourceManager.loadItem(this._resurl,this.loadComplete,this);
            }
            else {
                if (this._resurl.indexOf(".") > -1) {
                    ResourceManager.loadItemByUrl(this._resurl, this.loadComplete, this, RES.ResourceItem.TYPE_IMAGE);
                }
            }
        }
        else {
            this.dalyLoadComplete();
            // this.loadComplete();
        }
    };
    BaseLoadBitmap.prototype.dalyLoadComplete = function () {
        egret.callLater(this.loadComplete, this);
    };
    BaseLoadBitmap.prototype.loadComplete = function (data) {
        this._isloading = false;
        this._isloaded = true;
        if (data) {
            this.texture = data;
        }
        else {
            this.texture = ResourceManager.getRes(this._resurl);
        }
        if (this._loadCompleteCallback) {
            this._loadCompleteCallback.callback.apply(this._loadCompleteCallback.callbackThisObj, this._loadCompleteCallback.callbackParams);
            this.clearCallback();
        }
    };
    BaseLoadBitmap.prototype.addUseCount = function () {
        if (this._resurl == "itemicon2001") {
            App.LogUtil.log(this._resurl);
        }
        if (BaseLoadBitmap._LoadNum[this._resurl] == null) {
            BaseLoadBitmap._LoadNum[this._resurl] = 0;
        }
        BaseLoadBitmap._LoadNum[this._resurl]++;
    };
    BaseLoadBitmap.prototype.removeUseCount = function () {
        if (this._resurl == "itemicon2001") {
            App.LogUtil.log(this._resurl);
        }
        // if(BaseLoadBitmap._LoadNum[this._resurl]>0)
        // {
        // 	BaseLoadBitmap._LoadNum[this._resurl]--;
        // }
        // if(BaseLoadBitmap._LoadNum[this._resurl]==0)
        // {
        // 	if(this._groupName)
        // 	{
        // 		ResourceManager.destroyRes(this._groupName);
        // 		this._groupName=null;
        // 	}
        // 	else
        // 	{
        // 		if(RES.hasRes(this._resurl))
        // 		{
        // 			ResourceManager.destroyRes(this._resurl);
        // 			this._resurl=null;
        // 		}
        // 	}
        // }
        this._isloading = false;
        this._isloaded = false;
    };
    BaseLoadBitmap.prototype.clearCallback = function () {
        if (this._loadCompleteCallback) {
            this._loadCompleteCallback.callback = null;
            this._loadCompleteCallback.callbackThisObj = null;
            this._loadCompleteCallback.callbackParams = null;
            this._loadCompleteCallback = null;
        }
    };
    BaseLoadBitmap.prototype.dispose = function () {
        if (this._isloading || this._isloaded) {
            this.removeUseCount();
        }
        if (this._rect) {
            egret.Rectangle.release(this._rect);
            this._rect = null;
        }
        this.clearCallback();
        this._resurl = null;
        _super.prototype.dispose.call(this);
    };
    /**
     * 对象池取
     * @param value 支持传输BitmapData，Texture或者资源名
     */
    BaseLoadBitmap.create = function (res, rect, loadCompleteCallback) {
        var baseLoadBitmap = App.DisplayUtil.useObjectPool ? BaseLoadBitmap.baseLoadBitmapPool.pop() : null;
        if (!baseLoadBitmap) {
            BaseLoadBitmap.isCanBaseLoadBitmapNew = true;
            baseLoadBitmap = new BaseLoadBitmap(res, rect, loadCompleteCallback);
            BaseLoadBitmap.isCanBaseLoadBitmapNew = false;
        }
        else {
            baseLoadBitmap.init(res, rect, loadCompleteCallback);
        }
        return baseLoadBitmap;
    };
    /**
     * 对象池存
     * @param value
     */
    BaseLoadBitmap.release = function (baseLoadBitmap) {
        if (!baseLoadBitmap) {
            return;
        }
        baseLoadBitmap.dispose();
        if (baseLoadBitmap.texture) {
            baseLoadBitmap.texture = null;
        }
        egret.Tween.removeTweens(baseLoadBitmap);
        baseLoadBitmap.setPosition(0, 0);
        baseLoadBitmap.setScale(1);
        baseLoadBitmap.rotation = 0;
        baseLoadBitmap.alpha = 1;
        baseLoadBitmap.width = NaN;
        baseLoadBitmap.height = NaN;
        baseLoadBitmap.mask = null;
        baseLoadBitmap.scrollRect = null;
        baseLoadBitmap.filters = null;
        baseLoadBitmap.anchorOffsetX = 0;
        baseLoadBitmap.anchorOffsetY = 0;
        baseLoadBitmap.visible = true;
        baseLoadBitmap.name = null;
        baseLoadBitmap.touchEnabled = false;
        baseLoadBitmap.skewX = baseLoadBitmap.skewY = 0;
        baseLoadBitmap.blendMode = egret.BlendMode.NORMAL;
        baseLoadBitmap.fillMode = egret.BitmapFillMode.SCALE;
        // baseLoadBitmap.scale9Grid=null;
        if (App.DisplayUtil.useObjectPool) {
            if (BaseLoadBitmap.baseLoadBitmapPool.indexOf(baseLoadBitmap) < 0) {
                BaseLoadBitmap.baseLoadBitmapPool.push(baseLoadBitmap);
            }
        }
    };
    BaseLoadBitmap.baseLoadBitmapPool = [];
    BaseLoadBitmap.isCanBaseLoadBitmapNew = false;
    BaseLoadBitmap._LoadNum = {};
    return BaseLoadBitmap;
}(BaseBitmap));
__reflect(BaseLoadBitmap.prototype, "BaseLoadBitmap");
//# sourceMappingURL=BaseLoadBitmap.js.map