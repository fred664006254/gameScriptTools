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
var AcConquerMainLandDetailViewTab4 = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab4, _super);
    //private _countDownText:BaseTextField = null;
    function AcConquerMainLandDetailViewTab4(param) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab4.prototype.getListType = function () {
        return 2;
    };
    AcConquerMainLandDetailViewTab4.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_GETTASKRWD), view.rewardCallback, view);
        var code = view.uiCode;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var midbg = BaseBitmap.create("mltaskmidbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midbg, view);
        view.addChild(midbg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.vo.getThisCn("acConquerMainLandDetailDesc2")), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.width = 460;
        tipTxt.textAlign = egret.HorizontalAlign.LEFT;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, midbg);
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        var viewbg = BaseBitmap.create("public_9_bg22");
        viewbg.height = view.height - midbg.height - bottomBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, viewbg, midbg, [0, midbg.height]);
        view.addChild(viewbg);
        var listbg = BaseBitmap.create("public_9_bg32");
        listbg.width = 616;
        listbg.height = viewbg.height - 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, viewbg, [0, 20]);
        view.addChild(listbg);
        var arr = view.updateArr(view.vo.getTask());
        var tmpRect = new egret.Rectangle(0, 0, listbg.width - 10, listbg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandTaskItem, arr, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        view.addChild(scrollList);
        view._list = scrollList;
        scrollList.bounces = false;
        var txt1 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.textFlow = [
            { text: LanguageManager.getlocal("acmainlandstrengthServant-" + code), style: { "underline": true } },
        ];
        txt1.addTouchTap(function () {
            if (view.vo.getCurPeriod() == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                return;
            }
            if (!view.vo.isCanJoin()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + code));
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            App.CommonUtil.goTaskView("servant");
        }, view, null);
        view.addChild(txt1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt1, bottomBg, [120, 0]);
        var txt2 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.textFlow = [
            { text: LanguageManager.getlocal("acwipeBossShop"), style: { "underline": true } },
        ];
        txt2.addTouchTap(function () {
            if (view.vo.getCurPeriod() == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                return;
            }
            //打开商店
            if (!view.vo.isCanJoin()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + code));
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB2);
        }, view, null);
        view.addChild(txt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, txt2, bottomBg, [120, 0]);
    };
    AcConquerMainLandDetailViewTab4.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskId = arr[i].sortId;
            var taskNum = vo.getTaskValue(arr[i].questType);
            if (vo.getTaskLq(taskId)) {
                arr1.push(arr[i]);
            }
            else {
                if (vo.getTaskLq(taskId)) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcConquerMainLandDetailViewTab4.prototype.update = function () {
        var view = this;
        view._list.refreshData(view.updateArr(view.vo.getTask()), view.code);
    };
    AcConquerMainLandDetailViewTab4.prototype.rewardCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        var code = view.uiCode;
        if (evt.data.ret && data) {
            var rewards = "1016_0_" + data.specialReward + "_" + code;
            if (this.vo.checkIsJJL) {
                rewards = "1059_0_" + data.specialGift + "_" + code;
            }
            var selIdx = view.vo.selIdx;
            var item = view._list.getItemByIndex(selIdx);
            if (item) {
                item.refreshItem(rewards);
            }
            view.vo.selIdx = -1;
        }
    };
    AcConquerMainLandDetailViewTab4.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_GETTASKRWD), view.rewardCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab4;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab4.prototype, "AcConquerMainLandDetailViewTab4");
//# sourceMappingURL=AcConquerMainLandDetailViewTab4.js.map