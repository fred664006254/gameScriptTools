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
    author : shaoliang
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动
*/
var AcDuanWuPopupViewTab2 = (function (_super) {
    __extends(AcDuanWuPopupViewTab2, _super);
    function AcDuanWuPopupViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._timesText = null;
        _this._progress = null;
        _this._topbtn = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDuanWuPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuPopupViewTab2.prototype.initView = function () {
        var view = this;
        view.height = 620;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYDUANWUSHOP), this.buyCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUSHOPTASK), this.taskCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 540;
        Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
        view.addChild(Bg);
        var topBg = BaseBitmap.create("acduanwu_topbg2_" + this.getUiCode());
        topBg.setPosition(Bg.x + 5, Bg.y + 5);
        topBg.scaleX = 530 / topBg.width;
        view.addChild(topBg);
        var vo = this.vo;
        var shopArr = vo.getArr("shop");
        shopArr = view.updataArr(shopArr);
        var tmpRect = new egret.Rectangle(0, 0, 520, view.height - 112);
        var scrollList = ComponentManager.getScrollList(AcDuanWuTab4Item, shopArr, tmpRect, [view.code, view.getUiCode()]);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [30, 204]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        //上面的任务
        var bottom2 = BaseBitmap.create("activity_charge_red");
        bottom2.setPosition(topBg.x - 5, topBg.y);
        this.addChild(bottom2);
        var taskTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnTaksTitleType2", [String(view.cfg.shopTask.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        taskTxt.width = bottom2.width;
        taskTxt.x = bottom2.x + 20;
        taskTxt.y = bottom2.y + 10;
        this.addChild(taskTxt);
        var icon = GameData.getRewardItemIcons("1014_0_" + view.cfg.shopTask.daGaoGet + "_" + this.getUiCode() + "|", true)[0];
        icon.setPosition(Bg.x + 35, Bg.y + 54);
        this.addChild(icon);
        icon.setScale(0.75);
        this._timesText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._timesText.setPosition(topBg.x + 145, topBg.y + 60);
        this.addChild(this._timesText);
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 246);
        this._progress.setPosition(topBg.x + 120, topBg.y + 90);
        this.addChild(this._progress);
        this.updataTask();
    };
    AcDuanWuPopupViewTab2.prototype.updataTask = function () {
        var view = this;
        var times = view.cfg.shopTask.times - view.vo.getShopTask();
        this._timesText.text = LanguageManager.getlocal("acDuanWuBuyTaskTimes", [String(times), String(view.cfg.shopTask.times)]);
        var curV = view.vo.getShopTaskV() - view.vo.getShopTask() * view.cfg.shopTask.value;
        this._progress.setText(LanguageManager.getlocal("acBattlealivemn", [String(curV), String(view.cfg.shopTask.value)]));
        this._progress.setPercentage(curV / view.cfg.shopTask.value);
        if (this._topbtn) {
            this._topbtn.dispose();
            this._topbtn = null;
        }
        var canGetNum = Math.floor(view.vo.getShopTaskV() / view.cfg.shopTask.value);
        if (canGetNum > view.vo.getShopTask() || view.vo.getShopTask() >= view.cfg.shopTask.times) {
            var collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "ac_recharge_Btntxt2", this.eventCollectHandler, this);
            collectBtn.x = this._progress.x + this._progress.width + 16;
            collectBtn.y = this._progress.y + this._progress.height - collectBtn.height;
            collectBtn.name = "collectBtn";
            this.addChild(collectBtn);
            this._topbtn = collectBtn;
            if (view.vo.getShopTask() >= view.cfg.shopTask.times) {
                this._topbtn.setEnable(false);
                this._timesText.text = LanguageManager.getlocal("acDuanWuBuyTaskTimes2", [String(times), String(view.cfg.shopTask.times)]);
                this._progress.setPercentage(1);
                this._progress.setText(LanguageManager.getlocal("acDuanWuShopTaskMax"));
            }
        }
        else {
            var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acCarnivalToCostBtnText", this.goRechargeHandler, this);
            chargeBtn.x = this._progress.x + this._progress.width + 16;
            chargeBtn.y = this._progress.y + this._progress.height - chargeBtn.height;
            chargeBtn.name = "costBtn";
            this.addChild(chargeBtn);
            this._topbtn = chargeBtn;
            if (!this.vo.isInActivity()) {
                App.DisplayUtil.changeToGray(this._topbtn);
            }
        }
    };
    AcDuanWuPopupViewTab2.prototype.eventCollectHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUSHOPTASK, {
            activeId: this.acTivityId,
        });
    };
    AcDuanWuPopupViewTab2.prototype.goRechargeHandler = function (event) {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
    };
    AcDuanWuPopupViewTab2.prototype.update = function () {
        this.updateList();
        this.updataTask();
    };
    AcDuanWuPopupViewTab2.prototype.updateList = function () {
        if (!this.vo) {
            return;
        }
        var shopArr = this.vo.getArr("shop");
        shopArr = this.updataArr(shopArr);
        this._scrollList.refreshData(shopArr, [this.code, this.getUiCode()]);
    };
    AcDuanWuPopupViewTab2.prototype.updataArr = function (arr) {
        if (arr === void 0) { arr = []; }
        var acDuanWuVo = this.vo;
        if (!acDuanWuVo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var shopNum = acDuanWuVo.getShop(arr[i].id);
            if (shopNum < arr[i].limit) {
                arr2.push(arr[i]);
            }
            else {
                arr3.push(arr[i]);
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcDuanWuPopupViewTab2.prototype.buyCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.shop[view.vo.lastidx];
        var str = rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcDuanWuPopupViewTab2.prototype.taskCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = "1014_0_" + rData.daGaoGet + "_" + this.getUiCode();
        var cfg = view.cfg.shop[view.vo.lastidx];
        var str = rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcDuanWuPopupViewTab2.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        this._timesText = null;
        this._progress = null;
        this._topbtn = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYDUANWUSHOP), this.buyCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUSHOPTASK), this.taskCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcDuanWuPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcDuanWuPopupViewTab2.prototype, "AcDuanWuPopupViewTab2");
//# sourceMappingURL=AcDuanWuPopupViewTab4.js.map