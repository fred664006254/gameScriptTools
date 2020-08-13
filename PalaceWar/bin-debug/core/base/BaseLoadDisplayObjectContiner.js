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
         * 加载资源重试次数
         */
        _this._loadResTryNum = 0;
        /**
         * 请求type列表
         */
        _this._requestTypeList = [];
        /**
         * 是否已经请求过
         */
        _this._isRequesed = false;
        /**
         *加载资源计时中，超时加log
         */
        _this._waitResTime = -1;
        /**
         *开始加载资源的时间点
         */
        _this._startLoadTime = 0;
        _this._baseurlWhenInit = '';
        return _this;
    }
    BaseLoadDisplayObjectContiner.prototype.show = function (data) {
        if (this.isShow()) {
            this.switchToTop(data);
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
        this.loadRes();
    };
    BaseLoadDisplayObjectContiner.prototype.switchToTop = function (data) {
        if (this._isInit) {
            var parent_1 = this.getParent();
            if (parent_1 && parent_1.contains(this)) {
                var thisIndex = parent_1.getChildIndex(this);
                var numChildren = parent_1.numChildren;
                if (numChildren - thisIndex > 1) {
                    var className = this.getClassName();
                    if (className == "PracticeView" || className == "PrestigeView" || className == "PlayerView" || className == "OfficialcareerView") {
                    }
                    else {
                        parent_1.removeChild(this);
                        parent_1.addChild(this);
                        Api.mainTaskVoApi.checkShowGuide();
                    }
                }
            }
        }
    };
    BaseLoadDisplayObjectContiner.prototype.getRequestData = function () {
        return null;
    };
    BaseLoadDisplayObjectContiner.prototype.request = function (requestType, requestData) {
        if (!requestType) {
            return;
        }
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
                this._curRequestData = null;
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
                if (this._isRequesed == false && this.isShow()) {
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
        var _this = this;
        var resouceList = this.getResourceList();
        this._startLoadTime = egret.getTimer();
        if (this._isLoaded == false && resouceList && resouceList.length > 0) {
            this._waitResTime = egret.setTimeout(function (resouceList) {
                _this.clearResTimeCount();
                _this.reportResLoadTimeOut();
            }, this, GameData.waitLdRpt, resouceList);
            this._groupName = ResourceManager.loadResources(resouceList, null, this.delayLoadComplete, null, this, this.resGroupLoadError);
        }
        else {
            this.delayLoadComplete();
        }
    };
    BaseLoadDisplayObjectContiner.prototype.gameSocketRecountHandler = function (e) {
        if (this._isRequesed == false) {
            this.requestLoadError();
        }
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
    };
    BaseLoadDisplayObjectContiner.prototype.hideLoadingMask = function () {
        if (!this.isShowLoadingMask()) {
            return;
        }
        if (BaseLoadDisplayObjectContiner._loadingWait) {
            // App.LogUtil.show("displayhide");
            BaseLoadDisplayObjectContiner._loadingWait.hideMask();
        }
    };
    BaseLoadDisplayObjectContiner.prototype.requestLoadError = function () {
        var requestErrorTip = this.getRequestErrorTip();
        // if(requestErrorTip)
        // {
        // 	App.CommonUtil.showTip(requestErrorTip);
        // }
        this.hideLoadingMask();
        this.hide();
    };
    /**
     * 请求失败的提示
     */
    BaseLoadDisplayObjectContiner.prototype.getRequestErrorTip = function () {
        return LanguageManager.getlocal("requestLoadErrorTip");
    };
    BaseLoadDisplayObjectContiner.prototype.resGroupLoadError = function () {
        var _this = this;
        this.clearResTimeCount();
        if (this._groupName) {
            ResourceManager.destroyRes(this._groupName);
            ResourceManager.deleteDiskCacheByKeyOrUrl(this._groupName);
            this._groupName = undefined;
        }
        if (this._loadResTryNum < 5) {
            this._loadResTryNum++;
            console.log("loadres " + this.getClassName() + " error retry-" + this._loadResTryNum);
            this.loadRes();
        }
        else {
            if (App.DeviceUtil.IsHtml5() && !this._baseurlWhenInit) {
                this._baseurlWhenInit = document.baseURI;
            }
            App.ResourceUtil.retrySwithCDN(this.getClassName(), function (count) {
                if (count < 12) {
                    _this._loadResTryNum++;
                    console.log("loadres " + _this.getClassName() + " error retry-" + _this._loadResTryNum);
                    _this.loadRes();
                }
                else {
                    _this.cancleLoadAndTip();
                }
            }, this, false, function () {
                _this.cancleLoadAndTip();
            });
        }
    };
    BaseLoadDisplayObjectContiner.prototype.cancleLoadAndTip = function () {
        if (Api.switchVoApi.checkOpenIOSLoadErrorView() && App.DeviceUtil.checkHasIOSClearCacheApi()) {
            ViewController.getInstance().openView(ViewConst.POPUP.ERRORPOPUPVIEW, { callback: ResourceManager.clearDiskCache.bind(ResourceManager), msg: LanguageManager.getlocal("loadResFailTip"), title: LanguageManager.getlocal("itemUseConstPopupViewTitle"), showCloseBtn: true });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("resLoadErrorTip"));
        }
        this.hideLoadingMask();
        this.hide();
        if (this._baseurlWhenInit) {
            if (App.DeviceUtil.IsHtml5() && window["recoveryCDN"]) {
                window["recoveryCDN"](this.getClassName(), this._baseurlWhenInit);
            }
        }
        this._loadResTryNum = 0;
    };
    /**
     * 为了处理多个界面切换闪到主场景的问题，资源加载回调强制延迟一帧
     */
    BaseLoadDisplayObjectContiner.prototype.delayLoadComplete = function () {
        if (this._baseurlWhenInit) {
            if (App.DeviceUtil.IsHtml5() && window["recoveryCDN"]) {
                window["recoveryCDN"](this.getClassName(), this._baseurlWhenInit);
            }
        }
        this.clearResTimeCount();
        if (egret.getTimer() - this._startLoadTime >= GameData.waitLdRpt) {
            this.reportResLoadTimeOut();
        }
        if (this.isShow()) {
            if (this.getClassName() == ViewConst.BASE.ACCOMMONREPORTVIEW) {
                this.loadComplete();
            }
            else {
                egret.callLater(this.loadComplete, this);
            }
        }
    };
    BaseLoadDisplayObjectContiner.prototype.clearResTimeCount = function () {
        if (this._waitResTime > -1) {
            egret.clearTimeout(this._waitResTime);
            this._waitResTime = -1;
        }
    };
    BaseLoadDisplayObjectContiner.prototype.reportResLoadTimeOut = function () {
        var reportData = { view: this.getClassName(), res: this.getResourceList(), cost: egret.getTimer() - this._startLoadTime };
        StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData), "reswait3");
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
            var parent_2 = this.getParent();
            if (parent_2) {
                if (this.getClassName() == "PracticeView" || className == "PrestigeView" || className == "PlayerView" || className == "OfficialcareerView") {
                    if (PlayerBottomUI.checkInstance() && parent_2.contains(PlayerBottomUI.getInstance())) {
                        var childIdex = parent_2.getChildIndex(PlayerBottomUI.getInstance());
                        parent_2.addChildAt(this, childIdex);
                    }
                    else {
                        parent_2.addChild(this);
                    }
                }
                else {
                    parent_2.addChild(this);
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
        this.clearResTimeCount();
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
        this._loadResTryNum = 0;
        this._baseurlWhenInit = '';
        _super.prototype.dispose.call(this);
    };
    return BaseLoadDisplayObjectContiner;
}(BaseDisplayObjectContainer));
__reflect(BaseLoadDisplayObjectContiner.prototype, "BaseLoadDisplayObjectContiner");
//# sourceMappingURL=BaseLoadDisplayObjectContiner.js.map