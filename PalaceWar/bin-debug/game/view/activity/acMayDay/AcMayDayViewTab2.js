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
        _this.initView();
        return _this;
    }
    AcMayDayViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB), this.eventCollectHandlerCallBack, this);
        var style = Number(view.code) > 8;
        if (style) {
            view.width = GameConfig.stageWidth;
            view.height = GameConfig.stageHeigth - 196;
        }
        else {
            var bottomBg = BaseBitmap.create("public_9_bg43");
            bottomBg.width = 625;
            bottomBg.height = GameConfig.stageHeigth - 410;
            bottomBg.x = 5;
            bottomBg.y = -180;
            this.addChild(bottomBg);
        }
        var aid = this.aid;
        var code = this.code;
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(aid);
        var objList = this.cfg.recharge;
        var terList = {};
        // for (var key in objList) {
        // 	let tmpCfg = objList[key];
        // 		this._seprateNum = tmpCfg.needGem;
        // 		terList[key] = tmpCfg;
        // }
        // let keys = Object.keys(objList);
        // keys.sort((a:string,b:string)=>{
        // 	return Number(a) - Number(b) ;
        // });
        var keys = this.updateArr(objList);
        var tmpRect = null;
        var scrollList = null;
        if (style) {
            tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth - 10, view.height - 30);
            scrollList = ComponentManager.getScrollList(AcMayDay2ScrollItem, keys, tmpRect, this.code);
            scrollList.setPosition(20, 0);
        }
        else {
            tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 430);
            scrollList = ComponentManager.getScrollList(AcMayDay2ScrollItem, keys, tmpRect, this.code);
            scrollList.setPosition(20, -170);
        }
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcMayDayViewTab2.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var rechareTotal = vo.getChargeNum();
        for (var i = 0; i < arr.length; i++) {
            if (vo.isGetRecharge(i + 1)) {
                arr1.push(i);
            }
            else {
                if (rechareTotal >= arr[i].needGem) {
                    arr2.push(i);
                }
                else {
                    arr3.push(i);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcMayDayViewTab2.prototype.update = function () {
        var arr = this.updateArr(this.cfg.recharge);
        this._scrollList.refreshData(arr, this.code);
    };
    Object.defineProperty(AcMayDayViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayViewTab2.prototype.getSheepType = function () {
        return 2;
    };
    AcMayDayViewTab2.prototype.eventCollectHandlerCallBack = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = this.vo.lastPos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcMayDayViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB), this.eventCollectHandlerCallBack, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.update, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcMayDayViewTab2;
}(AcCommonViewTab));
__reflect(AcMayDayViewTab2.prototype, "AcMayDayViewTab2");
//# sourceMappingURL=AcMayDayViewTab2.js.map