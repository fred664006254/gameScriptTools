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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        App.MsgHelper.addEvt(MsgConst.SC_DECODE_ERROR, ViewController.getInstance().openScErrorView, ViewController.getInstance());
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
        if (PlatMgr.checkCrossDomon()) {
            egret.ImageLoader.crossOrigin = "anonymous";
        }
        App.ResourceUtil.formatSheetLoad();
        App.LogUtil.init();
        RES.setMaxLoadingThread(4);
        this.stage.maxTouches = 1;
        if (App.DeviceUtil.isRuntime2()) {
            this.stage.frameRate = 60;
        }
        PlatMgr.init();
        App.CommonUtil.overwriteAlert();
        GameConfig.init();
        StatisticsHelper.init();
        if (window["RSDKPlatform"]) {
            GameData.isLoadCrossImageError = window["RSDKPlatform"].getDisableCache ? window["RSDKPlatform"].getDisableCache() == "1" : false;
            GameData.isLoadedSuccessImage = window["RSDKPlatform"].getEnableCacheForver ? window["RSDKPlatform"].getEnableCacheForver() == "1" : false;
        }
        LayerMgr.initLayer(this);
        SoundMgr.init();
        ServerCfg.initSvrUrl();
        BattleStatus.init();
        App.LogUtil.show("size:", GameConfig.stageWidth, "x", GameConfig.stageHeigth);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onError, this);
        this.loadDefaultJson();
        if (window["rgame_rotation"] == 1) {
            var text1 = ComponentMgr.getTextField("<font color=0xb0faff  size=30>健康游戏忠告</font>\n<font color=0x6ebdc6  size=26>抵制不良游戏，拒绝盗版游戏。\n注意自我保护，谨防上当受骗。\n适度游戏益脑，沉迷游戏伤身。\n合理安排时间，享受健康生活。</font>", TextFieldConst.SIZE_TITLE_POPUP);
            text1.lineSpacing = 5;
            text1.textAlign = egret.HorizontalAlign.CENTER;
            text1.setPosition((GameConfig.stageWidth - text1.width) / 2 + GameData.layerPosX, GameData.layerPosY + (GameConfig.stageHeigth - text1.height) / 2);
            GameConfig.stage.addChild(text1);
            text1.name = "xlTxt";
            var refreshTxt = ComponentMgr.getTextField("", TextFieldConst.SIZE_CONTENT_COMMON);
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
            refreshTxt.setPosition(GameConfig.stageWidth * 0.5 - refreshTxt.width * 0.5 + GameData.layerPosX, GameData.layerPosY + GameConfig.stageHeigth - 160);
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
        GameData.curDefaultName = baseUrl + defaultJsonData.url;
        LoginMgr.setLog("start load default.res.json");
        RES.loadConfig(defaultJsonData.url, defaultJsonData.file);
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
            url = ServerCfg.getWxDefaultUrl();
        }
        else if (App.DeviceUtil.isQQGame()) {
            file = ServerCfg.getQQGameResourceUrl();
            url = ServerCfg.getQQGameResJsonUrl(); //`resourceallin/default.res.json`;
        }
        return { url: url, file: file };
    };
    Main.prototype.onError = function (event) {
        var _this = this;
        var logStr = "default.res.json load error";
        App.LogUtil.log(logStr);
        LoginMgr.setLog(logStr);
        App.ResourceUtil.retrySwithCDN("resource/default.res.json", function () {
            _this.loadDefaultJson();
        }, this);
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        LoginMgr.setLog("default.res.json load success");
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
        if (App.DeviceUtil.isRuntime2()) {
            if (window["setIndexProgress"]) {
                window["setIndexProgress"](85);
            }
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
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