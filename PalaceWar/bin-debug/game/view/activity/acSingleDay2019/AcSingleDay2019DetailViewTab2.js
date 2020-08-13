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
*/
var AcSingleDay2019DetailViewTab2 = (function (_super) {
    __extends(AcSingleDay2019DetailViewTab2, _super);
    function AcSingleDay2019DetailViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._timeTxt = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcSingleDay2019DetailViewTab2.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcSingleDay2019DetailViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019DetailViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRECHARGE), this.rewardCallBack, this);
        var baseview = ViewController.getInstance().getView('AcSingleDay2019DetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var topdescbg = BaseBitmap.create("newsingledaytab2topbg-" + code);
        view.addChild(topdescbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, view, [0, 5], true);
        var line = BaseBitmap.create("newsingledaytab1line-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0, -10]);
        view.addChild(line);
        var acTimeTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_QUALITY_YELLOW);
        var stTxt = App.DateUtil.getFormatBySecond(view.vo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(view.vo.et - view.cfg.extraTime * 86400, 7);
        var timeStr = App.DateUtil.getOpenLocalTime(view.vo.st, view.vo.et, true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        acTimeTxt.text = view.vo.getAcLocalTime(true);
        acTimeTxt.setPosition(180, 45);
        view.addChild(acTimeTxt);
        var deltaT = "<font color=" + (view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED) + ">" + view.vo.acCountDown + "</font>";
        var acCDTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewAcTime-1", [deltaT]), 18, TextFieldConst.COLOR_QUALITY_YELLOW);
        view._timeTxt = acCDTxt;
        view.addChild(acCDTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acCDTxt, acTimeTxt, [0, acTimeTxt.textHeight + 5]);
        var rankDescTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_QUALITY_YELLOW);
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 5;
        rankDescTxt.width = 400;
        rankDescTxt.text = LanguageManager.getlocal("acSingleDay2019Tip7-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankDescTxt, acCDTxt, [0, acCDTxt.textHeight + 5]);
        view.addChild(rankDescTxt);
        var tablebg = BaseBitmap.create("newsingledaytab2bg-" + code);
        tablebg.height = view.height - topdescbg.height;
        view.addChild(tablebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, topdescbg, [0, topdescbg.height + 5]);
        var vo = this.vo;
        var objList = vo.getArr("recharge"); //
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 627, view.height - topdescbg.height - 30);
        var scrollList = ComponentManager.getScrollList(AcSingleDay2019ChargeIItem, arr, tmpRect, view.code);
        view._list = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tablebg, [0, 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        TickManager.addTick(this.tick, this);
    };
    AcSingleDay2019DetailViewTab2.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
        var cfg = view.cfg.recharge[view.vo.lastidx];
        var str = "1032_0_" + cfg.specialReward + "_" + this.getUiCode() + "|" + rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcSingleDay2019DetailViewTab2.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.vo.getArr("recharge"));
        ; //
        view._list.refreshData(arr, view.code);
    };
    AcSingleDay2019DetailViewTab2.prototype.updateArr = function (arr) {
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
    AcSingleDay2019DetailViewTab2.prototype.tick = function () {
        var view = this;
        var deltaT = "<font color=" + (view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED) + ">" + view.vo.acCountDown + "</font>";
        view._timeTxt.text = LanguageManager.getlocal("acBeautyVoteViewAcTime-1", [deltaT]);
    };
    AcSingleDay2019DetailViewTab2.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(this.tick, this);
        view._list = null;
        view._timeTxt = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRECHARGE), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019DetailViewTab2;
}(CommonViewTab));
__reflect(AcSingleDay2019DetailViewTab2.prototype, "AcSingleDay2019DetailViewTab2");
//# sourceMappingURL=AcSingleDay2019DetailViewTab2.js.map