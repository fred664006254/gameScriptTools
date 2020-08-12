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
var GameLoading = (function (_super) {
    __extends(GameLoading, _super);
    function GameLoading() {
        var _this = _super.call(this) || this;
        _this._timeCount = -1;
        _this._percent = 0;
        _this._tipTxt = null;
        _this._txtTimeCount = -1;
        return _this;
    }
    GameLoading.prototype.getResourceList = function () {
        return [];
    };
    GameLoading.prototype.show = function () {
        if (this.isShow()) {
            if (!this.parent) {
                var parent_1 = this.getParent();
                if (parent_1) {
                    parent_1.addChild(this);
                }
                this.setPercentage(0);
                this.startAutoPercent();
            }
        }
        else {
            _super.prototype.show.call(this);
        }
    };
    GameLoading.prototype.autoPercent = function () {
        return true;
    };
    GameLoading.prototype.startAutoPercent = function () {
        var _this = this;
        if (!this.autoPercent()) {
            return;
        }
        if (this._timeCount == -1) {
            this._timeCount = egret.setInterval(function () {
                var cp = _this._percent;
                var scaleValue = Math.max(0.1, (_this._percent - 0.4)) * 10;
                scaleValue = scaleValue * scaleValue;
                var percent = Math.min(1, cp + Math.random() * 10 / scaleValue * 0.01);
                _this.setPercentage(percent);
                if (percent >= 1) {
                    _this.clearTimeCount();
                }
            }, this, this.getInterval());
        }
        if (this.showWarTip() && this._txtTimeCount == -1) {
            this._txtTimeCount = egret.setInterval(function () {
                if (_this._tipTxt) {
                    var rid = App.MathUtil.getRandom(1, 6);
                    _this._tipTxt.setString(LangMger.getlocal("warwaitngtip" + rid));
                }
            }, this, 3000);
        }
    };
    GameLoading.prototype.getInterval = function () {
        return 300;
    };
    GameLoading.prototype.clearTimeCount = function () {
        if (this._timeCount > -1) {
            egret.clearInterval(this._timeCount);
            this._timeCount = -1;
        }
    };
    GameLoading.prototype.init = function () {
        this.initBg();
        var logoName = this.getSpLoadLogo();
        var logo = BaseLoadBitmap.create(logoName, null, {
            callback: function () {
                logo.setPosition((GameConfig.stageWidth - logo.width) / 2, logo.height / 2);
            },
            callbackThisObj: null
        });
        this.addChild(logo);
        if (PlatMgr.checkIsLsSp() || PlatMgr.checkIsIOSShenheSp()) {
            logo.visible = false;
        }
        this._progressBar = ComponentMgr.getProgressBar(ProgressBarConst.IMAGE_PROGRESS1, ProgressBarConst.IMAGE_PROGRESS1_Bg);
        this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.getBgWidth() / 2;
        this._progressBar.y = GameConfig.stageHeigth - 150;
        this.addChild(this._progressBar);
        this.setPercentage(0);
        var loadNumBMTxt = ComponentMgr.getBitmapText("0%", "loadnum_fnt");
        loadNumBMTxt.width = 100;
        loadNumBMTxt.textAlign = egret.HorizontalAlign.CENTER;
        loadNumBMTxt.setPosition(10, this._progressBar.y - loadNumBMTxt.height);
        this.addChild(loadNumBMTxt);
        this._loadNumBMTxt = loadNumBMTxt;
        if (this.showWarTip()) {
            var rid = App.MathUtil.getRandom(1, 6);
            this._tipTxt = ComponentMgr.getTextField(LangMger.getlocal("warwaitngtip" + rid), TextFieldConst.SIZE_24);
            this._tipTxt.textAlign = egret.HorizontalAlign.CENTER;
            this._tipTxt.width = GameConfig.stageWidth;
            this._tipTxt.setPosition((GameConfig.stageWidth - this._tipTxt.width) * 0.5, this._progressBar.y + this._progressBar.height + 15);
            this.addChild(this._tipTxt);
        }
        //ios提审时不显示加载进度条
        if (PlatMgr.checkIsIOSShenheSp()) {
            this._progressBar.visible = false;
            this._loadNumBMTxt.visible = false;
        }
        this.startAutoPercent();
    };
    GameLoading.prototype.showWarTip = function () {
        return true;
    };
    GameLoading.prototype.initBg = function () {
        var bg = BaseBitmap.create("loginbg");
        bg.anchorOffsetX = 0;
        bg.anchorOffsetY = bg.height;
        bg.setPosition(0, GameConfig.stageHeigth);
        this.addChild(bg);
    };
    GameLoading.prototype.getSpLoadLogo = function () {
        var appId = PlatMgr.getAppid();
        var spName = PlatMgr.getSpName();
        var bigAppId = PlatMgr.getBigAppid();
        var spIdKey = PlatMgr.getSpidKey();
        var logoName = "login_logo_" + appId.toString();
        if (!ResMgr.hasRes(logoName)) {
            logoName = "login_logo_" + spName.toString();
        }
        if (!ResMgr.hasRes(logoName)) {
            logoName = "login_logo_" + bigAppId.toString();
        }
        if (!ResMgr.hasRes(logoName)) {
            logoName = "login_logo_" + spIdKey.toString();
        }
        if (!ResMgr.hasRes(logoName)) {
            logoName = "login_logo";
        }
        return logoName;
    };
    GameLoading.prototype.setPercentage = function (percent, textStr, textColor) {
        if (this._progressBar) {
            this._percent = percent;
            if (this.autoPercent()) {
                if (percent < this._percent) {
                    return;
                }
            }
            this._progressBar.setPercentage(percent);
            if (this._loadNumBMTxt) {
                this._loadNumBMTxt.text = Math.floor(percent * 100) + "%";
            }
        }
    };
    GameLoading.prototype.getParent = function () {
        return LayerMgr.maskLayer;
    };
    GameLoading.prototype.dispose = function (isDispose) {
        var _this = this;
        if (isDispose) {
            this._progressBar = null;
            this._loadNumBMTxt = null;
            this._tipTxt = null;
            _super.prototype.dispose.call(this);
        }
        else {
            if (this.parent) {
                if (this._percent < 1) {
                    this.setPercentage(1);
                    var count_1 = egret.setTimeout(function () {
                        egret.clearTimeout(count_1);
                        _this.parent.removeChild(_this);
                    }, this, 300);
                }
                else {
                    this.parent.removeChild(this);
                }
            }
        }
        this._percent = 0;
        this.clearTimeCount();
        if (this._txtTimeCount > -1) {
            egret.clearInterval(this._txtTimeCount);
            this._txtTimeCount = -1;
        }
    };
    return GameLoading;
}(BaseLoadDisplayObjectContiner));
__reflect(GameLoading.prototype, "GameLoading");
//# sourceMappingURL=GameLoading.js.map