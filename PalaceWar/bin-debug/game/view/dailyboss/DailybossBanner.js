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
var DailybossBanner = (function (_super) {
    __extends(DailybossBanner, _super);
    function DailybossBanner() {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._process = null;
        _this._text = null;
        _this._info = null;
        _this._callbackF = null;
        _this._callbackF2 = null;
        _this._obj = null;
        _this._idx = 0;
        _this._isLock = false;
        _this._redPointStatus = 0;
        return _this;
    }
    DailybossBanner.prototype.init = function (info, idx, f, o, f2) {
        this._info = info;
        this._obj = o;
        this._callbackF = f;
        this._idx = idx;
        this._callbackF2 = f2;
        var picName;
        if (info.name == "countryWar") {
            picName = "dailyboss_" + info.name;
        }
        else {
            picName = "dailyboss_" + info.name.toLowerCase();
        }
        this._bg = BaseBitmap.create(picName);
        this._bg.setPosition(GameConfig.stageWidth / 2 - this._bg.width / 2, 0);
        this.addChild(this._bg);
        this._bg.addTouchTap(this.touchHandle, this);
        this._process = BaseBitmap.create("dailyboss_underway");
        this._process.setPosition(this._bg.x - 2, 12);
        this.addChild(this._process);
        this._text = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._text.setPosition(50, 188);
        this._text.width = GameConfig.stageWidth - 100;
        this._text.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this._text);
    };
    DailybossBanner.prototype.touchHandle = function () {
        var name = this._info.name;
        if (name == "countryWar" && Api.countryWarVoApi.getEnermyZid() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCountdown_3"));
            return;
        }
        this._callbackF.apply(this._obj, [this._info.name]);
    };
    DailybossBanner.prototype.tick = function () {
        var name = this._info.name;
        if (name == "boss1" || name == "boss2") {
            var status_1 = Api.dailybossVoApi.getStatusByName(name);
            var statusStr = "";
            if (status_1 == 0) {
                if (this._isLock == false) {
                    this._process.visible = false;
                    App.DisplayUtil.changeToGray(this._bg);
                    this._isLock = true;
                }
                statusStr = LanguageManager.getlocal("dailybossLeftTimeDesc", [App.DateUtil.getFormatBySecond(Api.dailybossVoApi.getNextStartLeftTimeByName(name), 1)]);
            }
            else if (status_1 == 1) {
                if (this._isLock == true) {
                    this._process.visible = true;
                    App.DisplayUtil.changeToNormal(this._bg);
                    this._isLock = false;
                }
                statusStr = LanguageManager.getlocal("dailybossEndTimeDesc", [App.DateUtil.getFormatBySecond(Api.dailybossVoApi.getEndTimeByName(name), 1)]);
            }
            this._text.text = statusStr;
        }
        else if (name == "bossnew") {
            var status_2 = Api.dailybossnewVoApi.getStatusByName(name);
            var statusStr = "";
            if (status_2 == 0) {
                if (this._isLock == false) {
                    this._process.visible = false;
                    App.DisplayUtil.changeToGray(this._bg);
                    this._isLock = true;
                }
                statusStr = LanguageManager.getlocal("dailybossnewLeftTimeDesc", [App.DateUtil.getFormatBySecond(Api.dailybossnewVoApi.getNextStartLeftTimeByName(name), 1)]);
            }
            else if (status_2 == 1) {
                if (this._isLock == true) {
                    this._process.visible = true;
                    App.DisplayUtil.changeToNormal(this._bg);
                    this._isLock = false;
                }
                statusStr = LanguageManager.getlocal("dailybossnewEndTimeDesc", [App.DateUtil.getFormatBySecond(Api.dailybossnewVoApi.getEndTimeByName(name), 1)]);
            }
            this._text.text = statusStr;
            if (Api.dailybossnewVoApi.getRewardFlag() == 1) {
                App.CommonUtil.addIconToBDOC(this);
                this.getChildByName("reddot").x = this.width;
                this.getChildByName("reddot").y = 10;
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this);
            }
        }
        else if (name == "countryWar") {
            var str = void 0;
            var cd = Api.countryWarVoApi.getCountTime();
            if (Api.countryWarVoApi.getEnermyZid() == 0) {
                App.DisplayUtil.changeToGray(this._bg);
                this._process.visible = false;
                cd = Api.countryWarVoApi.getCountEndTime();
                if (cd <= 0) {
                    NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL, null);
                }
            }
            else {
                if (Api.countryWarVoApi.getIslunkong()) {
                    App.DisplayUtil.changeToGray(this._bg);
                    this._process.visible = false;
                }
                else {
                    App.DisplayUtil.changeToNormal(this._bg);
                    this._process.visible = true;
                }
            }
            str = Api.countryWarVoApi.getCountStr();
            this._text.text = str;
            if (this._redPointStatus == 0) {
                if (Api.countryWarVoApi.countryWarRedPoint()) {
                    this._redPointStatus = 1;
                    App.CommonUtil.addIconToBDOC(this);
                    this.getChildByName("reddot").x = this.width;
                    this.getChildByName("reddot").y = 10;
                }
            }
            if (this._redPointStatus == 1 && !Api.countryWarVoApi.countryWarRedPoint()) {
                this._redPointStatus = 2;
                App.CommonUtil.removeIconFromBDOC(this);
            }
        }
        else if (name == "ladderTournament") {
            var statusStr = "";
            var vo = Api.acVoApi.getActivityVoByAidAndCode("ladderTournament");
            if (vo.checkIsInEndShowTime()) {
                statusStr = LanguageManager.getlocal("acLadder_TimeCountDownEnd2");
                this._process.visible = false;
            }
            else {
                statusStr = LanguageManager.getlocal("acConquerMainLandActTime-1", [vo.acTimeAndHour]);
            }
            this._text.text = statusStr;
            if (vo.isShowRedDot) {
                App.CommonUtil.addIconToBDOC(this);
                this.getChildByName("reddot").x = this.width;
                this.getChildByName("reddot").y = 10;
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this);
            }
            if (vo.isEnd) {
                this._callbackF2.apply(this._obj, [this._idx]);
            }
        }
    };
    DailybossBanner.prototype.dispose = function () {
        App.DisplayUtil.changeToNormal(this._bg);
        this._bg = null;
        this._process = null;
        this._text = null;
        this._info = null;
        this._callbackF = null;
        this._obj = null;
        this._idx = 0;
        this._isLock = false;
        this._redPointStatus = 0;
        this._callbackF2 = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossBanner;
}(BaseDisplayObjectContainer));
__reflect(DailybossBanner.prototype, "DailybossBanner");
//# sourceMappingURL=DailybossBanner.js.map