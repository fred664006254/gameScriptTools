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
desc : 励精图治 令牌兑换
*/
var AcBattlePassViewTab4 = (function (_super) {
    __extends(AcBattlePassViewTab4, _super);
    function AcBattlePassViewTab4() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._numbg = null;
        _this._icon = null;
        _this._numTxt = null;
        _this._checkBox = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattlePassViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab4.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassViewTab4.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_SHOPBUY), view.rewardCallback, view);
        var baseview = ViewController.getInstance().getView('AcBattlePassView');
        var code = baseview.getUiCode();
        var newcode = baseview.getNewCode();
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var juzhou = BaseBitmap.create("battlepasssjzhou-" + newcode);
        juzhou.height = 85;
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        var numbg = BaseBitmap.create("acchristmasview_smalldescbg");
        view.addChild(numbg);
        view._numbg = numbg;
        var icon = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassicon2", code));
        view.addChild(icon);
        view._icon = icon;
        var numTxt = ComponentManager.getTextField("" + view.vo.getMyScore(), 20);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        numbg.width = icon.width + numTxt.textWidth + 40;
        numbg.height = 30;
        if (this.vo.isNewUi()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numbg, view, [45, 30]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numbg, view, [30, 30]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, numbg, [10, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width, 0]);
        var tip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTaskTip4", code)), 20, TextFieldConst.COLOR_BROWN);
        tip1Txt.lineSpacing = 5;
        tip1Txt.textAlign = egret.HorizontalAlign.LEFT;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tip1Txt, numbg, [numbg.width + 30, 0]);
        view.addChild(tip1Txt);
        var listbg = BaseBitmap.create("public_9_bg32");
        listbg.width = 620;
        listbg.height = view.height - 59 - 25; //tip1Txt.y - tip1Txt.textHeight - 15;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, view, [-3, 80]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [-3, 80]);
        view.addChild(listbg);
        var checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTip5", code), [view.cfg.remind.toString()]), null, 22);
        view.addChild(checkBox);
        var key = "BattlePass-" + this.code + "Remind-" + Api.playerVoApi.getPlayerID() + "-" + this.vo.st;
        var storage = LocalStorageManager.get(key);
        checkBox.setSelected(storage && storage == '1');
        view._checkBox = checkBox;
        view.addChild(checkBox);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, checkBox, listbg, [10, listbg.height + 40]);
        var objList = view.cfg.getShopArr();
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 620, listbg.height - 10);
        if (this.vo.isNewUi()) {
            listbg.visible = false;
            tmpRect.height = listbg.height + 10;
        }
        var scrollList = ComponentManager.getScrollList(AcBattlePassViewTab4ScrollItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        view.addChild(scrollList);
        view.update();
    };
    AcBattlePassViewTab4.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        // let code = view.uiCode;
        // let objList = view.cfg.getShopArr();
        // let arr = view.updateArr(objList);
        // view._scrollList.refreshData(arr, view.code);
        //令牌书刷新
        var numbg = view._numbg;
        var icon = view._icon;
        var numTxt = view._numTxt;
        numTxt.text = view.vo.getMyScore().toString();
        numbg.width = icon.width + numTxt.textWidth + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, numbg, [10, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width, 0]);
    };
    AcBattlePassViewTab4.prototype.tick = function () {
        var view = this;
        var key = "BattlePass-" + this.code + "Remind-" + Api.playerVoApi.getPlayerID() + "-" + this.vo.st;
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, "0");
        }
        LocalStorageManager.set(key, this._checkBox.checkSelected() ? "1" : "0");
    };
    AcBattlePassViewTab4.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        // --令牌兑换商店
        //         --limit:活动限购
        //         --cost:价格
        //         --goods:获得
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            arr2.push(item);
            // let buyLimitNum = vo.getLimitBuyNum(item.id); 
            // if(buyLimitNum >= item.limit){
            // 	arr1.push(arr[i]);
            // }
            // else{
            // 	arr2.push(arr[i]);
            // }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcBattlePassViewTab4.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            if (data && data.rewards) {
                var rewards = data.rewards;
                var selIdx = view.vo.selIdx;
                var item = view._scrollList.getItemByIndex(selIdx);
                if (item) {
                    item.refreshItem(rewards);
                }
                view.vo.selIdx = -1;
            }
        }
    };
    AcBattlePassViewTab4.prototype.dispose = function () {
        var view = this;
        if (this._checkBox) {
            var key = "BattlePass-" + this.code + "Remind-" + Api.playerVoApi.getPlayerID() + "-" + this.vo.st;
            var storage = LocalStorageManager.get(key);
            if (!storage) {
                LocalStorageManager.set(key, "0");
            }
            LocalStorageManager.set(key, this._checkBox.checkSelected() ? "1" : "0");
        }
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_SHOPBUY), view.rewardCallback, view);
        view._scrollList = null;
        view._numbg = null;
        view._icon = null;
        view._numTxt = null;
        view._checkBox = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassViewTab4;
}(AcCommonViewTab));
__reflect(AcBattlePassViewTab4.prototype, "AcBattlePassViewTab4");
//# sourceMappingURL=AcBattlePassViewTab4.js.map