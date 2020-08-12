var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * loading、加载资源时显示，调用这个是立即显示
 * author dmj
 * date 2017/9/10
 * @namespace NetLoading
 */
var NetLoading;
(function (NetLoading) {
    // 当前有多少次显示loading
    var _totalNum = 0;
    var _container = null;
    var _loadingImage;
    var _loadingTween;
    function show() {
        // App.LogUtil.log("show " + _totalNum);
        if (_totalNum > 0) {
            _totalNum++;
            return false;
        }
        if (_container == null) {
            // App.LogUtil.log("init " + _totalNum);
            _container = new BaseDisplayObjectContainer();
            var maskSp = new egret.Shape();
            maskSp.graphics.beginFill(ColorEnums.black, 0.3);
            maskSp.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
            maskSp.graphics.endFill();
            maskSp.touchEnabled = true;
            _container.addChild(maskSp);
            var texture = ResMgr.getRes("loading_circle");
            if (texture) {
                _loadingImage = BaseBitmap.create("loading_circle");
            }
            else {
                var rect = egret.Rectangle.create();
                rect.setTo(0, 0, 101, 101);
                _loadingImage = BaseLoadBitmap.create("loading_circle", rect);
            }
            _loadingImage.x = GameConfig.stageWidth / 2;
            _loadingImage.y = GameConfig.stageHeigth / 2;
            _loadingImage.anchorOffsetX = _loadingImage.width / 2;
            _loadingImage.anchorOffsetY = _loadingImage.height / 2;
            _container.addChild(_loadingImage);
            // let loadingTF:BaseTextField = new BaseTextField();
            // loadingTF.text = LanguageManager.getlocal("netLoadingTitle");
            // loadingTF.x = GameConfig.stageWidth/2 - loadingTF.width/2;
            // loadingTF.y = _loadingImage.y + _loadingImage.height/2 + 10;
            // _container.addChild(loadingTF);
        }
        if (!LayerMgr.maskLayer.contains(_container)) {
            // App.LogUtil.log("show add " + _totalNum);
            LayerMgr.maskLayer.addChild(_container);
        }
        startAnimat();
        _totalNum++;
        return true;
    }
    NetLoading.show = show;
    function hideForChangeAccount() {
        _totalNum = 0;
        hide();
    }
    NetLoading.hideForChangeAccount = hideForChangeAccount;
    function hide() {
        var result = true;
        if (_totalNum > 1) {
            _totalNum--;
            result = false;
        }
        else {
            if (_container && LayerMgr.maskLayer.contains(_container)) {
                // App.LogUtil.log("hide remove " + _totalNum);
                pauseAnimat();
                LayerMgr.maskLayer.removeChild(_container);
            }
            // App.LogUtil.log("hide " + _totalNum);
            _totalNum = 0;
            result = true;
        }
        return result;
    }
    NetLoading.hide = hide;
    function startAnimat() {
        if (_loadingTween == null) {
            _loadingTween = egret.Tween.get(_loadingImage, { loop: true });
            _loadingTween.to({ rotation: -360 }, 1500);
        }
        else {
            egret.Tween.resumeTweens(_container);
        }
    }
    NetLoading.startAnimat = startAnimat;
    function pauseAnimat() {
        if (_loadingTween) {
            egret.Tween.pauseTweens(_container);
        }
    }
    NetLoading.pauseAnimat = pauseAnimat;
    function dispose() {
        if (_loadingTween) {
            egret.Tween.removeTweens(_container);
            _loadingTween = null;
        }
        if (_loadingImage) {
            _loadingImage = null;
        }
        if (_container) {
            _container.dispose();
            _container = null;
        }
        _totalNum = 0;
    }
    NetLoading.dispose = dispose;
})(NetLoading || (NetLoading = {}));
/**
 * 加载资源或者请求时候调用，添加延迟后调用loading，默认500毫秒，show和mask必须一一对应
 */
var NetLoadingWait;
(function (NetLoadingWait) {
    function showMask(waitTime) {
        var loadingWait = new LoadingWait();
        loadingWait.showMask(waitTime);
        return loadingWait;
    }
    NetLoadingWait.showMask = showMask;
    // export function hideMask(loadingWait:LoadingWait):void
    // {
    // 	loadingWait.hideMask();
    // }
    var LoadingWait = (function () {
        function LoadingWait() {
            this.waitShowLoadingTime = 500;
            this.waitTimeOut = -1;
            this.isLoadingShowed = false;
        }
        LoadingWait.prototype.showMask = function (waitTime) {
            var _this = this;
            if (!this.waitMask) {
                this.waitMask = BaseBitmap.create("public_alphabg");
                this.waitMask.width = GameConfig.stageWidth;
                this.waitMask.height = GameConfig.stageHeigth;
                this.waitMask.touchEnabled = true;
            }
            if (!LayerMgr.maskLayer.contains(this.waitMask)) {
                LayerMgr.maskLayer.addChild(this.waitMask);
                if (this.waitTimeOut < 0) {
                    this.waitShowLoadingTime = waitTime ? waitTime : this.waitShowLoadingTime;
                    this.waitTimeOut = egret.setTimeout(function () {
                        NetLoading.show();
                        _this.isLoadingShowed = true;
                        egret.clearTimeout(_this.waitTimeOut);
                        _this.waitTimeOut = -1;
                    }, this, this.waitShowLoadingTime);
                }
            }
        };
        LoadingWait.prototype.hideMask = function () {
            if (this.waitMask && LayerMgr.maskLayer.contains(this.waitMask)) {
                LayerMgr.maskLayer.removeChild(this.waitMask);
            }
            if (this.waitTimeOut > -1) {
                egret.clearTimeout(this.waitTimeOut);
                this.waitTimeOut = -1;
            }
            if (this.isLoadingShowed) {
                NetLoading.hide();
                this.isLoadingShowed = false;
            }
        };
        LoadingWait.prototype.dispose = function () {
            this.hideMask();
            if (this.waitMask) {
                this.waitMask.dispose();
                BaseBitmap.release(this.waitMask);
                this.waitMask = null;
            }
        };
        return LoadingWait;
    }());
    NetLoadingWait.LoadingWait = LoadingWait;
    __reflect(LoadingWait.prototype, "NetLoadingWait.LoadingWait");
})(NetLoadingWait || (NetLoadingWait = {}));
//# sourceMappingURL=NetLoading.js.map