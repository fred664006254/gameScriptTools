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
var WifeBanishCarriage = (function (_super) {
    __extends(WifeBanishCarriage, _super);
    function WifeBanishCarriage() {
        var _this = _super.call(this) || this;
        _this._horse = null;
        _this._wife = null;
        _this._tipContainer = null;
        _this._banishTime = null;
        _this.posInfo = null;
        _this.id = 0;
        _this._index = 0;
        _this._callbackF1 = null;
        _this._callbackF2 = null;
        _this._obj = null;
        _this._backBtn = null;
        _this._isShowed = false;
        _this._dayTxt = null;
        _this._nowCode = 1;
        return _this;
    }
    WifeBanishCarriage.prototype.init = function (index, f1, f2, o) {
        this.id = index;
        this._index = index;
        var list = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
        list.sort(function (a, b) {
            return a.et - b.et;
        });
        if (this.id > Api.wifebanishVoApi.getPosNum()) {
            var end = Api.wifebanishVoApi.getPosNum();
            for (var i in list) {
                var vo = list[i];
                end += vo.getWifeBanPos();
                if (this.id <= end) {
                    this._nowCode = vo.code;
                    if (vo && vo.isInActivity()) {
                        this.id = vo.wifeBanPos[this.id - (end - vo.getWifeBanPos())];
                        break;
                    }
                }
            }
        }
        this._obj = o;
        this._callbackF1 = f1;
        this._callbackF2 = f2;
    };
    WifeBanishCarriage.prototype.clickHandle = function () {
        if (this.posInfo) {
            this._callbackF2.apply(this._obj, [this.id, this.posInfo.wifeId, this._index]);
        }
        else {
            this._callbackF1.apply(this._obj, [this.id, this._index, this._nowCode.toString()]);
        }
    };
    WifeBanishCarriage.prototype.setHorse = function () {
        this.removeChildren();
        this.posInfo = null;
        this._horse = new BaseDisplayObjectContainer();
        this.addChild(this._horse);
        this._horse.addTouchTap(this.clickHandle, this);
        var horse = BaseBitmap.create("banish_carriage");
        this._horse.addChild(horse);
        if (this.id % 2 == 0) {
            horse.scaleX = -1;
            horse.x = horse.width;
        }
        this._horse.x = 22;
        this._tipContainer = new BaseDisplayObjectContainer();
        this._horse.addChild(this._tipContainer);
        var tip = BaseBitmap.create("bookroom_tipbg");
        tip.x = horse.width / 2 - tip.width / 2;
        this._tipContainer.addChild(tip);
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("banishClick"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        desc1.setPosition(tip.x + tip.width / 2 - desc1.width / 2, 9);
        this._tipContainer.addChild(desc1);
        //限时
        var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._nowCode.toString());
        if (this.id > Api.wifebanishVoApi.getPosNum()) {
            var tipbg = BaseBitmap.create("servantexiletiipbg");
            var day = '';
            if (vo.isInActivity) {
                var endtime = vo.et - 86400 * 1;
                if ((endtime - GameData.serverTime) / 86400 >= 1) {
                    day = Math.max(0, Math.floor((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal("date_day2");
                }
                else {
                    day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 3600)) + LanguageManager.getlocal("date_hour");
                }
            }
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("limitDayTime", [day]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, tipbg, this._horse, [0, 10]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
            this.addChild(tipbg);
            this.addChild(tipTxt);
            this._dayTxt = tipTxt;
            var dropDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("battlepassdropdesc", [LanguageManager.getlocal("acBattlePassTitle-" + this._nowCode)]), 22);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dropDescTxt, this._horse, [0, this._horse.height]);
            this.addChild(dropDescTxt);
        }
        egret.Tween.get(this._tipContainer, { loop: true }).to({ y: -10 }, 1000).to({ y: 0 }, 1000);
    };
    WifeBanishCarriage.prototype.setIsShowTip = function (isShow) {
        if (this._tipContainer) {
            this._tipContainer.visible = isShow;
        }
    };
    WifeBanishCarriage.prototype.setWife = function (info) {
        this.removeChildren();
        this.posInfo = info;
        this._isShowed = false;
        this._tipContainer = null;
        this._wife = new BaseDisplayObjectContainer();
        this.addChild(this._wife);
        var bg = BaseBitmap.create("banish_headbg");
        this._wife.addChild(bg);
        this._wife.setPosition(21.6, 9);
        var wifeHead = Api.wifebanishVoApi.getWifeHead(info.wifeId);
        this._wife.addChild(wifeHead);
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("banishing"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN3);
        desc1.setPosition(205 - desc1.width / 2, 8);
        this._wife.addChild(desc1);
        this._backBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "banishGohome", this.clickHandle, this);
        this._backBtn.setPosition(143, 63);
        this._wife.addChild(this._backBtn);
        this._banishTime = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._banishTime.width = 160;
        this._banishTime.setPosition(128, desc1.y + desc1.height + 5);
        this._banishTime.textAlign = egret.HorizontalAlign.CENTER;
        this._wife.addChild(this._banishTime);
        this._wife.setScale(0.85);
        //限时
        var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._nowCode.toString());
        if (this.id > Api.wifebanishVoApi.getPosNum()) {
            var tipbg = BaseBitmap.create("servantexiletiipbg");
            var day = '';
            if (vo.isInActivity) {
                var endtime = vo.et - 86400 * 1;
                if ((endtime - GameData.serverTime) / 86400 >= 1) {
                    day = Math.max(0, Math.floor((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal("date_day2");
                }
                else {
                    day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 3600)) + LanguageManager.getlocal("date_hour");
                }
            }
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("limitDayTime", [day]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, tipbg, this._wife, [-20, -20]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
            this.addChild(tipbg);
            this.addChild(tipTxt);
            this._dayTxt = tipTxt;
            var dropDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("battlepassdropdesc", [LanguageManager.getlocal("acBattlePassTitle-" + this._nowCode)]), 22);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dropDescTxt, this._wife, [0, this._wife.height]);
            this.addChild(dropDescTxt);
        }
        this.refreshTime();
    };
    WifeBanishCarriage.prototype.goBack = function () {
        this._backBtn.setEnable(false);
    };
    WifeBanishCarriage.prototype.refreshTime = function () {
        var r = false;
        if (this._wife) {
            if (this.posInfo) {
                if (this.posInfo.et >= GameData.serverTime) {
                    var lastStr = App.DateUtil.getFormatBySecondIntoTime(this.posInfo.et - GameData.serverTime);
                    this._banishTime.text = LanguageManager.getlocal("friends_collectLastTime", [lastStr]);
                }
                else if (this._isShowed == false) {
                    this._isShowed = true;
                    r = true;
                }
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._nowCode.toString());
        if (this.id > Api.wifebanishVoApi.getPosNum()) {
            var day = '';
            if (vo.isInActivity) {
                var endtime = vo.et - 86400 * 1;
                if ((endtime - GameData.serverTime) / 86400 >= 1) {
                    day = Math.max(0, Math.floor((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal("date_day2");
                }
                else {
                    day = Math.max(0, Math.ceil((endtime - GameData.serverTime) / 3600)) + LanguageManager.getlocal("date_hour");
                }
                if (endtime - GameData.serverTime <= 0) {
                    if (this._isShowed == false) {
                        this._isShowed = true;
                        r = true;
                    }
                }
            }
            if (this._dayTxt) {
                this._dayTxt.text = LanguageManager.getlocal("limitDayTime", [day.toString()]);
            }
        }
        return r;
    };
    WifeBanishCarriage.prototype.dispose = function () {
        this._horse = null;
        this._wife = null;
        this.posInfo = null;
        this._banishTime = null;
        this.id = 0;
        this._callbackF1 = null;
        this._callbackF2 = null;
        this._obj = null;
        this._backBtn = null;
        this._isShowed = false;
        this._tipContainer = null;
        this._dayTxt = null;
        this._index = 0;
        this._nowCode = 1;
        _super.prototype.dispose.call(this);
    };
    return WifeBanishCarriage;
}(BaseDisplayObjectContainer));
__reflect(WifeBanishCarriage.prototype, "WifeBanishCarriage");
//# sourceMappingURL=WifeBanishCarriage.js.map