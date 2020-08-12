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
        var _this = _super.call(this) || this;
        _this._touchNum = 0;
        _this._lastTouchTime = 0;
        return _this;
    }
    LoginLoading.prototype.init = function () {
        _super.prototype.init.call(this);
        if (PlatMgr.isShowWXLoading()) {
            var loadTxt = ComponentMgr.getTextField("首次加载时间较长，请耐心等待...", TextFieldConst.SIZE_CONTENT_COMMON);
            loadTxt.setPosition(GameConfig.stageWidth * 0.5 - loadTxt.width * 0.5, this._progressBar.y - loadTxt.height - 10);
            loadTxt.y = this._progressBar.y - loadTxt.height - 10;
            this.addChild(loadTxt);
            this._loadNumBMTxt.y = this._progressBar.y - 30;
            var stateMent = PlatMgr.getStatement();
            if (stateMent && stateMent != "") {
                var stateText = ComponentMgr.getTextField(stateMent, TextFieldConst.SIZE_16);
                stateText.width = GameConfig.stageWidth;
                stateText.textAlign = TextFieldConst.ALIGH_CENTER;
                this.addChild(stateText);
                stateText.setPosition(GameConfig.stageWidth * 0.5 - stateText.width * 0.5, GameConfig.stageHeigth - stateText.height - 10);
            }
            this.hideReloadDiv();
        }
        this.initTestTouch();
    };
    LoginLoading.prototype.initTestTouch = function () {
        var _this = this;
        var leftMk = new BaseShape();
        leftMk.graphics.beginFill(0, 0);
        leftMk.graphics.drawRect(0, 0, 60, 130);
        leftMk.graphics.endFill();
        this.addChild(leftMk);
        leftMk.addTouchTap(function (event) {
            if (_this._touchNum < 1) {
                _this._touchNum++;
            }
            else {
                if (egret.getTimer() - _this._lastTouchTime > 1000) {
                    _this._touchNum = 0;
                }
                else {
                    _this._touchNum++;
                }
            }
            _this._lastTouchTime = egret.getTimer();
            if (_this._touchNum == 10) {
                if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2() || App.DeviceUtil.isWXgame()) {
                    StatisticsHelper.reportOwnNameLog("touch10", "testcmd");
                    console.log("already in test");
                    // this.createPanel(()=>{
                    // 	ViewController.getInstance().openView("TestView");
                    // },"开始测试");
                    LoginMgr.showLog();
                }
            }
        }, this);
    };
    LoginLoading.prototype.showWarTip = function () {
        return false;
    };
    LoginLoading.prototype.getInterval = function () {
        return 1000;
    };
    LoginLoading.prototype.initBg = function () {
        var bg = BaseLoadBitmap.create("loginbg", null, { callback: function () {
                LoginLoading.hideDivLoading();
            }, callbackThisObj: this });
        bg.anchorOffsetX = 0;
        bg.anchorOffsetY = bg.height;
        bg.setPosition(0, GameConfig.stageHeigth);
        this.addChild(bg);
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
    LoginLoading.prototype.getParent = function () {
        return LayerMgr.panelLayer;
    };
    LoginLoading.prototype.dispose = function () {
        LoginLoading.hideDivLoading();
        this._progressBar = null;
        this._loadNumBMTxt = null;
        // this._wxgameText = null;
        _super.prototype.dispose.call(this, true);
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
        App.CommonUtil.formatFullScreenBg();
        App.CommonUtil.formatIpadScreenBg();
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
    LoginLoading.prototype.autoPercent = function () {
        return false;
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
}(GameLoading));
__reflect(LoginLoading.prototype, "LoginLoading");
//# sourceMappingURL=LoginLoading.js.map