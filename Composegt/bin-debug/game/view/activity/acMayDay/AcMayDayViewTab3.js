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
desc : 转盘活动viewtab3 节日任务
*/
var AcMayDayViewTab3 = (function (_super) {
    __extends(AcMayDayViewTab3, _super);
    function AcMayDayViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._rechargeArr = null;
        _this._timerText = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMayDayViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayViewTab3.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
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
        var mayDayVo = this.vo;
        var rechargeArr = mayDayVo.getArr("task");
        rechargeArr = this.updataArr(rechargeArr);
        this._rechargeArr = rechargeArr;
        var tmpRect = new egret.Rectangle(0, 0, 610, bottomBg.height - 75);
        var scrollList = ComponentManager.getScrollList(AcMayDay3ScrollItem, rechargeArr, tmpRect);
        this._scrollList = scrollList;
        this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2, timeBg.y + timeBg.height);
        this.addChild(scrollList);
    };
    AcMayDayViewTab3.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        var rechargeArr = this.vo.getArr("task");
        rechargeArr = this.updataArr(rechargeArr);
        this._rechargeArr = rechargeArr;
        this._scrollList.refreshData(rechargeArr);
    };
    AcMayDayViewTab3.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var AcMayDayVo = this.vo;
        if (!AcMayDayVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = AcMayDayVo.getTask(arr[i].questType);
            if (this.vo.isGetTaskReward(arr[i].key)) {
                arr1.push(arr[i]);
            }
            else {
                if (taskNum >= arr[i].value) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcMayDayViewTab3.prototype.dispose = function () {
        this._scrollList = null;
        this._rechargeArr = null;
        this._timerText = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcMayDayViewTab3;
}(CommonViewTab));
__reflect(AcMayDayViewTab3.prototype, "AcMayDayViewTab3");
