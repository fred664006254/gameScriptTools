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
/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab2 累计充值
*/
var AcMayDayViewTab2 = (function (_super) {
    __extends(AcMayDayViewTab2, _super);
    function AcMayDayViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._isSpecial = false;
        _this._seprateNum = 0;
        _this._timerText = null;
        _this.initView();
        return _this;
    }
    AcMayDayViewTab2.prototype.initView = function () {
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 69 - 94 + 15;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        var timeBg = BaseBitmap.create("acnewyear_middlebg");
        timeBg.x = GameConfig.stageWidth / 2 - timeBg.width / 2;
        timeBg.y = 0;
        this.addChild(timeBg);
        var vo = this.vo;
        var stTxt = App.DateUtil.getFormatBySecond(vo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(vo.et - 86400 * 1, 7);
        this._timerText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._timerText.x = timeBg.x + timeBg.width / 2 - this._timerText.width / 2;
        this._timerText.y = timeBg.y + timeBg.height / 2 - this._timerText.height / 2;
        this.addChild(this._timerText);
        var aid = AcMayDayView.AID;
        var code = AcMayDayView.CODE;
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(aid);
        var objList = this.cfg.recharge;
        var terList = {};
        var keys = Object.keys(objList);
        keys.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        var tmpRect = new egret.Rectangle(0, 0, 610, bottomBg.height - 75);
        var scrollList = ComponentManager.getScrollList(AcMayDay2ScrollItem, keys, tmpRect);
        this._scrollList = scrollList;
        scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2, timeBg.y + timeBg.height);
        this.addChild(scrollList);
    };
    Object.defineProperty(AcMayDayViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayViewTab2.prototype.getSheepType = function () {
        return 2;
    };
    AcMayDayViewTab2.prototype.dispose = function () {
        this._scrollList = null;
        this._timerText = null;
        _super.prototype.dispose.call(this);
    };
    return AcMayDayViewTab2;
}(CommonViewTab));
__reflect(AcMayDayViewTab2.prototype, "AcMayDayViewTab2");
