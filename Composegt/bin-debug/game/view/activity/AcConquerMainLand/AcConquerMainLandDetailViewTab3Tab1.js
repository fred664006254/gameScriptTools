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
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLOG), view.logCallback, view);
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_RECORDLOG, {
            activeId: view.acTivityId,
        });
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        var innerbg = BaseBitmap.create("public_listbg3");
        innerbg.width = 620;
        innerbg.height = this.height - 50;
        innerbg.x = 10;
        innerbg.y = 0;
        this.addChild(innerbg);
        var innerKuang = BaseBitmap.create("public_9v_bg12");
        innerKuang.width = innerbg.width - 30;
        innerKuang.height = innerbg.height - 50;
        this.addChild(innerKuang);
        innerKuang.setPosition(innerbg.x + 15, innerbg.y + 10);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acmainlandrecordtip2-" + view.uiCode), 20, TextFieldConst.COLOR_QUALITY_RED_NEW);
        tipTxt.setPosition(innerKuang.x + innerKuang.width / 2 - tipTxt.width / 2, innerKuang.y + innerKuang.height + 5);
        view.addChild(tipTxt);
        var tmpRect = new egret.Rectangle(0, 0, innerKuang.width - 10, innerKuang.height - 10);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandRecordItem, [], tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, innerKuang, [0, 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        var emptystr = "";
        if (view.vo.getCurPeriod() == 1) {
            emptystr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        }
        else {
            if (!view.vo.isCanJoin()) {
                emptystr = LanguageManager.getlocal("acConquerMainLandTip23-" + view.uiCode);
            }
            else {
                emptystr = LanguageManager.getlocal("acPunishNoData");
            }
        }
        scrollList.setEmptyTip(emptystr, TextFieldConst.COLOR_BROWN_NEW);
        view._list = scrollList;
    };
    AcConquerMainLandDetailViewTab3Tab1.prototype.logCallback = function (evt) {
        var view = this;
        if (evt.data.data.data) {
            var arr = view.vo.getMyRecord(evt.data.data.data.log);
            view._list.refreshData(arr, view.code);
        }
    };
    AcConquerMainLandDetailViewTab3Tab1.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLOG), view.logCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab3Tab1;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab3Tab1.prototype, "AcConquerMainLandDetailViewTab3Tab1");
