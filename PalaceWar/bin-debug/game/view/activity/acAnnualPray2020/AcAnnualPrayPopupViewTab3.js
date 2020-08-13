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
desc : 活动兑换
*/
var AcAnnualPrayPopupViewTab3 = (function (_super) {
    __extends(AcAnnualPrayPopupViewTab3, _super);
    function AcAnnualPrayPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._claimText = null;
        _this._claimBtn = null;
        _this._itemTab = [];
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcAnnualPrayPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayPopupViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayPopupViewTab3.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayPopupViewTab3.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualPrayPopupViewTab3.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcAnnualPrayPopupViewTab3.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ANNUALPRAY_CLAIM), this.rewardCallBack, this);
        var code = view.getUiCode();
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 535;
        Bg.height = 650;
        Bg.x = 32;
        Bg.y = 55;
        view.addChild(Bg);
        var topbg = BaseBitmap.create("annualpraychangetopbg-" + code);
        view.addChild(topbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0, 5]);
        var wifesskinid = this.cfg.getSkin(code);
        var wifeskincfg = Config.WifeskinCfg.getWifeCfgById(wifesskinid);
        var img = BaseLoadBitmap.create(wifeskincfg.body);
        img.width = 640;
        img.height = 840;
        img.setScale(0.35);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, img, topbg);
        view.addChild(img);
        var pos = {
            1: [55, 43],
            2: [400, 43],
            3: [55, 175],
            4: [400, 175],
        };
        var need = {};
        var cfg = view.cfg.claim[1];
        if (cfg.costdeZi) {
            need[1] = cfg.costdeZi;
        }
        if (cfg.costchuanZi) {
            need[2] = cfg.costchuanZi;
        }
        if (cfg.costshiZi) {
            need[3] = cfg.costshiZi;
        }
        if (cfg.costdaiZi) {
            need[4] = cfg.costdaiZi;
        }
        for (var i = 1; i < 5; ++i) {
            var img_1 = BaseLoadBitmap.create("annualprayfont" + i + "-" + code);
            img_1.width = img_1.height = 100;
            view.addChild(img_1);
            img_1.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, img_1, Bg, pos[i]);
            var typeTxt = ComponentManager.getTextField("X" + need[i], 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            typeTxt.name = "typeTxt" + i;
            view.addChild(typeTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, typeTxt, img_1, [0, img_1.height * img_1.scaleY - 6]);
        }
        view._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.claimHandle, this, [1]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._claimBtn, topbg, [0, 13]);
        view.addChild(view._claimBtn);
        var wife_btnbg = BaseBitmap.create("wife_btnbg");
        wife_btnbg.name = "wife_btnbg";
        view.addChild(wife_btnbg);
        wife_btnbg.width = 130;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wife_btnbg, view._claimBtn, [0, -wife_btnbg.height - 5]);
        view._claimText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._claimText, wife_btnbg);
        view.addChild(this._claimText);
        view.resetTop();
        var vo = this.vo;
        var shopArr = vo.getArr("claim");
        var container = new BaseDisplayObjectContainer();
        container.width = 530;
        var posY = 0;
        for (var i = 1; i < shopArr.length; i++) {
            var item = new AcAnnualPrayExchangeItem();
            item.init(shopArr[i], view.code, this.claimHandle, this);
            item.setPosition(0, 135 * (i - 1));
            container.addChild(item);
            view._itemTab.push(item);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 350);
        var scrollView = ComponentManager.getScrollView(container, rect);
        scrollView.bounces = false;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, topbg, [0, topbg.height + 3]);
        view.sortItems();
    };
    AcAnnualPrayPopupViewTab3.prototype.update = function () {
        var view = this;
        if (!this.vo) {
            return;
        }
        this.resetTop();
        this.sortItems();
        // for(let i = 1; i < 5; ++ i){
        //     let typeTxt = <BaseTextField>view.getChildByName(`typeTxt${i}`);
        //     typeTxt.text = `X${view.vo.dayNumById(i)}`;
        // }
    };
    AcAnnualPrayPopupViewTab3.prototype.sortItems = function () {
        this._itemTab.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        for (var i = 0; i < this._itemTab.length; i++) {
            this._itemTab[i].y = 135 * i;
            this._itemTab[i].resetBtn();
        }
    };
    AcAnnualPrayPopupViewTab3.prototype.resetTop = function () {
        var vo = this.vo;
        var shopArr = vo.getArr("claim");
        var cfg = this.cfg.claim[1];
        //let topCfg:Config.AcCfg.AnnualPrayExchangeItemCfg = <Config.AcCfg.AnnualPrayExchangeItemCfg>shopArr[0];
        var claimNum = cfg.limit - vo.getBuyLimitnum(1);
        if (claimNum > 0) {
            this._claimText.text = LanguageManager.getlocal("acDechuanshidaiClaimTimes", [String(claimNum)]);
        }
        else {
            this._claimText.text = LanguageManager.getlocal("acDechuanshidaiClaimTimes2", [String(claimNum)]);
            this._claimBtn.setEnable(false);
        }
        var claimbg = this.getChildByName("wife_btnbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._claimText, claimbg);
        var need = {};
        if (cfg.costdeZi) {
            need[1] = cfg.costdeZi;
        }
        if (cfg.costchuanZi) {
            need[2] = cfg.costchuanZi;
        }
        if (cfg.costshiZi) {
            need[3] = cfg.costshiZi;
        }
        if (cfg.costdaiZi) {
            need[4] = cfg.costdaiZi;
        }
        if (vo.dayNumById(1) >= need[1] && vo.dayNumById(2) >= need[2] && vo.dayNumById(3) >= need[3] && vo.dayNumById(4) >= need[4]) {
            App.DisplayUtil.changeToNormal(this._claimBtn);
        }
        else {
            App.DisplayUtil.changeToGray(this._claimBtn);
        }
    };
    AcAnnualPrayPopupViewTab3.prototype.claimHandle = function (idx) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var shopArr = this.vo.getArr("claim");
        var oneCfg = shopArr[idx - 1];
        if (oneCfg.limit) {
            var claimNum = oneCfg.limit - this.vo.getBuyLimitnum(oneCfg.id);
            if (claimNum <= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
                return;
            }
        }
        if (oneCfg.costdeZi) {
            if (oneCfg.costdeZi > this.vo.dayNumById(1)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAnnualPrayPrayTip9-" + this.getUiCode(), [LanguageManager.getlocal("acAnnualPrayFont1-" + this.getUiCode())]));
                return;
            }
        }
        if (oneCfg.costchuanZi) {
            if (oneCfg.costchuanZi > this.vo.dayNumById(2)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAnnualPrayPrayTip9-" + this.getUiCode(), [LanguageManager.getlocal("acAnnualPrayFont2-" + this.getUiCode())]));
                return;
            }
        }
        if (oneCfg.costshiZi) {
            if (oneCfg.costshiZi > this.vo.dayNumById(3)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAnnualPrayPrayTip9-" + this.getUiCode(), [LanguageManager.getlocal("acAnnualPrayFont3-" + this.getUiCode())]));
                return;
            }
        }
        if (oneCfg.costdaiZi) {
            if (oneCfg.costdaiZi > this.vo.dayNumById(4)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAnnualPrayPrayTip9-" + this.getUiCode(), [LanguageManager.getlocal("acAnnualPrayFont4-" + this.getUiCode())]));
                return;
            }
        }
        this.vo.lastidx = idx;
        if (idx == 1) {
            this.vo.lastpos = this._claimText.localToGlobal(this._claimText.width, 20);
        }
        NetManager.request(NetRequestConst.REQUEST_ANNUALPRAY_CLAIM, {
            activeId: this.acTivityId,
            shopId: idx
        });
    };
    AcAnnualPrayPopupViewTab3.prototype.rewardCallBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            if (!rData) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            var rewards = rData.rewards;
            var cfg = view.cfg.claim[this.vo.lastidx];
            var str = rewards;
            var replacerewards = rData.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
            var rewardList = GameData.formatRewardItem(str);
            var pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
        }
    };
    AcAnnualPrayPopupViewTab3.prototype.dispose = function () {
        var view = this;
        view._claimText = null;
        view._claimBtn = null;
        view._itemTab = [];
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ANNUALPRAY_CLAIM), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcAnnualPrayPopupViewTab3;
}(CommonViewTab));
__reflect(AcAnnualPrayPopupViewTab3.prototype, "AcAnnualPrayPopupViewTab3");
//# sourceMappingURL=AcAnnualPrayPopupViewTab3.js.map