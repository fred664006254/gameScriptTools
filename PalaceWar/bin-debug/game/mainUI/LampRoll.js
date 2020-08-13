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
var LampRoll = (function (_super) {
    __extends(LampRoll, _super);
    function LampRoll() {
        var _this = _super.call(this) || this;
        _this._lampBg = null;
        _this._lampInfo = null;
        _this._rollingType = 0; //0,隐藏， 1,滚动  2,滚完正在隐藏
        _this._lampText = null;
        _this._rollInfo = null;
        _this._isRolling = false;
        _this.init();
        return _this;
    }
    LampRoll.prototype.init = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SHOW_LAMP, this.checkShowLamp, this);
        this._lampBg = BaseBitmap.create("mainui_chatbg");
        this._lampBg.width = GameConfig.stageWidth;
        this._lampBg.height = 30;
        this.addChild(this._lampBg);
        this._lampBg.alpha = 0;
        this.checkShowLamp();
    };
    LampRoll.prototype.checkShowLamp = function () {
        this._rollInfo = Api.lampVoApi.getShowLampInfo();
        if (this._rollingType == 0) {
            //隐藏
            if (this._rollInfo) {
                this._rollingType = 1;
                egret.Tween.get(this._lampBg).to({ alpha: 1 }, 1000).call(this.startRolling, this);
            }
        }
        else if (this._rollingType == 1) {
            if (this._rollInfo) {
                if (this._isRolling == false) {
                    this.startRolling();
                }
            }
            else {
                this._rollingType = 2;
                egret.Tween.get(this._lampBg).to({ alpha: 0 }, 1000).call(this.hiddenLamp, this);
            }
        }
        else if (this._rollingType == 2) {
            if (this._rollInfo) {
                this._lampBg.alpha = 1;
                this.startRolling();
            }
        }
    };
    LampRoll.prototype.startRolling = function () {
        if (this._lampInfo == null) {
            this._lampInfo = new BaseDisplayObjectContainer();
            this.addChild(this._lampInfo);
            var icon = BaseBitmap.create("public_chatnoticeicon");
            icon.setScale(30 / icon.width);
            this._lampInfo.addChild(icon);
            this._lampText = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._lampText.setPosition(60, this._lampBg.height / 2 - this._lampText.height / 2);
            this._lampInfo.addChild(this._lampText);
        }
        this._isRolling = true;
        egret.Tween.removeTweens(this._lampInfo);
        this._lampText.text = this.getRollingText();
        this._lampInfo.x = GameConfig.stageWidth;
        var moveDis = this._lampText.width + 100 + GameConfig.stageWidth;
        var moveTiem = moveDis / 100 * 1000;
        egret.Tween.get(this._lampInfo).to({ x: -this._lampText.width - 100 }, moveTiem).call(this.rollingEnd, this);
    };
    LampRoll.prototype.rollingEnd = function () {
        this._isRolling = false;
        this.checkShowLamp();
    };
    LampRoll.prototype.getRollingText = function () {
        var rollingString = "";
        if (this._rollInfo) {
            if (this._rollInfo.dtype == 1) {
                rollingString = LanguageManager.getlocal("lampInfoType1", [this._rollInfo.name, LanguageManager.getlocal("wifeName_" + this._rollInfo.need)]);
            }
            else if (this._rollInfo.dtype == 2) {
                rollingString = LanguageManager.getlocal("lampInfoType2", [this._rollInfo.name, LanguageManager.getlocal("servant_name" + this._rollInfo.need)]);
            }
            else if (this._rollInfo.dtype == 3) {
                rollingString = LanguageManager.getlocal("lampInfoType3", [this._rollInfo.name, this._rollInfo.need]);
            }
            else if (this._rollInfo.dtype == 4) {
                rollingString = LanguageManager.getlocal("lampInfoType4", [this._rollInfo.name, this._rollInfo.need]);
            }
            else if (this._rollInfo.dtype == 5) {
                rollingString = LanguageManager.getlocal("lampInfoType5", [this._rollInfo.name, LanguageManager.getlocal("officialTitle" + this._rollInfo.need)]);
            }
            else if (this._rollInfo.dtype == 100) {
                rollingString = this._rollInfo.msg;
            }
            else {
                var strTab = App.StringUtil.formatStringParms(this._rollInfo.info);
                rollingString = LanguageManager.getlocal("lampInfoType" + this._rollInfo.dtype, strTab);
            }
        }
        return rollingString;
    };
    LampRoll.prototype.hiddenLamp = function () {
        if (this._lampInfo && this._rollingType == 2) {
            this._rollingType = 0;
            this.removeChild(this._lampInfo);
            this._lampInfo = null;
        }
    };
    LampRoll.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SHOW_LAMP, this.checkShowLamp, this);
        egret.Tween.removeTweens(this._lampBg);
        this._lampBg = null;
        this._lampInfo = null;
        this._rollingType = 0;
        this._lampText = null;
        this._rollInfo = null;
        this._isRolling = false;
        _super.prototype.dispose.call(this);
    };
    return LampRoll;
}(BaseDisplayObjectContainer));
__reflect(LampRoll.prototype, "LampRoll");
//# sourceMappingURL=LampRoll.js.map