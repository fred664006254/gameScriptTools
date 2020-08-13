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
 * 加载基类容器类
 * author 陈可
 * date 2017/9/11
 * @class BaseLoadDisplayObjectContiner
 */
var BaseLoadDisplayObjectContiner = (function (_super) {
    __extends(BaseLoadDisplayObjectContiner, _super);
    function BaseLoadDisplayObjectContiner() {
        var _this = _super.call(this) || this;
        _this._isLoaded = false;
        _this._groupName = undefined;
        _this._isShow = false;
        _this._isInit = false;
        /**
         * 请求type列表
         */
        _this._requestTypeList = [];
        /**
         * 是否已经请求过
         */
        _this._isRequesed = false;
        return _this;
    }
    BaseLoadDisplayObjectContiner.prototype.show = function (data) {
        if (this.isShow()) {
            return;
        }
        var equestData = this.getRequestData();
        if (equestData) {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_GAMESOCKET_RECOUNT, this.gameSocketRecountHandler, this);
            this._curRequestData = { requestType: equestData.requestType, requestData: equestData.requestData };
            this.request(equestData.requestType, equestData.requestData);
        }
        else {
            this._isRequesed = true;
        }
        this.showLoadingMask();
        // App.LogUtil.show("displayshow");
        this._isShow = true;
        //不自动调用资源加载
        if (this.getClassName() != "WifebattleView" && this.getClassName() != "AcCrossServerWifeBattleView") {
            this.loadRes();
        }
    };
    BaseLoadDisplayObjectContiner.prototype.getRequestData = function () {
        return null;
    };
    BaseLoadDisplayObjectContiner.prototype.request = function (requestType, requestData) {
        if (!requestType) {
            return;
        }
        this._curRequestData = { requestType: requestType, requestData: requestData };
        var eventType = NetManager.getMessageName(requestType);
        if (this._requestTypeList.indexOf(eventType) < 0) {
            App.MessageHelper.addEventListener(eventType, this.receiveEvent, this);
            this._requestTypeList.push(requestType);
        }
        NetManager.request(requestType, requestData);
    };
    BaseLoadDisplayObjectContiner.prototype.receiveEvent = function (event) {
        var requestData = this._curRequestData;
        if (requestData) {
            if (event.type == NetManager.getMessageName(requestData.requestType)) {
                if (event.data && event.data.ret == false) {
                    if (this._isRequesed == false) {
                        this.requestLoadError();
                    }
                    return;
                }
            }
        }
        this.receiveData(event.data);
        if (requestData) {
            if (event.type == NetManager.getMessageName(requestData.requestType)) {
                if (this._isRequesed == false) {
                    this._isRequesed = true;
                    if (this.isLoaded && this._isRequesed) {
                        this.preInit();
                    }
                }
            }
        }
    };
    BaseLoadDisplayObjectContiner.prototype.removeAllRequestEvents = function () {
        var l = this._requestTypeList.length;
        if (l > 0) {
            for (var i = l - 1; i >= 0; i--) {
                this.removeRequestEvent(this._requestTypeList[i]);
            }
        }
    };
    BaseLoadDisplayObjectContiner.prototype.removeRequestEvent = function (requestType) {
        var index = this._requestTypeList.indexOf(requestType);
        if (index > -1) {
            App.MessageHelper.removeEventListener(NetManager.getMessageName(requestType), this.receiveEvent, this);
            this._requestTypeList.splice(index, 1);
        }
    };
    BaseLoadDisplayObjectContiner.prototype.receiveData = function (data) {
    };
    /**
     * 是否已经调用show方法，在调用show之后到hide之前show为true
     */
    BaseLoadDisplayObjectContiner.prototype.isShow = function () {
        return this._isShow;
    };
    BaseLoadDisplayObjectContiner.prototype.isInit = function () {
        return this._isInit;
    };
    BaseLoadDisplayObjectContiner.prototype.hide = function () {
        if (this.isShow()) {
            this.dispose();
        }
    };
    BaseLoadDisplayObjectContiner.prototype.loadRes = function () {
        var resouceList = this.getResourceList();
        if (this._isLoaded == false && resouceList && resouceList.length > 0) {
            this._groupName = ResourceManager.loadResources(resouceList, null, this.delayLoadComplete, null, this, this.resGroupLoadError);
        }
        else {
            this.delayLoadComplete();
        }
    };
    BaseLoadDisplayObjectContiner.prototype.isShowOpenAni = function () {
        return true;
    };
    BaseLoadDisplayObjectContiner.prototype.gameSocketRecountHandler = function (e) {
        if (this._isRequesed == false) {
            this.requestLoadError();
        }
    };
    BaseLoadDisplayObjectContiner.prototype.requestLoadError = function (tip) {
        tip && App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
        this.hideLoadingMask();
        this.hide();
    };
    BaseLoadDisplayObjectContiner.prototype.isShowLoadingMask = function () {
        return true;
    };
    BaseLoadDisplayObjectContiner.prototype.showLoadingMask = function () {
        if (!this.isShowLoadingMask()) {
            return;
        }
        if (!BaseLoadDisplayObjectContiner._loadingWait) {
            BaseLoadDisplayObjectContiner._loadingWait = NetLoadingWait.showMask(500);
        }
        else {
            BaseLoadDisplayObjectContiner._loadingWait.showMask();
        }
        BaseLoadDisplayObjectContiner._loadingWaitCount++;
    };
    BaseLoadDisplayObjectContiner.prototype.hideLoadingMask = function () {
        if (!this.isShowLoadingMask()) {
            return;
        }
        BaseLoadDisplayObjectContiner._loadingWaitCount--;
        if (BaseLoadDisplayObjectContiner._loadingWait) {
            // App.LogUtil.show("displayhide");
            if (BaseLoadDisplayObjectContiner._loadingWaitCount > 0 && Api.switchVoApi.checkOpenResNeedLoading()) {
                egret.setTimeout(function () {
                    BaseLoadDisplayObjectContiner._loadingWait.hideMask();
                }, this, 5000);
                // BaseLoadDisplayObjectContiner._loadingWait.hideMask();
            }
            else {
                BaseLoadDisplayObjectContiner._loadingWait.hideMask();
            }
        }
    };
    BaseLoadDisplayObjectContiner.prototype.resGroupLoadError = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("resLoadErrorTip"));
        this.hideLoadingMask();
        this.hide();
    };
    /**
     * 为了处理多个界面切换闪到主场景的问题，资源加载回调强制延迟一帧
     */
    BaseLoadDisplayObjectContiner.prototype.delayLoadComplete = function () {
        if (this.isShow()) {
            egret.callLater(this.loadComplete, this);
        }
    };
    BaseLoadDisplayObjectContiner.prototype.loadComplete = function () {
        if (this.isShow()) {
            this._isLoaded = true;
            if (this.isLoaded && this._isRequesed) {
                this.preInit();
            }
            this.hideLoadingMask();
        }
    };
    BaseLoadDisplayObjectContiner.prototype.preInit = function () {
        if (this.isLoaded && this._isRequesed) {
            this._isInit = true;
            this.init();
            var className = this.getClassName();
            if (this.getParent()) {
                if (this.getClassName() == "PracticeView" || className == "PrestigeView" || className == "PlayerView") {
                    if (PlayerBottomUI.checkInstance() && this.getParent().contains(PlayerBottomUI.getInstance())) {
                        var childIdex = this.getParent().getChildIndex(PlayerBottomUI.getInstance());
                        this.getParent().addChildAt(this, childIdex);
                    }
                    else {
                        this.getParent().addChild(this);
                    }
                }
                else {
                    this.getParent().addChild(this);
                }
            }
        }
    };
    BaseLoadDisplayObjectContiner.prototype.hideScene = function () {
        return true;
    };
    Object.defineProperty(BaseLoadDisplayObjectContiner.prototype, "isLoaded", {
        get: function () {
            return this._isLoaded;
        },
        enumerable: true,
        configurable: true
    });
    BaseLoadDisplayObjectContiner.prototype.dispose = function () {
        this.removeAllRequestEvents();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_GAMESOCKET_RECOUNT, this.gameSocketRecountHandler, this);
        if (this._isLoaded) {
            if (this._groupName) {
                ResourceManager.destroyRes(this._groupName);
                this._groupName = undefined;
            }
            this._isLoaded = false;
        }
        this._isShow = false;
        this._isInit = false;
        this._isRequesed = false;
        this._curRequestData = null;
        _super.prototype.dispose.call(this);
    };
    BaseLoadDisplayObjectContiner._loadingWaitCount = 0;
    return BaseLoadDisplayObjectContiner;
}(BaseDisplayObjectContainer));
__reflect(BaseLoadDisplayObjectContiner.prototype, "BaseLoadDisplayObjectContiner");
