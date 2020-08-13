var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        App.CommonUtil.checkAndJumpToTest();
        if (App.DeviceUtil.IsHtml5()) {
            var shp = new egret.Shape();
            shp.graphics.beginFill(0x131F2C);
            shp.graphics.drawRect(0, 0, 100, 100);
            shp.graphics.endFill();
            shp.width = 100;
            shp.height = 100;
            this.addChild(shp);
            var isHit = shp.hitTestPoint(10, 10, true);
            if (!isHit) {
                GameData.isSupportHitTestPoint = false;
            }
            shp.graphics.clear();
            this.removeChild(shp);
        }
        if (App.DeviceUtil.isWXgame()) {
            window["__WXGAME_OS__"] = window["wx"].getSystemInfoSync().platform;
            console.log("main", window["__WXGAME_OS__"]);
        }
        // 微信小游戏，需要将类包放到window下
        if (App.DeviceUtil.isWXgame()) {
            WxGameInclude.include();
        }
        // if (App.DeviceUtil.IsHtml5()) {
        //     let realResetStageText = egret.web["HTML5StageText"].prototype.$resetStageText;
        //     egret.web["HTML5StageText"].prototype.$resetStageText = function() {
        //         realResetStageText.call(this);
        //         var textfield = this.$textfield;
        //         if (this.inputDiv) {
        //             this.inputDiv.style.clip = "rect(0px " + (textfield.width * this._gscaleX) + "px " + (textfield.height * this._gscaleY + 50) + "px 0px)";
        //         }
        //         if (this.inputElement) {
        //             this.inputElement.style.height = null;
        //         }
        //     }
        // }
        // 微个小游戏，热启动时的更新处理
        if (App.DeviceUtil.isWXgame()) {
            if (typeof window["wx"].getUpdateManager === 'function') {
                var updateManager_1 = window["wx"].getUpdateManager();
                updateManager_1.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    console.log("in main检查新版本", res.hasUpdate);
                });
                updateManager_1.onUpdateReady(function () {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    console.log("in main新的版本已经下载好，调用 applyUpdate 应用新版本并重启");
                    // window["wxgameCleanCacheImage"]();
                    // window["wxgameCleanCacheText"]();
                    updateManager_1.applyUpdate();
                });
                updateManager_1.onUpdateFailed(function () {
                    // 新的版本下载失败
                    console.log("in main新的版本下载失败");
                });
            }
        }
        // egret.lifecycle.addLifecycleListener((context) => {
        //     context.onUpdate = () => {
        //     }
        // })
        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }
        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }
        if (PlatformManager.checkCrossDomon()) {
            egret.ImageLoader.crossOrigin = "anonymous";
        }
        App.ResourceUtil.formatSheetLoad();
        RES.setMaxLoadingThread(4);
        this.stage.maxTouches = 1;
        if (App.DeviceUtil.isRuntime2()) {
            this.stage.frameRate = 60;
        }
        PlatformManager.init();
        App.CommonUtil.overwriteAlert();
        GameConfig.stage = egret.MainContext.instance.stage;
        GameConfig.stageWidth = egret.MainContext.instance.stage.stageWidth;
        GameConfig.stageHeigth = egret.MainContext.instance.stage.stageHeight;
        if (App.DeviceUtil.checkIsFullscreen()) {
            GameConfig.stageHeigth = 1136;
        }
        if (window["RSDKPlatform"]) {
            GameData.isLoadCrossImageError = window["RSDKPlatform"].getDisableCache ? window["RSDKPlatform"].getDisableCache() == "1" : false;
            GameData.isLoadedSuccessImage = window["RSDKPlatform"].getEnableCacheForver ? window["RSDKPlatform"].getEnableCacheForver() == "1" : false;
        }
        LayerManager.initLayer(this);
        Api.init();
        SoundManager.init();
        ServerCfg.initSvrUrl();
        App.LogUtil.show("size:", GameConfig.stageWidth, "x", GameConfig.stageHeigth);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onError, this);
        this.loadDefaultJson();
        // 新手引导处理关闭按钮的引导位置
        if (PlatformManager.hasSpcialCloseBtn()) {
            RookieCfg.getRookieCfg("14_5").clickRect.x = 20;
            RookieCfg.getRookieCfg("14_5").handPos.x = 43;
            RookieCfg.getRookieCfg("14_5").handPos.flip = false;
            RookieCfg.getRookieCfg("106_1").clickRect.x = 20;
            RookieCfg.getRookieCfg("106_1").handPos.x = 43;
            RookieCfg.getRookieCfg("106_1").handPos.flip = false;
            RookieCfg.getRookieCfg("126").clickRect.x = 20;
            RookieCfg.getRookieCfg("126").handPos.x = 43;
            RookieCfg.getRookieCfg("126").handPos.flip = false;
        }
        if (PlatformManager.checkIsXlSp() || window["rgame_rotation"] == 1) {
            var text1 = ComponentManager.getTextField("<font color=0xb0faff  size=30>健康游戏忠告</font>\n<font color=0x6ebdc6  size=26>抵制不良游戏，拒绝盗版游戏。\n注意自我保护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身。\n合理安排时间，享受健康生活。</font>", TextFieldConst.FONTSIZE_TITLE_COMMON);
            text1.lineSpacing = 5;
            text1.textAlign = egret.HorizontalAlign.CENTER;
            text1.setPosition((GameConfig.stageWidth - text1.width) / 2, GameData.layerPosY + (GameConfig.stageHeigth - text1.height) / 2);
            GameConfig.stage.addChild(text1);
            text1.name = "xlTxt";
            var refreshTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            refreshTxt.stroke = 1;
            refreshTxt.strokeColor = 0;
            refreshTxt.textFlow = new Array({ text: "如果无法进入游戏，请", style: { "textColor": 0xffffff } }, { text: "点击刷新", style: { "textColor": 0xff0000, "underline": true, "href": "event:text event triggered" } });
            refreshTxt.touchEnabled = true;
            refreshTxt.addEventListener(egret.TextEvent.LINK, function (evt) {
                if (App.DeviceUtil.IsHtml5()) {
                    StatisticsHelper.reportLoadData("reload_2");
                    window.location.reload();
                }
            }, this);
            refreshTxt.setPosition(GameConfig.stageWidth * 0.5 - refreshTxt.width * 0.5, GameData.layerPosY + GameConfig.stageHeigth - 160);
            GameConfig.stage.addChild(refreshTxt);
            refreshTxt.name = "xlrefreshTxt";
        }
    };
    Main.prototype.loadDefaultJson = function () {
        var defaultJsonData = this.getDefaultJsonData();
        var baseUrl = "";
        if (App.DeviceUtil.IsHtml5()) {
            baseUrl = document.baseURI || "";
        }
        else if (App.DeviceUtil.isRuntime2()) {
            var logoUrl = PlatformManager.getPathRuleName() ? "loading/loading_" + PlatformManager.getPathRuleName() + ".png" : "/loading/loading.png";
            var loginLogo_1 = BaseLoadBitmap.create(logoUrl, null, { callback: function () {
                    loginLogo_1.setScale(1.5);
                    loginLogo_1.setPosition((GameConfig.stageWidth - loginLogo_1.width * loginLogo_1.scaleX) * 0.5, 100 + GameData.layerPosY);
                    loginLogo_1.visible = true;
                }, callbackThisObj: this });
            loginLogo_1.name = "gameruntimelogo";
            GameConfig.stage.addChild(loginLogo_1);
            loginLogo_1.visible = false;
        }
        GameData.curDefaultName = baseUrl + defaultJsonData.url;
        RES.loadConfig(defaultJsonData.url, defaultJsonData.file);
        //
        //注入配置
        // if(1){
        //     let json = RES.getResByUrl(`https://wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/resourceallin/default_9dbd6af0.res.json`,(data)=>{
        //         data;
        //         
        //     },this);
        // }  
    };
    Main.prototype.getDefaultJsonData = function () {
        var url = "resource/default.res.json";
        var file = "resource/";
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            if (App.DeviceUtil.isWyw()) {
                url = "gt_lm/resourceallin/default.res.json";
                file = "gt_lm/resourceallin/";
            }
            else {
                if (window["defaultResJsonName"]) {
                    var jsonName = window["defaultResJsonName"];
                    if (jsonName.indexOf("resource/") == -1) {
                        url = "resource/" + jsonName;
                    }
                    else {
                        url = jsonName;
                    }
                }
                else {
                    var date = new Date();
                    var t = window["mainJsonVersion"] ? window["mainJsonVersion"] : Math.floor(date.getTime() / 1000);
                    url = "resource/default.res.json?vs=" + t;
                }
            }
        }
        else if (App.DeviceUtil.isWXgame() && !App.DeviceUtil.isQQGame()) {
            file = ServerCfg.getWxGameResourceUrl();
        }
        else if (App.DeviceUtil.isQQGame()) {
            file = ServerCfg.getQQGameResourceUrl();
            url = ServerCfg.getQQGameResJsonUrl(); //`resourceallin/default.res.json`;
        }
        return { url: url, file: file };
    };
    Main.prototype.onError = function (event) {
        var _this = this;
        App.LogUtil.log("default error");
        App.ResourceUtil.retrySwithCDN("resource/default.res.json", function () {
            _this.loadDefaultJson();
        }, this);
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        //处理九宫格开始
        // let cfg = event.target.resConfig.keyMap;
        // if(cfg)
        // {
        //     let scaleCfg={};
        //     for(var key in cfg)
        //     {
        //         if(cfg[key]&&cfg[key].scale9grid)
        //         {
        //             scaleCfg[key]={scale9grid:cfg[key].scale9grid};
        //         }
        //     }
        //     App.LogUtil.log(scaleCfg);
        // }
        //处理九宫格结束
        if (event && event.target && event.target.resConfig) {
            GameConfig.resCfg = event.target.resConfig;
        }
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onError, this);
        App.LoginResLoader.loadLoginBgRes();
        App.LoginResLoader.isDefaultResLoaded = true;
        if (RSDKHelper.isInit) {
            App.LoginResLoader.initPlatCfg();
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
if (egret.web && egret.web["HtmlSound"]) {
    egret.web["HtmlSound"].prototype.close = function () {
        if (this.loaded == false && this.originAudio)
            this.originAudio.src = "";
        if (this.originAudio)
            this.originAudio = null;
        egret.web["HtmlSound"].$clear(this.url);
    };
}
if (egret.web && egret.web['HTMLInput']) {
    egret.web['HTMLInput'].prototype.initInputElement = function (multiline) {
        var self = this;
        //增加1个空的textarea
        var inputElement;
        if (multiline) {
            inputElement = document.createElement("textarea");
            inputElement.style["resize"] = "none";
            self._multiElement = inputElement;
            inputElement.id = "egretTextarea";
        }
        else {
            inputElement = document.createElement("input");
            self._simpleElement = inputElement;
            inputElement.id = "egretInput";
        }
        inputElement.type = "text";
        self._inputDIV.appendChild(inputElement);
        inputElement.setAttribute("tabindex", "-1");
        inputElement.style.width = "1px";
        inputElement.style.height = "12px";
        self.initValue(inputElement);
        inputElement.style.outline = "thin";
        inputElement.style.background = "none";
        inputElement.style.overflow = "hidden";
        inputElement.style.wordBreak = "break-all";
        //隐藏输入框
        inputElement.style.opacity = 0.1;
        inputElement.oninput = function () {
            if (self._stageText) {
                self._stageText._onInput();
            }
        };
    };
    egret.web['HTMLInput'].prototype.clearInputElement = function () {
        var self = this;
        if (self._inputElement) {
            self._inputElement.value = "";
            self._inputElement.onblur = null;
            self._inputElement.style.width = "1px";
            self._inputElement.style.height = "12px";
            self._inputElement.style.left = "0px";
            self._inputElement.style.top = "0px";
            self._inputElement.style.opacity = 0.1;
            var otherElement = void 0;
            if (self._simpleElement == self._inputElement) {
                otherElement = self._multiElement;
            }
            else {
                otherElement = self._simpleElement;
            }
            otherElement.style.display = "block";
            self._inputDIV.style.left = 0 + "px";
            self._inputDIV.style.top = "-100px";
            self._inputDIV.style.height = 0 + "px";
            self._inputDIV.style.width = 0 + "px";
        }
        if (self._stageText) {
            self._stageText._onDisconnect();
            self._stageText = null;
            this.canvas['userTyping'] = false;
        }
    };
}
//# sourceMappingURL=Main.js.map