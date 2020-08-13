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
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLOG), view.logCallback, view);
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_RECORDLOG, {
            activeId: view.acTivityId,
        });
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 55;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acmainlandrecordtip2-" + view.uiCode), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg);
        view.addChild(tipTxt);
        var viewbg = BaseBitmap.create("public_9_bg22");
        viewbg.height = view.height - bottomBg.height;
        view.addChild(viewbg);
        var listbg = BaseBitmap.create("public_9_bg32");
        listbg.width = 618;
        listbg.height = viewbg.height - 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, viewbg, [0, 20]);
        view.addChild(listbg);
        var tmpRect = new egret.Rectangle(0, 0, listbg.width - 10, listbg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandRecordItem, [], tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
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
        scrollList.setEmptyTip(emptystr);
        view._list = scrollList;
    };
    AcConquerMainLandDetailViewTab3Tab2.prototype.logCallback = function (evt) {
        var view = this;
        if (evt.data.ret && evt.data.data.data) {
            var arr = view.vo.getMyRecord(evt.data.data.data.log);
            view._list.refreshData(arr, view.code);
        }
    };
    AcConquerMainLandDetailViewTab3Tab2.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLOG), view.logCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab3Tab2;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab3Tab2.prototype, "AcConquerMainLandDetailViewTab3Tab2");
//# sourceMappingURL=AcConquerMainLandDetailViewTab3Tab2.js.map