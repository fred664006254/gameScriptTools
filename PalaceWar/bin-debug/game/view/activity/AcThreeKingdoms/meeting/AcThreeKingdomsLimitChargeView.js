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
/**
 * 问卷调查
 */
var AcThreeKingdomsLimitChargeView = (function (_super) {
    __extends(AcThreeKingdomsLimitChargeView, _super);
    function AcThreeKingdomsLimitChargeView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsLimitChargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLimitChargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLimitChargeView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLimitChargeView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsLimitChargeView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcThreeKingdomsLimitChargeView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "threekingdomslimitchargeview", "progress3", "progress3_bg", "shopview_itemtitle"
        ]);
    };
    AcThreeKingdomsLimitChargeView.prototype.getBgName = function () {
        return "public_9_bg92";
    };
    AcThreeKingdomsLimitChargeView.prototype.getRuleInfo = function () {
        return "acThreeKingdomsLimitChargeRule-" + this.getUiCode();
    };
    AcThreeKingdomsLimitChargeView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("threekingdomslimitchargetitle", this.getUiCode());
    };
    AcThreeKingdomsLimitChargeView.prototype.getTitleStr = function () {
        return null;
    };
    AcThreeKingdomsLimitChargeView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcThreeKingdomsLimitChargeView.prototype.initView = function () {
        var view = this;
        var key = ServerCfg.selectServer.zid + "_pId_" + Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + "limitred" + this.vo.getCurWeek();
        var value = LocalStorageManager.get(key);
        if (!value) {
            LocalStorageManager.set(key, "1");
        }
        var code = view.getUiCode();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_THREEKINGDOMS_RECHAGRERWD), view.qaCallBack, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.height = view.height - view.titleBg.height;
        view.container.y = view.titleBg.height;
        //top背景图
        var topbg = BaseBitmap.create("threekingdomslimitchargetopbg");
        view.addChildToContainer(topbg);
        //本周六周日每日9-22点
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var st = start + 5 * 86400;
        var et = start + 6 * 86400;
        var datestr = App.DateUtil.getOpenLocalTime(st, et, false);
        var tip1Text = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsLimitChargeTime-" + code, [datestr]), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topbg, [228, 56]);
        view.addChildToContainer(tip1Text);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsLimitChargeTimeTip1", code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 380;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tip1Text, [0, tip1Text.textHeight + 5]);
        view.addChildToContainer(tipTxt);
        var vo = this.vo;
        var objList = [];
        var idx = -1;
        for (var i in view.cfg.recharge) {
            objList.push(view.cfg.recharge[i]);
        }
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 605, view.container.height - topbg.height - 35);
        var scrollList = ComponentManager.getScrollList(AcThreeKingdomsLimitChargeItem, arr, tmpRect, view.code);
        view._list = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0, topbg.height + 10]);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
    };
    AcThreeKingdomsLimitChargeView.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var objList = [];
        for (var i in view.cfg.recharge) {
            objList.push(view.cfg.recharge[i]);
        }
        var arr = view.updateArr(objList);
        view._list.refreshData(arr, view.code);
    };
    AcThreeKingdomsLimitChargeView.prototype.updateArr = function (arr) {
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
            if (vo.isGetRecharge(arr[i].id)) {
                arr1.push(arr[i]);
            }
            else {
                if (rechareTotal >= arr[i].needGem) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcThreeKingdomsLimitChargeView.prototype.qaCallBack = function (evt) {
        var view = this;
        if (evt.data.data.ret == 0) {
            var rData = evt.data.data.data;
            var rewards = rData.rewards;
            var cfg = view.cfg.recharge[view.vo.lastidx - 1];
            var str = "1045_1_" + cfg.specialReward1 + "|1046_1_" + cfg.specialReward2;
            var rewardList = GameData.formatRewardItem(str);
            var pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            this.vo.lastidx = null;
        }
    };
    AcThreeKingdomsLimitChargeView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_THREEKINGDOMS_RECHAGRERWD), view.qaCallBack, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        view._list = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsLimitChargeView;
}(CommonView));
__reflect(AcThreeKingdomsLimitChargeView.prototype, "AcThreeKingdomsLimitChargeView");
//# sourceMappingURL=AcThreeKingdomsLimitChargeView.js.map