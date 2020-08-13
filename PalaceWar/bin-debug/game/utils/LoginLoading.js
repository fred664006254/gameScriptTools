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
var LoginLoading = (function (_super) {
    __extends(LoginLoading, _super);
    // private _wxgameText : BaseTextField;
    function LoginLoading() {
        return _super.call(this) || this;
    }
    LoginLoading.prototype.getResourceList = function () {
        return [];
    };
    LoginLoading.prototype.init = function () {
        if (PlatformManager.isShowWXLoading()) {
            //     let wxgameText:BaseTextField=ComponentManager.getTextField("<font color=0xb0faff  size=30>健康游戏忠告</font>\n<font color=0x6ebdc6  size=26>抵制不良游戏，拒绝盗版游戏。\n注意自我保护，谨防上当受骗。\n适度游戏益脑，沉迷游戏伤身。\n合理安排时间，享受健康生活。</font>",TextFieldConst.FONTSIZE_TITLE_COMMON);
            //     wxgameText.lineSpacing=5;
            //     wxgameText.textAlign=egret.HorizontalAlign.CENTER;
            //     wxgameText.setPosition((GameConfig.stageWidth-wxgameText.width)/2,(GameConfig.stageHeigth-wxgameText.height)/2);
            //     this.addChild(wxgameText);
            //     wxgameText.name="wxgameText";
            // 	this._wxgameText = wxgameText;
            var bg = BaseBitmap.create("wxloadingbg");
            bg.setPosition(0, (GameConfig.stageHeigth - bg.height) / 2);
            this.addChild(bg);
        }
        // this.hideReloadDiv();
        var progressBarBg = BaseBitmap.create("loginbg_progressbg");
        progressBarBg.setPosition(GameConfig.stageWidth / 2 - progressBarBg.width / 2, GameConfig.stageHeigth - 128.8);
        this.addChild(progressBarBg);
        if (PlatformManager.isShowWXLoading()) {
            this._progressBar = ComponentManager.getProgressBar("loginbg_wxprogress1", "loginbg_wxprogress1_bg");
            progressBarBg.visible = false;
        }
        else {
            this._progressBar = ComponentManager.getProgressBar(ProgressBarConst.IMAGE_PROGRESS1, ProgressBarConst.IMAGE_PROGRESS1_Bg);
        }
        this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.getBgWidth() / 2;
        this._progressBar.y = GameConfig.stageHeigth - 100;
        this.addChild(this._progressBar);
        this.setPercentage(0);
        var loginLoadingTxt = BaseBitmap.create("login_loading");
        loginLoadingTxt.setPosition(GameConfig.stageWidth * 0.5 - loginLoadingTxt.width * 0.5, this._progressBar.y - loginLoadingTxt.height - 5);
        this.addChild(loginLoadingTxt);
        var loadNumBMTxt;
        if (PlatformManager.isShowWXLoading()) {
            loadNumBMTxt = ComponentManager.getBitmapText("0%", "loadnumwx_fnt");
        }
        else {
            loadNumBMTxt = ComponentManager.getBitmapText("0%", "loadnum_fnt");
        }
        loadNumBMTxt.width = 100;
        loadNumBMTxt.textAlign = egret.HorizontalAlign.CENTER;
        loadNumBMTxt.setPosition(GameConfig.stageWidth * 0.5 - loadNumBMTxt.width * 0.5, this._progressBar.y + this._progressBar.getBgHeight() + 5);
        this.addChild(loadNumBMTxt);
        this._loadNumBMTxt = loadNumBMTxt;
        if (PlatformManager.checkIsXlSp()) {
            this.hideReloadDiv();
            var refreshTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            refreshTxt.stroke = 1;
            refreshTxt.strokeColor = 0;
            refreshTxt.textFlow = new Array({ text: "如果无法进入游戏，请", style: { "textColor": 0xffffff } }, { text: "点击刷新", style: { "textColor": 0xff0000, "underline": true, "href": "event:text event triggered" } });
            refreshTxt.touchEnabled = true;
            refreshTxt.addEventListener(egret.TextEvent.LINK, function (evt) {
                if (App.DeviceUtil.IsHtml5()) {
                    StatisticsHelper.reportLoadData("reload_3");
                    window.location.reload();
                }
            }, this);
            refreshTxt.setPosition(GameConfig.stageWidth * 0.5 - refreshTxt.width * 0.5, this._progressBar.y - refreshTxt.height - 10);
            loginLoadingTxt.y = GameConfig.stageHeigth - 100;
            this.addChild(refreshTxt);
        }
        else if (PlatformManager.isShowWXLoading()) {
            var loadTxt = ComponentManager.getTextField("首次加载时间较长，请耐心等待...", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            loadTxt.setPosition(GameConfig.stageWidth * 0.5 - loadTxt.width * 0.5, this._progressBar.y - loadTxt.height - 10);
            loadTxt.y = this._progressBar.y - loadTxt.height - 10;
            this.addChild(loadTxt);
            loadNumBMTxt.y = this._progressBar.y;
            loginLoadingTxt.visible = false;
            var refreshTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // refreshTxt.stroke=1;
            // refreshTxt.strokeColor=0;
            refreshTxt.textFlow = new Array({ text: "如果无法进入游戏，请", style: { "textColor": 0x000000 } }, { text: "点击刷新", style: { "textColor": 0xff0000, "underline": true, "href": "event:text event triggered" } });
            refreshTxt.touchEnabled = true;
            refreshTxt.addEventListener(egret.TextEvent.LINK, function (evt) {
                if (App.DeviceUtil.IsHtml5()) {
                    StatisticsHelper.reportLoadData("reload_3");
                    window.location.reload();
                }
            }, this);
            refreshTxt.setPosition(GameConfig.stageWidth * 0.5 - refreshTxt.width * 0.5, this._progressBar.y + refreshTxt.height + 10);
            // loginLoadingTxt.y=GameConfig.stageHeigth - 150;
            this.addChild(refreshTxt);
            LoginLoading.hideDivLoading();
            this.hideReloadDiv();
        }
    };
    LoginLoading.prototype.hideReloadDiv = function () {
        if (App.DeviceUtil.IsHtml5()) {
            var my = document.getElementById("rayIdxload1");
            if (my != null) {
                App.LogUtil.log("rayIdxload1");
                my.parentNode.removeChild(my);
            }
            var my2 = document.getElementById("rayIdxload2");
            if (my2 != null) {
                App.LogUtil.log("rayIdxload1");
                my2.parentNode.removeChild(my2);
            }
        }
        var refreshTxt = GameConfig.stage.getChildByName("xlrefreshTxt");
        if (refreshTxt) {
            refreshTxt.dispose();
        }
    };
    LoginLoading.prototype.showBg = function () {
        App.LogUtil.log("开始显示loginLoading的bg");
        LoginLoading.hideDivLoading();
        if (this._loadImg) {
            BaseLoadBitmap.release(this._loadImg);
            this._loadImg = null;
        }
        if (!this._bg) {
            this._bg = BaseBitmap.create(PlatCfg.loginBg);
            this.addChildAt(this._bg, 0);
        }
    };
    LoginLoading.prototype.setPercentage = function (percent, textStr, textColor) {
        if (this._progressBar) {
            this._progressBar.setPercentage(percent);
            if (this._loadNumBMTxt) {
                this._loadNumBMTxt.text = Math.floor(percent * 100) + "%";
            }
        }
    };
    LoginLoading.prototype.getParent = function () {
        return LayerManager.panelLayer;
    };
    LoginLoading.prototype.dispose = function () {
        LoginLoading.hideDivLoading();
        this._progressBar = null;
        this._loadImg = null;
        this._loadNumBMTxt = null;
        // this._wxgameText = null;
        _super.prototype.dispose.call(this);
    };
    LoginLoading.show = function () {
        if (!LoginLoading._loginLoading) {
            LoginLoading._loginLoading = new LoginLoading();
            LoginLoading._loginLoading.show();
        }
        else {
            if (!LoginLoading._loginLoading.parent) {
                LoginLoading._loginLoading.getParent().addChild(LoginLoading._loginLoading);
            }
        }
        if (App.DeviceUtil.isRuntime2()) {
            //隐藏掉原生包的loading图
            var param = { "func": "dismissSplash" };
            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
        }
    };
    LoginLoading.hide = function () {
        if (LoginLoading._loginLoading) {
            if (LoginLoading._loginLoading.parent) {
                LoginLoading._loginLoading.parent.removeChild(LoginLoading._loginLoading);
            }
            LoginLoading.hideDivLoading();
            LoginLoading._loginLoading.setPercentage(0);
        }
    };
    // 隐藏微信小游戏里的健康游戏公告
    LoginLoading.hideWxgameText = function () {
        // if(LoginLoading._loginLoading && LoginLoading._loginLoading._wxgameText) {
        // 	LoginLoading._loginLoading._wxgameText.visible = false;
        // }
    };
    LoginLoading.showBg = function () {
        if (LoginLoading._loginLoading) {
            LoginLoading._loginLoading.showBg();
        }
        var gameruntimelogo = GameConfig.stage.getChildByName("gameruntimelogo");
        if (gameruntimelogo) {
            gameruntimelogo.dispose();
        }
    };
    LoginLoading.setPercentage = function (percent, textStr, textColor) {
        if (LoginLoading._loginLoading) {
            LoginLoading._loginLoading.setPercentage(percent, textStr, textColor);
            if (percent > 0.4) {
                // let par:BaseBitmap;
                // par.visible = false;
            }
        }
    };
    LoginLoading.hideDivLoading = function () {
        if (App.DeviceUtil.IsHtml5()) {
            var my = document.getElementById("alertdiv");
            if (my != null) {
                App.LogUtil.log("htmlloding移除完成");
                my.parentNode.removeChild(my);
            }
        }
        var xlTxt = GameConfig.stage.getChildByName("xlTxt");
        if (xlTxt) {
            xlTxt.dispose();
        }
        var refreshTxt = GameConfig.stage.getChildByName("xlrefreshTxt");
        if (refreshTxt) {
            refreshTxt.dispose();
        }
    };
    return LoginLoading;
}(BaseLoadDisplayObjectContiner));
__reflect(LoginLoading.prototype, "LoginLoading");
//# sourceMappingURL=LoginLoading.js.map