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
var AcDuanWuPopupViewTab4 = (function (_super) {
    __extends(AcDuanWuPopupViewTab4, _super);
    function AcDuanWuPopupViewTab4() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._claimText = null;
        _this._claimBtn = null;
        _this._itemTab = [];
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDuanWuPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuPopupViewTab4.prototype.initView = function () {
        var view = this;
        view.height = 620;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CLAIMDUANWUITEM), this.buyCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 540;
        Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
        view.addChild(Bg);
        var scrollContainer = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, Bg.width, Bg.height - 10);
        var scrollView = ComponentManager.getScrollView(scrollContainer, rect);
        this.addChild(scrollView);
        scrollView.setPosition(Bg.x, Bg.y + 5);
        //顶部
        var topBg = BaseBitmap.create("acduanwu_topbg1_" + this.getUiCode());
        topBg.setPosition(10, 0);
        topBg.setScale(520 / topBg.width);
        scrollContainer.addChild(topBg);
        var vo = this.vo;
        var shopArr = vo.getArr("claim");
        var topCfg = shopArr[0];
        var item1 = "1013_0_" + topCfg.costZongZi + "_" + this.getUiCode();
        var item2 = "1014_0_" + topCfg.costDaGao + "_" + this.getUiCode();
        var item3 = "1015_0_" + topCfg.costXiongHuang + "_" + this.getUiCode();
        var icon1 = GameData.getRewardItemIcons(item1, true)[0];
        icon1.setPosition(73, 22);
        icon1.setScale(0.65);
        scrollContainer.addChild(icon1);
        icon1.getChildByName("numLb").visible = false;
        if (icon1.getChildByName("numbg")) {
            icon1.getChildByName("numbg").visible = false;
        }
        var icon2 = GameData.getRewardItemIcons(item2, true)[0];
        icon2.setPosition(icon1.x, icon1.y + 95);
        icon2.setScale(0.65);
        scrollContainer.addChild(icon2);
        icon2.getChildByName("numLb").visible = false;
        if (icon2.getChildByName("numbg")) {
            icon2.getChildByName("numbg").visible = false;
        }
        var icon3 = GameData.getRewardItemIcons(item3, true)[0];
        icon3.setPosition(icon1.x, icon1.y + 190);
        icon3.setScale(0.65);
        scrollContainer.addChild(icon3);
        icon3.getChildByName("numLb").visible = false;
        if (icon3.getChildByName("numbg")) {
            icon3.getChildByName("numbg").visible = false;
        }
        var plus1 = BaseBitmap.create("acduanwu_plus");
        plus1.setPosition(icon1.x + 18, icon1.y + 67);
        plus1.setScale(0.7);
        scrollContainer.addChild(plus1);
        var plus2 = BaseBitmap.create("acduanwu_plus");
        plus2.setPosition(icon1.x + 18, icon2.y + 67);
        plus2.setScale(0.7);
        scrollContainer.addChild(plus2);
        var arrow = BaseBitmap.create("acduanwu_arrow");
        arrow.setPosition(255, 135);
        scrollContainer.addChild(arrow);
        var number1 = ComponentManager.getTextField("×" + topCfg.costZongZi, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        number1.setPosition(icon1.x + 92, icon1.y + 20);
        scrollContainer.addChild(number1);
        var number2 = ComponentManager.getTextField("×" + topCfg.costDaGao, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        number2.setPosition(icon1.x + 92, icon2.y + 20);
        scrollContainer.addChild(number2);
        var number3 = ComponentManager.getTextField("×" + topCfg.costXiongHuang, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        number3.setPosition(icon1.x + 92, icon3.y + 20);
        scrollContainer.addChild(number3);
        this._claimText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._claimText.setPosition(392, 205);
        scrollContainer.addChild(this._claimText);
        this._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.claimHandle, this, [1]);
        this._claimBtn.setPosition(332, 230);
        scrollContainer.addChild(this._claimBtn);
        this.resetTop();
        var posY = 0;
        for (var i = 1; i < shopArr.length; i++) {
            var item = new AcDuanWuTab3Item();
            item.init(shopArr[i], [view.code, view.getUiCode()], this.claimHandle, this);
            item.setPosition(10, 300 + 148 * (i - 1));
            scrollContainer.addChild(item);
            this._itemTab.push(item);
        }
        this.sortItems();
    };
    AcDuanWuPopupViewTab4.prototype.sortItems = function () {
        this._itemTab.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        for (var i = 0; i < this._itemTab.length; i++) {
            this._itemTab[i].y = 300 + 148 * i;
            this._itemTab[i].resetBtn();
        }
    };
    AcDuanWuPopupViewTab4.prototype.resetTop = function () {
        var vo = this.vo;
        var shopArr = vo.getArr("claim");
        var topCfg = shopArr[0];
        var claimNum = topCfg.limit - vo.getClaim(1);
        if (claimNum > 0) {
            this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes", [String(claimNum)]);
        }
        else {
            this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes2", [String(claimNum)]);
            this._claimBtn.setEnable(false);
        }
        this._claimText.x = 392 - this._claimText.width / 2;
    };
    AcDuanWuPopupViewTab4.prototype.claimHandle = function (idx) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var shopArr = this.vo.getArr("claim");
        var oneCfg = shopArr[idx - 1];
        if (oneCfg.costZongZi) {
            if (oneCfg.costZongZi > this.vo.getActivityItem(1)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDuanWuClaimTip1"));
                return;
            }
        }
        if (oneCfg.costDaGao) {
            if (oneCfg.costDaGao > this.vo.getActivityItem(2)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDuanWuClaimTip2"));
                return;
            }
        }
        if (oneCfg.costXiongHuang) {
            if (oneCfg.costXiongHuang > this.vo.getActivityItem(3)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDuanWuClaimTip3"));
                return;
            }
        }
        this.vo.lastidx = idx;
        if (idx == 1) {
            this.vo.lastpos = this._claimText.localToGlobal(this._claimText.width, 20);
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CLAIMDUANWUITEM, {
            activeId: this.acTivityId,
            shopId: idx
        });
    };
    AcDuanWuPopupViewTab4.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        this.resetTop();
        this.sortItems();
    };
    AcDuanWuPopupViewTab4.prototype.buyCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.claim[this.vo.lastidx];
        var str = rewards;
        if (rData.getDaGao) {
            str = "1014_0_" + rData.getDaGao + "_" + view.getUiCode();
        }
        if (rData.getXiongHuang) {
            str = "1015_0_" + rData.getXiongHuang + "_" + view.getUiCode();
        }
        var replacerewards = rData.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcDuanWuPopupViewTab4.prototype.dispose = function () {
        var view = this;
        this._claimText = null;
        this._claimBtn = null;
        this._itemTab.length = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CLAIMDUANWUITEM), this.buyCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcDuanWuPopupViewTab4;
}(AcCommonViewTab));
__reflect(AcDuanWuPopupViewTab4.prototype, "AcDuanWuPopupViewTab4");
//# sourceMappingURL=AcDuanWuPopupViewTab3.js.map