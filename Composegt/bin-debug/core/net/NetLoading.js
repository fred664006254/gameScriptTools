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
    var _loadingImagePoint;
    var _mask;
    var intervalHand;
    var progressValue = 0;
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
            maskSp.graphics.beginFill(TextFieldConst.COLOR_BLACK, 0.3);
            maskSp.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
            maskSp.graphics.endFill();
            maskSp.touchEnabled = true;
            _container.addChild(maskSp);
            // 文字
            var loadingText = void 0;
            var texture = ResourceManager.getRes("loading_text");
            if (texture) {
                loadingText = BaseBitmap.create("loading_text");
            }
            else {
                var rect = egret.Rectangle.create();
                rect.setTo(0, 0, 136, 28);
                if (PlatformManager.checkIsViSp()) {
                    rect.setTo(0, 0, 240, 28);
                }
                loadingText = BaseLoadBitmap.create("loading_text", rect);
            }
            loadingText.x = GameConfig.stageWidth / 2;
            loadingText.y = GameConfig.stageHeigth / 2 - 30;
            loadingText.anchorOffsetX = loadingText.width / 2;
            loadingText.anchorOffsetY = loadingText.height / 2;
            _container.addChild(loadingText);
            if (PlatformManager.checkIsMwSp()) {
                loadingText.visible = false;
            }
            // 进度条背景
            var loading_bg = void 0;
            var textureBg = ResourceManager.getRes("loading_bg");
            if (textureBg) {
                loading_bg = BaseBitmap.create("loading_bg");
            }
            else {
                var rect = egret.Rectangle.create();
                rect.setTo(0, 0, 438, 13);
                loading_bg = BaseLoadBitmap.create("loading_bg", rect);
            }
            loading_bg.x = GameConfig.stageWidth / 2;
            loading_bg.y = GameConfig.stageHeigth / 2;
            loading_bg.anchorOffsetX = loading_bg.width / 2;
            loading_bg.anchorOffsetY = loading_bg.height / 2;
            _container.addChild(loading_bg);
            // 进度条
            var textureprogress = ResourceManager.getRes("loading_progress");
            if (textureprogress) {
                _loadingImage = BaseBitmap.create("loading_progress");
            }
            else {
                var rect = egret.Rectangle.create();
                rect.setTo(0, 0, 438, 13);
                _loadingImage = BaseLoadBitmap.create("loading_progress", rect);
            }
            _loadingImage.x = GameConfig.stageWidth / 2 - _loadingImage.width / 2;
            _loadingImage.y = GameConfig.stageHeigth / 2;
            // _loadingImage.anchorOffsetX = _loadingImage.width/2;
            _loadingImage.anchorOffsetY = _loadingImage.height / 2;
            _container.addChild(_loadingImage);
            // 光点
            var texturePoint = ResourceManager.getRes("light_point");
            if (texturePoint) {
                _loadingImagePoint = BaseBitmap.create("light_point");
            }
            else {
                var rect = egret.Rectangle.create();
                rect.setTo(0, 0, 22, 54);
                _loadingImagePoint = BaseLoadBitmap.create("light_point", rect);
            }
            _loadingImagePoint.x = GameConfig.stageWidth / 2;
            _loadingImagePoint.y = GameConfig.stageHeigth / 2;
            _loadingImagePoint.anchorOffsetX = _loadingImagePoint.width / 2;
            _loadingImagePoint.anchorOffsetY = _loadingImagePoint.height / 2;
            _container.addChild(_loadingImagePoint);
            // let loadingTF:BaseTextField = new BaseTextField();
            // loadingTF.text = LanguageManager.getlocal("netLoadingTitle");
            // loadingTF.x = GameConfig.stageWidth/2 - loadingTF.width/2;
            // loadingTF.y = _loadingImage.y + _loadingImage.height/2 + 10;
            // _container.addChild(loadingTF);
        }
        if (!LayerManager.maskLayer.contains(_container)) {
            // App.LogUtil.log("show add " + _totalNum);
            LayerManager.maskLayer.addChild(_container);
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
            if (_container && LayerManager.maskLayer.contains(_container)) {
                // App.LogUtil.log("hide remove " + _totalNum);
                pauseAnimat();
                LayerManager.maskLayer.removeChild(_container);
            }
            // App.LogUtil.log("hide " + _totalNum);
            _totalNum = 0;
            result = true;
        }
        return result;
    }
    NetLoading.hide = hide;
    function startAnimat() {
        if (intervalHand == null) {
            intervalHand = setInterval(function () {
                progressValue += 1;
                if (progressValue >= 100) {
                    progressValue = 0;
                }
                if (!_mask) {
                    _mask = new egret.Rectangle(0, 0, _loadingImage.width * (progressValue / 100), _loadingImage.height);
                }
                else {
                    _mask.setTo(0, 0, _loadingImage.width * (progressValue / 100), _loadingImage.height);
                }
                _loadingImage.mask = _mask;
                // _loadingImage.x = GameConfig.stageWidth/2 - _loadingImage.width/2;
                _loadingImagePoint.x = _loadingImage.x + _loadingImage.width * progressValue / 100;
            }, 800 / 100);
        }
    }
    NetLoading.startAnimat = startAnimat;
    function pauseAnimat() {
        if (intervalHand) {
            window.clearInterval(intervalHand);
            intervalHand = null;
        }
    }
    NetLoading.pauseAnimat = pauseAnimat;
    function dispose() {
        if (intervalHand) {
            egret.Tween.removeTweens(_container);
            intervalHand = null;
        }
        if (_loadingImage) {
            _loadingImage = null;
        }
        if (_loadingImagePoint) {
            _loadingImagePoint = null;
        }
        if (_mask) {
            _mask = null;
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
            if (!LayerManager.maskLayer.contains(this.waitMask)) {
                LayerManager.maskLayer.addChild(this.waitMask);
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
            if (this.waitMask && LayerManager.maskLayer.contains(this.waitMask)) {
                LayerManager.maskLayer.removeChild(this.waitMask);
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
