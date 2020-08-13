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
desc : 励精图治 特殊悬赏
*/
var AcBattlePassViewTab3 = (function (_super) {
    __extends(AcBattlePassViewTab3, _super);
    function AcBattlePassViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattlePassViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab3.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_TASKRWD), view.rewardCallback, view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        var baseview = ViewController.getInstance().getView('AcBattlePassView');
        var code = baseview.getUiCode();
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var tipbg = BaseBitmap.create("decree_wordbg");
        tipbg.width = 600;
        tipbg.height = 66;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipbg, view, [8, 10]);
        view.addChild(tipbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, view, [-3, 10]);
        var tipimg = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasstasktip", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipimg, tipbg);
        view.addChild(tipimg);
        var listbg = BaseBitmap.create("public_9_bg32");
        listbg.width = 620;
        listbg.height = view.height - tipimg.y - tipimg.height - 25;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, view, [-3, 80]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [-3, 80]);
        view.addChild(listbg);
        if (this.vo.isNewUi()) {
            listbg.visible = false;
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTaskTip3", code)), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view, [0, view.height + 35]);
        view.addChild(tipTxt);
        var objList = view.vo.getSpecialTaskArr();
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 610, listbg.height - 10);
        if (this.vo.isNewUi()) {
            tmpRect.height = listbg.height + 10;
        }
        var scrollList = ComponentManager.getScrollList(AcBattlePassViewTab3ScrollItem, arr, tmpRect, view.code);
        scrollList.setEmptyTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip3", code)));
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        view.addChild(scrollList);
        view.update();
        // let vo = this.vo;
    };
    AcBattlePassViewTab3.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var code = view.uiCode;
        var objList = view.vo.getSpecialTaskArr();
        var arr = view.updateArr(objList);
        view._scrollList.refreshData(arr, view.code);
    };
    AcBattlePassViewTab3.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var questType = arr[i].questType;
            var taskNum = vo.getSpecialTaskValue(questType);
            if (vo.isGetSpecialTaskReward(questType)) {
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
    AcBattlePassViewTab3.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (data && Number(data.taskType) == 2) {
                var rewards = data.rewards;
                var selIdx = view.vo.selIdx;
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassGetExp", view.getUiCode()), [data.expGet]));
                // let item = <AcBattlePassViewTab3ScrollItem>view._scrollList.getItemByIndex(selIdx);
                // if(item){
                // 	item.refreshItem(rewards);
                // }
                view.vo.selIdx = -1;
            }
        }
    };
    AcBattlePassViewTab3.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_TASKRWD), view.rewardCallback, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        view._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassViewTab3;
}(AcCommonViewTab));
__reflect(AcBattlePassViewTab3.prototype, "AcBattlePassViewTab3");
//# sourceMappingURL=AcBattlePassViewTab3.js.map