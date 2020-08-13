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
desc : 励精图治 活动任务
*/
var AcBattlePassViewTab2 = (function (_super) {
    __extends(AcBattlePassViewTab2, _super);
    function AcBattlePassViewTab2() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._curPage = 1;
        _this._curPageTxt = null;
        _this._leftBtn = null;
        _this._rightBtn = null;
        _this._curRoundExpTxt = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattlePassViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab2.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_TASKRWD), view.rewardCallback, view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        view._curPage = view.vo.getCurRound();
        var baseview = ViewController.getInstance().getView('AcBattlePassView');
        var code = baseview.getUiCode();
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        if (this.vo.isNewUi()) {
            var tipbg = BaseBitmap.create("countrywarrewardview_itembg");
            tipbg.width = 590;
            tipbg.height = 70;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, view, [0, 8], true);
            view.addChild(tipbg);
        }
        var arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", view.freshPage, view, ["left"]);
        arrow_leftBtn.setScale(0.78);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrow_leftBtn, view, [20, 20]);
        view.addChild(arrow_leftBtn);
        view._leftBtn = arrow_leftBtn;
        var curPageTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassRound", code), [view._curPage.toString()]), 28, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, curPageTxt, arrow_leftBtn, [arrow_leftBtn.width * arrow_leftBtn.scaleX + 10, 0]);
        view.addChild(curPageTxt);
        view._curPageTxt = curPageTxt;
        var arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", view.freshPage, view, ["right"]);
        arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
        arrow_rightBtn.scaleX = -0.78;
        arrow_rightBtn.scaleY = 0.78;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrow_rightBtn, curPageTxt, [curPageTxt.textWidth + 10, 0]);
        view.addChild(arrow_rightBtn);
        view._rightBtn = arrow_rightBtn;
        // let timeTxt =  ComponentManager.getTextField(`${App.DateUtil.getFormatBySecond(view.vo.st, 11)}-${App.DateUtil.getFormatBySecond(view.vo.et, 11)}`, 20, TextFieldConst.COLOR_BLACK);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, arrow_rightBtn, [arrow_rightBtn.width * arrow_rightBtn.scaleY + 23, 0]);
        // view.addChild(timeTxt);
        var str = '';
        var start = view.vo.st + (view.vo.getCurRound() - 1) * 86400 * view.cfg.refresh;
        var end = view.vo.getCurRound() == view.vo.getMaxRound() ? (view.vo.et - 86400 * view.cfg.extraTime) : (view.vo.st + (view.vo.getCurRound()) * 86400 * view.cfg.refresh);
        var curExpTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(start, 11) + "-" + App.DateUtil.getFormatBySecond(end, 11) + "\n" + (LanguageManager.getlocal("acBattlePassRoundExp-" + code), [view.vo.getCurRoundExp().toString()]), 20, TextFieldConst.COLOR_BLACK);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curExpTxt, timeTxt, [0, timeTxt.textHeight + 9]);
        view.addChild(curExpTxt);
        curExpTxt.lineSpacing = 5;
        curExpTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, curExpTxt, arrow_rightBtn, [arrow_rightBtn.width * arrow_rightBtn.scaleY + 23, 0]);
        view._curRoundExpTxt = curExpTxt;
        var listbg = BaseBitmap.create("public_9_bg32");
        listbg.width = 620;
        listbg.height = view.height - 59 - 25; //curExpTxt.y - curExpTxt.textHeight - 15;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, view, [-3, 80]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [-3, 80]);
        view.addChild(listbg);
        if (this.vo.isNewUi()) {
            curPageTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            curExpTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            listbg.visible = false;
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip1", code)), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view, [0, view.height + 50]);
        view.addChild(tipTxt);
        var objList = view.vo.getTaskArr();
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 610, listbg.height - 10);
        if (this.vo.isNewUi()) {
            tmpRect.height = listbg.height + 10;
        }
        var scrollList = ComponentManager.getScrollList(AcBattlePassViewTab2ScrollItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        view.addChild(scrollList);
        view.update();
        // let vo = this.vo;
    };
    AcBattlePassViewTab2.prototype.freshPage = function (type) {
        var view = this;
        var page = view._curPage;
        var code = view.uiCode;
        if (type == 'left') {
            page = Math.max(page - 1, 1);
        }
        else {
            page = page + 1;
        }
        if (page > view.vo.getMaxRound()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip4", code)));
            return;
        }
        if (page > view.vo.getCurRound()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip3", code)));
            return;
        }
        if (page !== view._curPage) {
            view._curPage = page;
            view._curPageTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassRound", code), [view._curPage.toString()]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._rightBtn, view._curPageTxt, [view._curPageTxt.textWidth + 10, 0]);
            view.update();
        }
    };
    AcBattlePassViewTab2.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var code = view.uiCode;
        var curRound = view.vo.getCurRound();
        var str = '';
        var emptystr = '';
        if (curRound == view._curPage) {
            str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassRoundExp", code), [view.vo.getCurRoundExp().toString()]);
        }
        else if (curRound > view._curPage) {
            str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip2", code));
        }
        else if (curRound < view._curPage) {
            str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip3", code));
        }
        view._scrollList.setEmptyTip(str);
        var start = view.vo.st + (view._curPage - 1) * 86400 * view.cfg.refresh;
        var end = view._curPage == view.vo.getMaxRound() ? (view.vo.et - 86400 * view.cfg.extraTime) : (view.vo.st + (view._curPage) * 86400 * view.cfg.refresh);
        view._curRoundExpTxt.text = App.DateUtil.getFormatBySecond(start, 11) + "-" + App.DateUtil.getFormatBySecond(end, 11) + "\n" + str;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._curRoundExpTxt, view._rightBtn, [view._rightBtn.width * view._rightBtn.scaleY + 23, 0]);
        var objList = view.vo.getTaskArr(view._curPage);
        var arr = view.updateArr(objList);
        view._scrollList.refreshData(arr, view.code);
        view._scrollList.verticalScrollPolicy = arr.length == 0 ? 'off' : 'on';
        if (view._curPage > 1) {
            App.DisplayUtil.changeToNormal(view._leftBtn);
        }
        else {
            App.DisplayUtil.changeToGray(view._leftBtn);
        }
        if (view._curPage < view.vo.getCurRound()) {
            App.DisplayUtil.changeToNormal(view._rightBtn);
        }
        else {
            App.DisplayUtil.changeToGray(view._rightBtn);
        }
        App.CommonUtil.removeIconFromBDOC(view._leftBtn);
        for (var i = 1; i < view._curPage; ++i) {
            if (view.vo.getRoundReward(i)) {
                App.CommonUtil.addIconToBDOC(view._leftBtn);
                break;
            }
        }
        App.CommonUtil.removeIconFromBDOC(view._rightBtn);
        for (var i = view._curPage + 1; i < view.vo.getMaxRound(); ++i) {
            if (view.vo.getRoundReward(i)) {
                App.CommonUtil.addIconToBDOC(view._rightBtn);
                break;
            }
        }
    };
    AcBattlePassViewTab2.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            arr[i].round = view._curPage;
            var questType = arr[i].questType;
            var taskNum = vo.getTaskValue(questType, view._curPage);
            if (vo.isGetTaskReward(questType, view._curPage)) {
                arr1.push(arr[i]);
            }
            else {
                if (vo.canLqTaskReward(questType, view._curPage)) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcBattlePassViewTab2.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (data && Number(data.taskType) == 1) {
                var rewards = data.rewards;
                var selIdx = view.vo.selIdx;
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassGetExp", view.getUiCode()), [data.expGet]));
                // let item = <AcBattlePassViewTab2ScrollItem>view._scrollList.getItemByIndex(selIdx);
                // if(item){
                // 	item.refreshItem(rewards);
                // }
                view.vo.selIdx = -1;
            }
        }
    };
    AcBattlePassViewTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_TASKRWD), view.rewardCallback, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        view._curPageTxt = null;
        view._curPage = 1;
        view._scrollList = null;
        view._rightBtn = null;
        view._curRoundExpTxt = null;
        view._leftBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassViewTab2;
}(AcCommonViewTab));
__reflect(AcBattlePassViewTab2.prototype, "AcBattlePassViewTab2");
//# sourceMappingURL=AcBattlePassViewTab2.js.map