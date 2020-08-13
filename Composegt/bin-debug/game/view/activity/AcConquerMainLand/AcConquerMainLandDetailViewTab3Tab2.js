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
//
var AcConquerMainLandDetailViewTab3Tab2 = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab3Tab2, _super);
    function AcConquerMainLandDetailViewTab3Tab2(param) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._perScoreTxt = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab2.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab3Tab2.prototype.getListType = function () {
        return 1;
    };
    AcConquerMainLandDetailViewTab3Tab2.prototype.initView = function () {
        var view = this;
        var code = view.uiCode;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        var tipBg = BaseBitmap.create("mainland_armystate_redtitle");
        tipBg.setPosition(20, -15);
        view.addChild(tipBg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip1-" + view.uiCode, [String(view.cfg.settleTime / 60)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, tipBg, [0, 35]);
        view.addChild(tipTxt);
        var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip2-" + view.uiCode, [App.StringUtil.changeIntToText(view.vo.getMyPScore()), App.StringUtil.changeIntToText(view.vo.getMyScorePerMin()),]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(tip2Txt);
        tip2Txt.setPosition(tipTxt.x + 15, tipTxt.y + tipTxt.height + 15);
        view._perScoreTxt = tip2Txt;
        var arr = [1, 2, 3];
        var tmpRect = new egret.Rectangle(0, 0, this.width, this.height - 10 - tipBg.height - 15);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandArmyItem, arr, tmpRect, view.code);
        scrollList.setPosition(0, tipBg.y + tipBg.height);
        view.addChild(scrollList);
        scrollList.bounces = false;
        view._list = scrollList;
    };
    AcConquerMainLandDetailViewTab3Tab2.prototype.useItemCallback = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.data) {
            if (evt.data.data.data.allteam) {
                this.vo.setMyTeamInfo(evt.data.data.data.allteam);
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
            var list = view._list;
            for (var i in list._scrollListItemArr) {
                var unit = list._scrollListItemArr[i];
                unit.refresh();
            }
        }
    };
    AcConquerMainLandDetailViewTab3Tab2.prototype.update = function () {
        var view = this;
        var list = view._list;
        if (list) {
            for (var i in list._scrollListItemArr) {
                var unit = list._scrollListItemArr[i];
                unit.refresh();
            }
        }
    };
    AcConquerMainLandDetailViewTab3Tab2.prototype.cancelCallBack = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.data.data) {
            switch (evt.data.data.data.conquerStat) {
                case 3:
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip25-" + code));
                    break;
                case 6:
                case 9:
                    view.vo.clearArmyInfo(evt.data.data.data.teamnum);
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarCancelServantTip"));
                    view._list.refreshData([1, 2, 3], view.code);
                    view._perScoreTxt.text = LanguageManager.getlocal("acConquerMainLandTip2-" + view.uiCode, [view.vo.getMyPScore().toString(), view.vo.getMyScorePerMin().toString(),]);
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMAPINFO, {
                        activeId: view.acTivityId,
                    });
                    break;
            }
        }
    };
    AcConquerMainLandDetailViewTab3Tab2.prototype.dispose = function () {
        var view = this;
        view._list = null;
        view._perScoreTxt = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab3Tab2;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab3Tab2.prototype, "AcConquerMainLandDetailViewTab3Tab2");
