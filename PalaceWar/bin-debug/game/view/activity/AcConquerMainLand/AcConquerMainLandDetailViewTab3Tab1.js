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
var AcConquerMainLandDetailViewTab3Tab1 = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab3Tab1, _super);
    function AcConquerMainLandDetailViewTab3Tab1(param) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._perScoreTxt = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3Tab1.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab3Tab1.prototype.getListType = function () {
        return 1;
    };
    AcConquerMainLandDetailViewTab3Tab1.prototype.initView = function () {
        var view = this;
        var code = view.uiCode;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USEITEM), this.useItemCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USESPECIALGIFT), this.useJJLItemCallback, this);
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        var viewbg = BaseBitmap.create("public_9_bg22");
        viewbg.height = view.height;
        view.addChild(viewbg);
        var listbg = BaseBitmap.create("public_9_bg32");
        listbg.width = 618;
        listbg.height = viewbg.height - 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, viewbg, [0, 20]);
        view.addChild(listbg);
        var getBg = BaseBitmap.create("mainlandjzhou-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getBg, listbg, [0, 10]);
        view.addChild(getBg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip1-" + view.uiCode, [String(view.cfg.settleTime / 60)]), 18, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, getBg, [0, 13]);
        view.addChild(tipTxt);
        var tipBg = BaseBitmap.create("specialview_commoni_namebg");
        view.addChild(tipBg);
        // let myscore = view.vo.getMyPScore();
        var myscore = view.vo.getMyScore();
        var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip2-" + view.uiCode, [App.StringUtil.changeIntToText(myscore, 4), App.StringUtil.changeIntToText(view.vo.getMyScorePerMin(), 4),]), 18);
        tipBg.width = tip2Txt.textWidth + 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, tipTxt, [0, tipTxt.textHeight + 2]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tip2Txt, tipBg);
        view.addChild(tip2Txt);
        view._perScoreTxt = tip2Txt;
        var arr = [1, 2, 3];
        var tmpRect = new egret.Rectangle(0, 0, listbg.width - 10, listbg.height - 10 - getBg.height - 15);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandArmyItem, arr, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, getBg, [5, getBg.height + 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        view._list = scrollList;
    };
    AcConquerMainLandDetailViewTab3Tab1.prototype.useJJLItemCallback = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.ret && evt.data.data) {
            if (evt.data.data.data.conquerStat && evt.data.data.data.conquerStat == 12) {
                App.CommonUtil.showTip(LanguageManager.getlocal(this.vo.getThisCn("acConquerMainLandTip47")));
                return;
            }
            if (evt.data.data.data.allteam) {
                this.vo.setMyTeamInfo(evt.data.data.data.allteam);
            }
            if (evt.data.data.data.getScore) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip46-" + code, [String(evt.data.data.data.getScore)]));
            }
            if (evt.data.data.data.myscore && evt.data.data.data.myscore.score) {
                this.vo.setMyScore(evt.data.data.data.myscore.score);
            }
            view._perScoreTxt.text = LanguageManager.getlocal("acConquerMainLandTip2-" + view.uiCode, [view.vo.getMyScore().toString(), view.vo.getMyScorePerMin().toString(),]);
            var list = view._list;
            for (var i in list._scrollListItemArr) {
                var unit = list._scrollListItemArr[i];
                unit.refresh();
            }
        }
    };
    AcConquerMainLandDetailViewTab3Tab1.prototype.useItemCallback = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.ret && evt.data.data) {
            if (evt.data.data.data.allteam) {
                this.vo.setMyTeamInfo(evt.data.data.data.allteam);
            }
            view._perScoreTxt.text = LanguageManager.getlocal("acConquerMainLandTip2-" + view.uiCode, [view.vo.getMyScore().toString(), view.vo.getMyScorePerMin().toString(),]);
            App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
            var list = view._list;
            for (var i in list._scrollListItemArr) {
                var unit = list._scrollListItemArr[i];
                unit.refresh();
            }
        }
    };
    AcConquerMainLandDetailViewTab3Tab1.prototype.update = function () {
        var view = this;
        var list = view._list;
        for (var i in list._scrollListItemArr) {
            var unit = list._scrollListItemArr[i];
            unit.refresh();
        }
    };
    AcConquerMainLandDetailViewTab3Tab1.prototype.cancelCallBack = function (evt) {
        var view = this;
        var code = view.uiCode;
        if (evt.data.ret && evt.data.data.data) {
            switch (evt.data.data.data.conquerStat) {
                case 3:
                    App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip25-" + code));
                    break;
                case 6:
                case 9:
                    view.vo.clearArmyInfo(evt.data.data.data.teamnum);
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarCancelServantTip"));
                    view._list.refreshData([1, 2, 3], view.code);
                    view._perScoreTxt.text = LanguageManager.getlocal("acConquerMainLandTip2-" + view.uiCode, [view.vo.getMyScore().toString(), view.vo.getMyScorePerMin().toString(),]);
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMAPINFO, {
                        activeId: view.acTivityId,
                    });
                    break;
            }
        }
    };
    AcConquerMainLandDetailViewTab3Tab1.prototype.dispose = function () {
        var view = this;
        view._list = null;
        view._perScoreTxt = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USEITEM), this.useItemCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USESPECIALGIFT), this.useJJLItemCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab3Tab1;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab3Tab1.prototype, "AcConquerMainLandDetailViewTab3Tab1");
//# sourceMappingURL=AcConquerMainLandDetailViewTab3Tab1.js.map